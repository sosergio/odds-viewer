import { Component } from '@angular/core';
import { Team } from '../services/team';

@Component({
  template: `
    <main>
        <div class="column">
            <div class="list-area">
                <ow-odds-list (onTeamSelected)="handleOnTeamSelected($event)"></ow-odds-list>
            </div>
        </div>
        <aside class="column">
            <ow-odds-graph [team]="selectedTeam"></ow-odds-graph>
        </aside>
    <main>
  `
})
export class OddsView{

    selectedTeam:Team;
    constructor(){
        this.selectedTeam = null;
    }
    handleOnTeamSelected(team:Team){
        console.log("on click handled");
        this.selectedTeam = team;
    }

}
