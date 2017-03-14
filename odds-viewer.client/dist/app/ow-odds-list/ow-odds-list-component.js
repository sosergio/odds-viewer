"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var odds_service_1 = require('../services/odds-service');
require('rxjs/add/operator/mergeMap');
var OwOddsListComponent = (function () {
    function OwOddsListComponent(_oddsService) {
        var _this = this;
        this.onTeamSelected = new core_1.EventEmitter();
        this.oddsService = _oddsService;
        this.odds = new Array();
        this.oddsService.getBrokers()
            .subscribe(function (res) {
            _this.brokers = res;
            _this.oddsService.getTeams()
                .subscribe(function (res) {
                _this.teams = res;
                _this.oddsService.getOdds()
                    .subscribe(function (res) { return _this.odds = res; });
            });
        });
    }
    OwOddsListComponent.prototype.findOdd = function (brokerId, teamId) {
        var odd = this.odds.find(function (o) { return o.broker_id == brokerId && o.team_id == teamId; });
        if (odd)
            return odd.value.toString();
        else
            return " - ";
    };
    OwOddsListComponent.prototype.over = function (event, team) {
        this.mouseLeft = event.pageX + 10 + "px";
        this.mouseTop = event.pageY + 10 + "px";
        this.overingTeam = team;
    };
    OwOddsListComponent.prototype.onTeamClick = function (team) {
        console.log("clicked " + team.name);
        this.onTeamSelected.emit(team);
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], OwOddsListComponent.prototype, "onTeamSelected", void 0);
    OwOddsListComponent = __decorate([
        core_1.Component({
            selector: 'ow-odds-list',
            template: "<table cellspacing=\"0\">\n      <thead>\n          <tr>\n              <th>Team</th>\n              <th *ngFor=\"let b of brokers\">{{b.name}}</th>\n          </tr>\n      </thead>\n      <tbody>\n          <tr *ngFor=\"let t of teams\" >\n            <td (mousemove)=\"over($event, t)\" (mouseleave)=\"overingTeam=null\"><a href=\"#\" (click)=\"onTeamClick(t)\">{{t.name}}</a></td>\n            <td *ngFor=\"let b of brokers\">{{findOdd(b.id, t.id)}}</td>\n          </tr>\n      </tbody>\n  </table>\n  <div [style.left]=\"mouseLeft\" [style.top]=\"mouseTop\" id=\"overing-team\" [style.opacity]=\"overingTeam?1:0\">You are overing on {{overingTeam?.name}}</div>\n  ",
        }), 
        __metadata('design:paramtypes', [odds_service_1.OddsService])
    ], OwOddsListComponent);
    return OwOddsListComponent;
}());
exports.OwOddsListComponent = OwOddsListComponent;
//# sourceMappingURL=ow-odds-list-component.js.map