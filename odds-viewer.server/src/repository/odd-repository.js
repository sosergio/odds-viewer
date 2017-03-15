var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var OddSchema   = new Schema({
    created:Date,
    values: [Number],
    team_id:Number,
    broker_id:Number
});

module.exports = mongoose.model('Odd', OddSchema);