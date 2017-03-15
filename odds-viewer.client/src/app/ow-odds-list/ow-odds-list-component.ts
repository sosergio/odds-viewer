import { Component, Output, EventEmitter} from '@angular/core';
import { OddsService} from '../services/odds-service';
import { Odd} from '../services/odd';
import { Team} from '../services/team';
import { Broker} from '../services/broker';

@Component({
  selector: 'ow-odds-list',
  template: 
  `<h2>Best Odds</h2>
   <table cellspacing="0">
   <thead>
        <tr>
            <th (click)="sortBy('team')">Team</th>
            <th *ngFor="let b of brokers" (click)="sortBy(b.name)" >{{b.name}}</th>
        </tr>
    </thead>
    <tbody>
        <tr *ngFor="let h of hashmap">
          <td>{{h.team}}</td>
          <td *ngFor="let o of brokers" (mousemove)="over($event, findOdd(o.broker_id, h.team_id))" (mouseleave)="overingOdd=null">
              <a href="#" (click)="onOddClick(h.team_id,o.broker_id)">{{h[o.name]}}</a>
          </td>
        </tr>
    </tbody>
  </table>
  <div [style.left]="mouseLeft" [style.top]="mouseTop" id="overing-odd" [style.opacity]="overingOdd?1:0">
      <em>{{overingOdd?.broker?.name}} odds for {{overingOdd?.team?.name}}:</em>
      <table>
        <tr>
          <td *ngFor="let oo of overingOdd?.values">{{oo}}</td>
        </tr>
      </table>
  </div>
  `,
})
export class OwOddsListComponent {
    sort:any;
    hashmap:Array<any>;
    odds:Odd[];
    teams:Team[];
    overingOdd:Odd;
    brokers:Broker[];
    oddsService:OddsService;
    mouseLeft:string;
    mouseTop:string;
    @Output() onOddSelected = new EventEmitter<Odd>();
    
    constructor(_oddsService:OddsService){
      this.sort = {
        by:"team",
        asc:false
      };
      this.hashmap = [];
      this.oddsService = _oddsService; 
      this.odds = new Array<Odd>();
      this.oddsService.getBrokers()
          .subscribe((res:Broker[]) => {
            this.brokers = res;
            this.oddsService.getTeams()
                .subscribe((res:Team[]) => {
                  this.teams = res;
                  this.oddsService.getOdds()
                      .subscribe((res:Odd[]) => {
                          this.odds = res.map(r => {
                              r.broker = this.brokers.find(b => b.broker_id === r.broker_id);
                              r.team = this.teams.find(t => t.team_id === r.team_id);
                              var teamOdds = this.hashmap.find(h => h.team === r.team.name);
                              if(!teamOdds) {
                                teamOdds = {
                                  "team":r.team.name,
                                  "team_id":r.team_id,
                                };
                                this.hashmap.push(teamOdds);
                              }
                              teamOdds[r.broker.name] = r.best;
                              return r;
                          });
                          this.sortBy("team");
                      });
                });
          });
    }

    findOdd(brokerId:number, teamId:number):Odd{
      return this.odds.find(o => o.broker_id == brokerId && o.team_id == teamId);
    }

    over(event:MouseEvent, odd:Odd){
      this.mouseLeft = event.pageX + 10 + "px";
      this.mouseTop = event.pageY + 10 + "px";
      this.overingOdd = odd;    
    }

    onOddClick(teamId:number, brokerId:number){
      this.onOddSelected.emit(this.findOdd(brokerId, teamId));
    }

    sortBy(pro:any){
      this.sort.asc = this.sort.by === pro? !this.sort.asc : true;
      this.sort.by = pro;
      this.hashmap = this.hashmap.sort((a: any, b: any) => {
          if (a[pro] < b[pro])
            return this.sort.asc?-1:1;
          else if (a[pro] > b[pro])
            return this.sort.asc?1:-1;
          return 0;
      });
    }
    
}
