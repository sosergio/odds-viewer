import { Component, OnInit } from '@angular/core';
import { OddsService } from './services/odds-service';

@Component({
  selector: 'ow-app',
  template: `
  <div id="wrapper">
    <ow-header></ow-header>
    <router-outlet></router-outlet>    
  </div>
  <footer>no pixels were harmed in the making.</footer>
  `,
  providers: [
    OddsService
  ]
})
export class AppComponent{
  constructor(){
    console.log("AppComponent constructor");
  }
}