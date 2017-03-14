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
var OwHeaderComponent = (function () {
    function OwHeaderComponent() {
    }
    OwHeaderComponent = __decorate([
        core_1.Component({
            selector: 'ow-header',
            template: "<header>\n      <h1>Odds Viewer</h1>\n      <nav>\n          <a routerLink=\"/\" routerLinkActive=\"active\">Home</a>\n      </nav>\n      <div style=\"clear:both;\"></div>\n  </header>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], OwHeaderComponent);
    return OwHeaderComponent;
}());
exports.OwHeaderComponent = OwHeaderComponent;
//# sourceMappingURL=ow-header-component.js.map