import {Broker} from "./broker";
import {Team} from "./team";

export class Odd {
    created:Date;
    values: number[];
    team_id:number;
    broker_id:number;
    broker:Broker;
    team:Team;
    get best():number {
        return Math.max.apply(0, this.values);
    }

    constructor(date:Date, values:number[], teamId:number, brokerId:number){
      this.created = date;
      this.values = values;
      this.team_id = teamId;
      this.broker_id = brokerId;
    }
}