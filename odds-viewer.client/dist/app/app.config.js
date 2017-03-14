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
var Observable_1 = require('rxjs/Observable');
var http_1 = require('@angular/http');
var AppConfig = (function () {
    function AppConfig(http) {
        this.http = http;
    }
    AppConfig.prototype.load = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.get('config/env.json')
                .map(function (res) { return res.json(); })
                .subscribe(function (env_data) {
                _this._env = env_data;
                _this.http.get('config/' + env_data.env + '.json')
                    .map(function (res) { return res.json(); })
                    .catch(function (error) {
                    console.error(error);
                    return Observable_1.Observable.throw(error.json().error || 'Server error');
                })
                    .subscribe(function (data) {
                    _this._config = data;
                    resolve(true);
                });
            });
        });
    };
    AppConfig.prototype.getEnv = function (key) {
        return this._env[key];
    };
    AppConfig.prototype.get = function (key) {
        return this._config[key];
    };
    AppConfig.prototype.apiBaseUrl = function () {
        return this._config && this._config["apiBaseUrl"] || "";
    };
    AppConfig = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], AppConfig);
    return AppConfig;
}());
exports.AppConfig = AppConfig;
;
//# sourceMappingURL=app.config.js.map