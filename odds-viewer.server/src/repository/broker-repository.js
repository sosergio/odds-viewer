var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var BrokerSchema   = new Schema({
    broker_id:Number,
    name:String,
    pictureUrl:String
});

module.exports = (dbConnection) => {
    this.dbConnection = dbConnection;
    return this.dbConnection.model('Broker', BrokerSchema);
}