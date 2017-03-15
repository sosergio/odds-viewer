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
var OddsView = (function () {
    function OddsView() {
        this.selectedTeam = null;
    }
    OddsView.prototype.handleOnTeamSelected = function (team) {
        console.log("on click handled");
        this.selectedTeam = team;
    };
    OddsView = __decorate([
        core_1.Component({
            template: "\n    <main>\n        <div class=\"column list-area\">\n            <ow-odds-list (onTeamSelected)=\"handleOnTeamSelected($event)\"></ow-odds-list>\n        </div>        \n        <aside class=\"column\">\n            <ow-odds-graph [team]=\"selectedTeam\"></ow-odds-graph>\n        </aside>\n    <main>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], OddsView);
    return OddsView;
}());
exports.OddsView = OddsView;
//# sourceMappingURL=odds.js.map