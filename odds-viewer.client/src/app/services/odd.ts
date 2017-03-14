import {Broker} from "./broker";
import {Team} from "./team";

export class Odd {
    created:Date;
    value: number;
    team_id:number;
    broker_id:number;
    broker:Broker;
    team:Team;

    constructor(date:Date, value:number, teamId:number, brokerId:number){
      this.created = date;
      this.value = value;
      this.team_id = teamId;
      this.broker_id = brokerId;
    }
}