import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { OddsService} from '../services/odds-service';
import { Odd} from '../services/odd';
import { Observable }     from 'rxjs/Observable';
import { Team } from '../services/team';

@Component({
  selector: 'ow-odds-graph',
  template: 
  `<h2>Price Movement</h2> 
    <div [hidden]="odd">Please select an odd</div>
    <chart [hidden]="!odd" [options]="options"></chart>
  `,
})
export class OwOddsGraphComponent implements OnChanges {  
  @Input() odd:Odd;

  oddsService:OddsService;
  options: Object;
  constructor(_oddsService:OddsService){
    this.oddsService = _oddsService; 
  }

  ngOnChanges(changes: SimpleChanges): void {
      if(this.odd){
        this.oddsService.getOddsHistory(this.odd.team_id, this.odd.broker_id)
        .subscribe((res:Odd[]) => {
          console.log(res);
          this.options = {
            title : { text : this.odd.broker.name + " best for " + this.odd.team.name },
            xAxis: {
                type: 'datetime'
            },
            series: [{
                data: res.map(r => { 
                  var o = new Odd(r.created, r.values, r.team_id, r.broker_id);
                  var d = new Date(r.created);
                  var best = o.best;
                  return {y:best, x: d, name:this.odd.team.name + " best odd on " + d.toLocaleDateString()};
                }),
            }]
          };
        });
      } else {
        this.options = {};
      }
  }


}
