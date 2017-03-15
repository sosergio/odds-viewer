var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var TeamSchema   = new Schema({
    broker_id:Number,
    name:Number,
    
    pictureUrl:String
});

module.exports = mongoose.model('Team', TeamSchema);