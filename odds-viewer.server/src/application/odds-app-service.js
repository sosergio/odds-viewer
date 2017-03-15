
'use strict'
module.exports = (oddRepository, teamRepository, brokerRepository) => {
    this._oddRepository = oddRepository;
    this._teamRepository = teamRepository;
    this._brokerRepository = brokerRepository;
    
    const getOdds = () => {
        return new Promise((resolve, reject) => {
            this._oddRepository.find(function(err, response) {
                if (err) reject(err);
                console.log("Odds retrieved with success");
                resolve(response);
            });
        });   
    }

    const getOddsHistory = (teamId) => {
        return new Promise((resolve, reject) => {
            this._oddRepository.find(function(err, response) {
                if (err) reject(err);
                console.log("Odds retrieved with success");
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

    const initOddsData = () => {
        return new Promise((resolve, reject) => {

            //init teams
            var teams = ["Barcelona", "Bayern Munich", "Real Madrid", "Juventus", "Borussia Dortmund", "Atletico Madrid", "Manchester City", "Sevilla", "Monaco", "Leicester", "Porto", "Bayern Leverkusen"];
            var counter = 1;
            teams.map(t => {
                this._teamRepository.create({
                    name:t,
                    team_id:counter
                }, function (err, small) {
                    if (err) reject(err);
                    console.log("saved team " + t);
                });
                counter = counter++;
            });

            //init brokers
            var brokers = ["Betfair", "Ladbrokers", "Coral"];
            counter = 1;
            brokers.map(b => {
                this._brokerRepository.create({
                    name:b,
                    broker_id:counter
                }, function (err, small) {
                    if (err) reject(err);
                    console.log("saved broker " + b);
                })
                counter = counter++;
            });

            //init odds
            for(var b=0; b<brokers.length;b++){
                for(var t=0; t<brokers.length;t++){
                    var date = new Date();
                    var value = getRandom(3, 50);
                    for(var i=0; i<15; i++){
                        let d = daysInPast(i);
                        let v = getRandom(value -1, value+1);
                        let v2 = getRandom(v -0.5, v+0.5);
                        let v3 = getRandom(v -0.5, v+0.5);
                        var odd = {
                            created:d,
                            values:[v,v2,v3],
                            team_id:teams[t].team_id,
                            broker_id:brokers[b].broker_id
                        }    
                        this._oddRepository.create(odd, function (err, small) {
                            if (err) reject(err);
                            console.log("saved odd " + d.toLocaleDateString());
                        });    
                    }
                }    
            }
        });   

        function getRandom(min, max) {
            return Math.random() * (max - min + 1) + min;
        }

        function daysInPast(days){
            var dat = new Date();
            dat.setDate(dat.getDate() - days);
            return dat;        
        }
    
    }
    

    return Object.create({
        getOdds,
        getTeams,
        getBrokers,
        getOddsHistory,
        initOddsData
    })
}