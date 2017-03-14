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
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
var odd_1 = require('./odd');
var app_config_1 = require('../app.config');
var http_proxy_1 = require('./http-proxy');
require('rxjs/add/observable/from');
var OddsService = (function () {
    function OddsService(http, config) {
        this.config = config;
        this._httpProxy = new http_proxy_1.HttpProxy(http, config);
    }
    OddsService.prototype.getOdds = function () {
        return this._httpProxy.getAsync("/odds")
            .map(function (res) { return res.json(); });
    };
    OddsService.prototype.getTeams = function () {
        return this._httpProxy.getAsync("/teams")
            .map(function (res) { return res.json(); });
    };
    OddsService.prototype.getBrokers = function () {
        return this._httpProxy.getAsync("/brokers")
            .map(function (res) { return res.json(); });
    };
    OddsService.prototype.getRandom = function (min, max) {
        return Math.random() * (max - min + 1) + min;
    };
    OddsService.prototype.daysInPast = function (days) {
        var dat = new Date();
        dat.setDate(dat.getDate() - days);
        return dat;
    };
    OddsService.prototype.getOddsHistory = function (teamId) {
        if (this.config.getEnv("env") === "mock") {
            var date = new Date();
            var value = this.getRandom(3, 50);
            var mocks = new Array();
            for (var i = 0; i < 15; i++) {
                var d = this.daysInPast(i);
                var v = this.getRandom(value - 1, value + 1);
                mocks.push(new odd_1.Odd(d, v, teamId, 1));
            }
            return Observable_1.Observable.from(new Array(mocks));
        }
        else {
            return this._httpProxy.getAsync("/odds/" + teamId)
                .map(function (res) { return res.json(); });
        }
    };
    OddsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, app_config_1.AppConfig])
    ], OddsService);
    return OddsService;
}());
exports.OddsService = OddsService;
//# sourceMappingURL=odds-service.js.map