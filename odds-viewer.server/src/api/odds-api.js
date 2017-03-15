'use strict'
const status = require('http-status')

module.exports = (router, oddsAppService) => {
    this._oddsAppService = oddsAppService;
  
    router.route('/odds')
        .get((req, res, next) => {
            this._oddsAppService.getOdds().then(odds => {
                res.status(status.OK).json(odds);
            }).catch(next)
        });

    router.route('/odds/teams/:teamId/brokers/:brokerId')
        .get((req, res, next) => {
            this._oddsAppService.getOddsHistory(req.params.teamId, req.params.brokerId).then(odds => {
                res.status(status.OK).json(odds);
            }).catch(next)
        });
}