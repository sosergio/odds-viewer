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
var platform_browser_1 = require('@angular/platform-browser');
var router_1 = require('@angular/router');
var app_config_1 = require('./app.config');
var http_1 = require('@angular/http');
var app_component_1 = require('./app.component');
var odds_1 = require('./views/odds');
var ow_header_component_1 = require('./ow-header/ow-header-component');
var ow_odds_list_component_1 = require('./ow-odds-list/ow-odds-list-component');
var ow_odds_graph_component_1 = require('./ow-odds-graph/ow-odds-graph-component');
var angular2_highcharts_1 = require('angular2-highcharts');
var appRoutes = [
    { path: '', component: odds_1.OddsView }
];
//a way of loading settings before loading the rest of the app
function configServiceFactory(http, config) {
    console.log("ConfigServiceFactory Load");
    return function () { return config.load(); };
}
var AppModule = (function () {
    function AppModule() {
        console.log("AppModule Constructor");
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                router_1.RouterModule.forRoot(appRoutes),
                angular2_highcharts_1.ChartModule.forRoot(require('highcharts')),
                http_1.HttpModule
            ],
            declarations: [
                app_component_1.AppComponent,
                ow_header_component_1.OwHeaderComponent,
                ow_odds_graph_component_1.OwOddsGraphComponent,
                ow_odds_list_component_1.OwOddsListComponent,
                odds_1.OddsView,
            ],
            bootstrap: [app_component_1.AppComponent],
            providers: [
                app_config_1.AppConfig,
                {
                    provide: core_1.APP_INITIALIZER,
                    useFactory: configServiceFactory,
                    deps: [http_1.Http, app_config_1.AppConfig],
                    multi: true
                }
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map