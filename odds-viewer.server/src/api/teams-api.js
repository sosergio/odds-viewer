'use strict'
const status = require('http-status')

module.exports = (router, oddsAppService) => {
  this._oddsAppService = oddsAppService;
  
  router.route('/teams')
        .get((req, res, next) => {
            this._oddsAppService.getTeams().then(teams => {
                res.status(status.OK).json(teams);
            }).catch(next)
        });
}