'use strict'
const status = require('http-status')

module.exports = (router, oddsAppService) => {
  this._oddsAppService = oddsAppService;
  
  router.route('/brokers')
        .get((req, res, next) => {
            this._oddsAppService.getBrokers().then(brokers => {
                res.status(status.OK).json(brokers);
            }).catch(next)
        });
}