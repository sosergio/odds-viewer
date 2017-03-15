'use strict'
const express    = require('express');    
const bodyParser = require('body-parser');
//const morgan = require('morgan')
//const helmet = require('helmet')
const oddsApi = require('../api/odds-api');
const teamsApi = require('../api/teams-api');
const brokersApi = require('../api/brokers-api');
const oddsAppService = require('../application/odds-app-service');
const oddRepository = require('../repository/odd-repository');
const teamRepository = require('../repository/team-repository');
const brokerRepository = require('../repository/broker-repository');
const seedData = require('../repository/seed-data');

const start = (dbConnection, serverSettings) => {
  return new Promise((resolve, reject) => {

    console.log("SERVER START");
    
    if (!serverSettings.port) {
      reject(new Error('The server must be started with an available port'))
    }

    const app = express();
    var router = express.Router();   

    app.use(function(req,res, next){
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        next();
    });

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    //app.use(morgan('dev'))
    //app.use(helmet())

    //error handler
    app.use((err, req, res, next) => {
      reject(new Error('Something went wrong!, err:' + err))
      res.status(500).send('Something went wrong!')
    })
    
    //load application services and repositories
    var or = oddRepository(dbConnection);
    var tr = teamRepository(dbConnection);
    var br = brokerRepository(dbConnection);
    var os = oddsAppService(or,tr,br);
    oddsApi(router, os);
    teamsApi(router, os);
    brokersApi(router, os);
    
    //seed data
    var sd = seedData(or, tr, br);
    console.log("server.js teamRepo");
    console.log(tr != null);
    sd.seedTeams();
    sd.seedBrokers();
    if(serverSettings.initMockOdds) {
      sd.seedOdds();
    }

    // all of our routes will be prefixed with /api
    app.use('/api', router);
    
    const server = app.listen(serverSettings.port, () => resolve(server))    
  })
}

module.exports = Object.assign({}, {start})