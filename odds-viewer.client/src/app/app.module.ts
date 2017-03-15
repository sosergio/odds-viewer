import { NgModule, APP_INITIALIZER }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppConfig } from './app.config';
import { HttpModule,Http } from '@angular/http';

import { AppComponent }  from './app.component';
import { OddsView } from './views/odds';
import { OwHeaderComponent }  from './ow-header/ow-header-component';
import { OwOddsListComponent }  from './ow-odds-list/ow-odds-list-component';
import { OwOddsGraphComponent }  from './ow-odds-graph/ow-odds-graph-component';

import { ChartModule } from 'angular2-highcharts';

const appRoutes: Routes = [
  { path: '', component: OddsView }
];

//a way of loading settings before loading the rest of the app
function configServiceFactory (http:Http, config: AppConfig) {
  console.log("ConfigServiceFactory Load");
  return () => config.load();
}

@NgModule({
  imports:      [ 
      BrowserModule, 
      RouterModule.forRoot(appRoutes),
      ChartModule.forRoot(require('highcharts')),
      HttpModule
      ],
  declarations: [ 
      AppComponent, 
      OwHeaderComponent,
      OwOddsGraphComponent,
      OwOddsListComponent,
      OddsView,
     ],  
  bootstrap: [ AppComponent ],
  providers:[
      AppConfig,
      {
        provide: APP_INITIALIZER,
        useFactory: configServiceFactory,
        deps: [Http, AppConfig],
        multi: true
      }
  ]
})
export class AppModule { 

  constructor(){
    console.log("AppModule Constructor");
  }
}