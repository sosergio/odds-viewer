var mongoose   = require('mongoose');
//mongoose.connect('mongodb://sosergio:penbird12$@ft-cluster-shard-00-00-uh1mk.mongodb.net:27017,ft-cluster-shard-00-01-uh1mk.mongodb.net:27017,ft-cluster-shard-00-02-uh1mk.mongodb.net:27017/FoodTrackDb?ssl=true&replicaSet=ft-cluster-shard-0&authSource=admin'); // connect to our database

const getMongoURL = (options) => {
    return 'mongodb://sosergio:penbird12$@ft-cluster-shard-00-00-uh1mk.mongodb.net:27017,ft-cluster-shard-00-01-uh1mk.mongodb.net:27017,ft-cluster-shard-00-02-uh1mk.mongodb.net:27017/FoodTrackDb?ssl=true&replicaSet=ft-cluster-shard-0&authSource=admin';
    const url = options.servers
        .reduce((prev, cur) => prev + cur + ',', 'mongodb://')
    return `${url.substr(0, url.length - 1)}/${options.db}`
}

const connect = (options) => {
    return new Promise((resolve, reject) => {
        let dbURI = getMongoURL(options);
        mongoose.connect(dbURI);

        // CONNECTION EVENTS
        // When successfully connected
        mongoose.connection.on('connected', function () {  
            console.log('Mongoose default connection open to ' + dbURI);
            resolve(true);
        }); 

        // If the connection throws an error
        mongoose.connection.on('error',function (err) {  
            console.log('Mongoose default connection error: ' + err);
            reject(err);
        }); 

    });
};
  
module.exports = Object.assign({}, {connect})