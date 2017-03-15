const dbSettings = {
  db: process.env.DB || 'FoodTrackDb',
  user: process.env.DB_USER || 'sosergio',
  pass: process.env.DB_PASS || 'penbird12$',
  repl: process.env.DB_REPLS || 'ft-cluster-shard-0',
  servers: (process.env.DB_SERVERS) ? process.env.DB_SERVERS.split(' ') : [
    'ft-cluster-shard-00-00-uh1mk.mongodb.net:27017',
    'ft-cluster-shard-00-01-uh1mk.mongodb.net:27017',
    'ft-cluster-shard-00-02-uh1mk.mongodb.net:27017'
  ],
  serverParameters: () => ({
    autoReconnect: true,
    poolSize: 10,
    socketoptions: {
      keepAlive: 300,
      connectTimeoutMS: 30000,
      socketTimeoutMS: 30000
    }
  })
}

const serverSettings = {
  port: process.env.PORT || 5000
}

module.exports = Object.assign({}, { dbSettings, serverSettings })
