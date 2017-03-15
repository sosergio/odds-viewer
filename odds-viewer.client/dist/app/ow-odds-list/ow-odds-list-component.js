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
var OwOddsListComponent = (function () {
    function OwOddsListComponent(_oddsService) {
        var _this = this;
        this.onOddSelected = new core_1.EventEmitter();
        this.sort = {
            by: "team",
            asc: false
        };
        this.hashmap = [];
        this.oddsService = _oddsService;
        this.odds = new Array();
        this.oddsService.getBrokers()
            .subscribe(function (res) {
            _this.brokers = res;
            _this.oddsService.getTeams()
                .subscribe(function (res) {
                _this.teams = res;
                _this.oddsService.getOdds()
                    .subscribe(function (res) {
                    _this.odds = res.map(function (r) {
                        r.broker = _this.brokers.find(function (b) { return b.broker_id === r.broker_id; });
                        r.team = _this.teams.find(function (t) { return t.team_id === r.team_id; });
                        var teamOdds = _this.hashmap.find(function (h) { return h.team === r.team.name; });
                        if (!teamOdds) {
                            teamOdds = {
                                "team": r.team.name,
                                "team_id": r.team_id,
                            };
                            _this.hashmap.push(teamOdds);
                        }
                        teamOdds[r.broker.name] = r.best;
                        return r;
                    });
                    _this.sortBy("team");
                });
            });
        });
    }
    OwOddsListComponent.prototype.findOdd = function (brokerId, teamId) {
        return this.odds.find(function (o) { return o.broker_id == brokerId && o.team_id == teamId; });
    };
    OwOddsListComponent.prototype.over = function (event, odd) {
        this.mouseLeft = event.pageX + 10 + "px";
        this.mouseTop = event.pageY + 10 + "px";
        this.overingOdd = odd;
    };
    OwOddsListComponent.prototype.onOddClick = function (teamId, brokerId) {
        this.onOddSelected.emit(this.findOdd(brokerId, teamId));
    };
    OwOddsListComponent.prototype.sortBy = function (pro) {
        var _this = this;
        this.sort.asc = this.sort.by === pro ? !this.sort.asc : true;
        this.sort.by = pro;
        this.hashmap = this.hashmap.sort(function (a, b) {
            if (a[pro] < b[pro])
                return _this.sort.asc ? -1 : 1;
            else if (a[pro] > b[pro])
                return _this.sort.asc ? 1 : -1;
            return 0;
        });
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], OwOddsListComponent.prototype, "onOddSelected", void 0);
    OwOddsListComponent = __decorate([
        core_1.Component({
            selector: 'ow-odds-list',
            template: "<h2>Best Odds</h2>\n   <table cellspacing=\"0\">\n   <thead>\n        <tr>\n            <th (click)=\"sortBy('team')\">Team</th>\n            <th *ngFor=\"let b of brokers\" (click)=\"sortBy(b.name)\" >{{b.name}}</th>\n        </tr>\n    </thead>\n    <tbody>\n        <tr *ngFor=\"let h of hashmap\">\n          <td>{{h.team}}</td>\n          <td *ngFor=\"let o of brokers\" (mousemove)=\"over($event, findOdd(o.broker_id, h.team_id))\" (mouseleave)=\"overingOdd=null\">\n              <a href=\"#\" (click)=\"onOddClick(h.team_id,o.broker_id)\">{{h[o.name]}}</a>\n          </td>\n        </tr>\n    </tbody>\n  </table>\n  <div [style.left]=\"mouseLeft\" [style.top]=\"mouseTop\" id=\"overing-odd\" [style.opacity]=\"overingOdd?1:0\">\n      <em>{{overingOdd?.broker?.name}} odds for {{overingOdd?.team?.name}}:</em>\n      <table>\n        <tr>\n          <td *ngFor=\"let oo of overingOdd?.values\">{{oo}}</td>\n        </tr>\n      </table>\n  </div>\n  ",
        }), 
        __metadata('design:paramtypes', [odds_service_1.OddsService])
    ], OwOddsListComponent);
    return OwOddsListComponent;
}());
exports.OwOddsListComponent = OwOddsListComponent;
//# sourceMappingURL=ow-odds-list-component.js.map