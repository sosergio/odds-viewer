var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var TeamSchema   = new Schema({
    team_id:Number,
    name:String,
    pictureUrl:String
});

module.exports = (dbConnection) => {
    this.dbConnection = dbConnection;
    return this.dbConnection.model('Team', TeamSchema);
}

