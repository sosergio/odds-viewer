
'use strict'
module.exports = (oddRepository, teamRepository, brokerRepository) => {
    this._oddRepository = oddRepository;
    this._teamRepository = teamRepository;
    this._brokerRepository = brokerRepository;

    const getOdds = () => {
        var self = this;
        return new Promise((resolve, reject) => {
            self._oddRepository.findOne({})
                .sort('-created')
                .exec(function(err, result){
                    self._oddRepository.where('created').equals(result.created)
                        .exec(function(err, response) {
                            if (err) reject(err);
                            console.log("Odds retrieved with success");
                            resolve(response);
                    });
                });
        });   
    }

    const getOddsHistory = (teamId, brokerId) => {
        var self = this;
        return new Promise((resolve, reject) => {
            console.log("find for teamId: " +teamId );
            self._oddRepository.find({'team_id':teamId,'broker_id':brokerId}).sort('created').exec(function(err, response) {
                if (err) reject(err);
                console.log("Odds for a team retrieved with success");
                resolve(response);
            });
        });   
    }
    
    const getTeams = () => {
        return new Promise((resolve, reject) => {
            this._teamRepository.find(function(err, response) {
                if (err) reject(err);
                console.log("Teams retrieved with success");
                resolve(response);
            });
        });   
    }

    const getBrokers = () => {
        return new Promise((resolve, reject) => {
            this._brokerRepository.find(function(err, response) {
                if (err) reject(err);
                console.log("Brokers retrieved with success");
                resolve(response);
            });
        });   
    }

    return Object.create({
        getOdds,
        getTeams,
        getBrokers,
        getOddsHistory
    })
}