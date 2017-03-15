import { Component } from '@angular/core';
import { Odd } from '../services/odd';

@Component({
  template: `
    <main>
        <div class="column list-area">
            <ow-odds-list (onOddSelected)="handleOnOddSelected($event)"></ow-odds-list>
        </div>        
        <aside class="column">
            <ow-odds-graph [odd]="selectedOdd"></ow-odds-graph>
        </aside>
    <main>
  `
})
export class OddsView{

    selectedOdd:Odd;
    constructor(){
        this.selectedOdd = null;
    }
    handleOnOddSelected(odd:Odd){
        this.selectedOdd = odd;
    }

}
