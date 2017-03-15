"use strict";
var Odd = (function () {
    function Odd(date, values, teamId, brokerId) {
        this.created = date;
        this.values = values;
        this.team_id = teamId;
        this.broker_id = brokerId;
    }
    Object.defineProperty(Odd.prototype, "best", {
        get: function () {
            return Math.max.apply(0, this.values);
        },
        enumerable: true,
        configurable: true
    });
    return Odd;
}());
exports.Odd = Odd;
//# sourceMappingURL=odd.js.map