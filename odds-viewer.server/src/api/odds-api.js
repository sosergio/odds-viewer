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

 router.route('/odds/init')
        .get((req, res, next) => {
            this._oddsAppService.initOddsData().then(odds => {
                res.status(status.OK).json(odds);
            }).catch(next)
        });
}