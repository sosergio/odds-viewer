import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable }     from 'rxjs/Observable';

import { Odd }     from './odd';
import { Broker }     from './broker';
import { Team }     from './team';
import {AppConfig} from '../app.config';
import {HttpProxy} from './http-proxy';

import 'rxjs/add/observable/from';

@Injectable()
export class OddsService {

    _httpProxy:HttpProxy;
    constructor(http:Http, private config:AppConfig){
        this._httpProxy = new HttpProxy(http, config);
    }

    getOdds():Observable<Odd[]>{
       return this._httpProxy.getAsync("/odds")
            .map(res => res.json() as Odd[]);
    }  

    getTeams():Observable<Team[]>{
       return this._httpProxy.getAsync("/teams")
            .map(res => res.json() as Team[]);
    } 

    getBrokers():Observable<Broker[]>{
       return this._httpProxy.getAsync("/brokers")
            .map(res => res.json() as Broker[]);
    } 

    getRandom(min:number, max:number):number {
        return Math.random() * (max - min + 1) + min;
    }

    daysInPast(days:number):Date{
        var dat = new Date();
        dat.setDate(dat.getDate() - days);
        return dat;        
    }
    
    getOddsHistory(teamId:number):Observable<Odd[]>{
       if(this.config.getEnv("env") === "mock"){
            var date = new Date();
            var value = this.getRandom(3, 50);
            let mocks = new Array<Odd>();
            for(var i=0; i<15; i++){
                let d = this.daysInPast(i);
                let v = this.getRandom(value -1, value+1);
                mocks.push(new Odd(d,v,teamId,1));
            }
            return Observable.from(new Array(mocks));
       }
       else{
            return this._httpProxy.getAsync("/odds/" + teamId)
                .map(res => res.json() as Odd[]);
                
       }
    } 
}