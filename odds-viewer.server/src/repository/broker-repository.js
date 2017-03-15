var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var BrokerSchema   = new Schema({
    broker_id:Number,
    name:Number,
    pictureUrl:String
});

module.exports = mongoose.model('Broker', BrokerSchema);