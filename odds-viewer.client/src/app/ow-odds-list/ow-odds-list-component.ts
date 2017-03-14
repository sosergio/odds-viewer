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
  `<table cellspacing="0">
      <thead>
          <tr>
              <th>Team</th>
              <th *ngFor="let b of brokers">{{b.name}}</th>
          </tr>
      </thead>
      <tbody>
          <tr *ngFor="let t of teams" >
            <td (mousemove)="over($event, t)" (mouseleave)="overingTeam=null"><a href="#" (click)="onTeamClick(t)">{{t.name}}</a></td>
            <td *ngFor="let b of brokers">{{findOdd(b.id, t.id)}}</td>
          </tr>
      </tbody>
  </table>
  <div [style.left]="mouseLeft" [style.top]="mouseTop" id="overing-team" [style.opacity]="overingTeam?1:0">You are overing on {{overingTeam?.name}}</div>
  `,
})
export class OwOddsListComponent {
    
    odds:Odd[];
    teams:Team[];
    overingTeam:Team;
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
                      .subscribe((res:Odd[]) => this.odds = res);
                });
          });
    }

    findOdd(brokerId:number, teamId:number):string{
      var odd = this.odds.find(o => o.broker_id == brokerId && o.team_id == teamId);
      if(odd) return odd.value.toString();
      else return " - ";
    }

    over(event:MouseEvent, team:Team){
      this.mouseLeft = event.pageX + 10 + "px";
      this.mouseTop = event.pageY + 10 + "px";
      this.overingTeam = team;
    }

    onTeamClick(team:Team){
      console.log("clicked " + team.name);
      this.onTeamSelected.emit(team);
      
    }
}
