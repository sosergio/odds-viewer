var environment = require('./config/environment');
var db = require('./config/database');
var server = require('./server/server');

 db.connect(environment.dbSettings)
   .then(dbConn => server.start(dbConn, environment.serverSettings),
         rej => console.log(rej));