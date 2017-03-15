import { Component, Output, EventEmitter} from '@angular/core';
import { OddsService} from '../services/odds-service';
import { Odd} from '../services/odd';
import { Team} from '../services/team';
import { Broker} from '../services/broker';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';

@Component({
  selector: 'ow-odds-list',
  template: 
  `<h2>Best Odds</h2>
  <table cellspacing="0">
      <thead>
          <tr>
              <th>Team</th>
              <th *ngFor="let b of brokers">{{b.name}}</th>
          </tr>
      </thead>
      <tbody>
          <tr *ngFor="let t of teams" >
            <td><a href="#" (click)="onTeamClick(t)">{{t.name}}</a></td>
            <td *ngFor="let b of brokers" (mousemove)="over($event, findOdd(b.id, t.id))" (mouseleave)="overingOdd=null">{{findBestOdd(b.id, t.id)}}</td>
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
    
    oddsHashMap:Object;
    odds:Odd[];
    teams:Team[];
    overingOdd:Odd;
    brokers:Broker[];
    oddsService:OddsService;
    mouseLeft:string;
    mouseTop:string;
    @Output() onTeamSelected = new EventEmitter<Team>();
    
    constructor(_oddsService:OddsService){
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
                              r.broker = this.brokers.find(b => b.id === r.broker_id);
                              r.team = this.teams.find(t => t.id === r.team_id);
                              return r;
                          });
                      });
                });
          });
    }

    findBestOdd(brokerId:number, teamId:number):string{
      var odd = this.odds.find(o => o.broker_id == brokerId && o.team_id == teamId);
      if(odd) return Math.max.apply(0, odd.values).toString();
      else return " - ";
    }
    findOdd(brokerId:number, teamId:number):Odd{
      return this.odds.find(o => o.broker_id == brokerId && o.team_id == teamId);
    }

    over(event:MouseEvent, odd:Odd){
      this.mouseLeft = event.pageX + 10 + "px";
      this.mouseTop = event.pageY + 10 + "px";
      this.overingOdd = odd;
      console.log(odd);
    }

    onTeamClick(team:Team){
      this.onTeamSelected.emit(team);
    }
}
