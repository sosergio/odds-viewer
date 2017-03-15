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
var odd_1 = require('../services/odd');
var OwOddsGraphComponent = (function () {
    function OwOddsGraphComponent(_oddsService) {
        this.oddsService = _oddsService;
    }
    OwOddsGraphComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (this.odd) {
            this.oddsService.getOddsHistory(this.odd.team_id, this.odd.broker_id)
                .subscribe(function (res) {
                console.log(res);
                _this.options = {
                    title: { text: _this.odd.broker.name + " best for " + _this.odd.team.name },
                    xAxis: {
                        type: 'datetime'
                    },
                    series: [{
                            data: res.map(function (r) {
                                var o = new odd_1.Odd(r.created, r.values, r.team_id, r.broker_id);
                                var d = new Date(r.created);
                                var best = o.best;
                                return { y: best, x: d, name: _this.odd.team.name + " best odd on " + d.toLocaleDateString() };
                            }),
                        }]
                };
            });
        }
        else {
            this.options = {};
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', odd_1.Odd)
    ], OwOddsGraphComponent.prototype, "odd", void 0);
    OwOddsGraphComponent = __decorate([
        core_1.Component({
            selector: 'ow-odds-graph',
            template: "<h2>Price Movement</h2> \n    <div [hidden]=\"odd\">Please select an odd</div>\n    <chart [hidden]=\"!odd\" [options]=\"options\"></chart>\n  ",
        }), 
        __metadata('design:paramtypes', [odds_service_1.OddsService])
    ], OwOddsGraphComponent);
    return OwOddsGraphComponent;
}());
exports.OwOddsGraphComponent = OwOddsGraphComponent;
//# sourceMappingURL=ow-odds-graph-component.js.map