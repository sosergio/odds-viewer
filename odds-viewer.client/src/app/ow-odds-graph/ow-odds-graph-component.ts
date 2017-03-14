import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { OddsService} from '../services/odds-service';
import { Odd} from '../services/odd';
import { Observable }     from 'rxjs/Observable';
import { Team } from '../services/team';

@Component({
  selector: 'ow-odds-graph',
  template: 
  `<h2>Price Movement</h2> 
    <div [hidden]="team">Please select a team</div>
    <chart [hidden]="!team" [options]="options"></chart>
  `,
})
export class OwOddsGraphComponent implements OnChanges {
    
  @Input() team:Team;

  odds:Odd[];
  oddsService:OddsService;
  options: Object;
  constructor(_oddsService:OddsService){
    this.oddsService = _oddsService; 
    
  }

  ngOnChanges(changes: SimpleChanges): void {

var ob = {x : 1};
ob.x = 2;

      if(this.team){
        this.oddsService.getOddsHistory(this.team.id)
        .subscribe((res:Odd[]) => {
          console.log(res);
          this.odds = res;
          this.options = {
            title : { text : this.team.name },
            xAxis: {
                type: 'datetime'
            },
            series: [{
                data: res.map(r => { 
                  return {y:r.value, x:r.created, name:'hello'};
                }),
            }]
        };
        });
      }
  }


}
