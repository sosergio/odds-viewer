'use strict'

module.exports = (oddRepository, teamRepository, brokerRepository) => {
        this._oddRepository = oddRepository;
        this._teamRepository = teamRepository;
        this._brokerRepository = brokerRepository;

        const seedTeams = () =>{
            var self = this;
            var teams = ["Barcelona", "Bayern Munich", "Real Madrid", "Juventus", "Borussia Dortmund", "Atletico Madrid", "Manchester City", "Sevilla", "Monaco", "Leicester", "Porto", "Bayern Leverkusen"];
            self._teamRepository.count({}, function(err, count){
                if(count != teams.length){
                    self._teamRepository.remove({}, () => {
                        console.log("Team Collection Dropped");
                        var id = 1;
                        teams.map(t => {
                            self._teamRepository.create({
                                name:t,
                                team_id:id
                            }, function (err, small) {
                                if (err){ 
                                    console.log("TeamRepo Save error:")
                                    console.log(err);
                                    reject(err);
                                }
                                console.log("saved team " + t);
                            });
                            id++;
                        });
                    });
                }
            });
        }


        const seedBrokers = () =>{
            var self = this;
            var brokers = ["Betfair", "Ladbrokers", "Coral"];
            self._brokerRepository.count({}, function(err, count){
                if(count != brokers.length){
                    self._brokerRepository.remove({}, ()=>{
                        console.log("Broker Collection Dropped");
                        var id = 1;
                        self._brokerRepository.map(b => {
                            repository.create({
                                name:b,
                                broker_id:id
                            }, function (err, small) {
                                if (err) reject(err);
                                console.log("saved broker " + b);
                            });
                            id++;
                        });    
                    });
                }
            });
        }


        const seedOdds = () =>{
            var self = this;
            self._brokerRepository.count({}, function(err,brCount){
                let brokersCount = brCount;
                self._teamRepository.find({}, function(err,teams){
                    //init odds
                    self._oddRepository.remove({}, ()=>{
                        console.log("Odd Collection Dropped");
                        for(var b=1; b<=brokersCount;b++){
                        for(var t=1; t<=teams.length;t++){
                            var teamName = teams[t-1].name;
                            var value = getRandomForTeam(teamName);
                            for(var i=0; i<10; i++){
                                let d = daysInPast(i);
                                let v = getRandom(value-3, value+3);
                                let v2 = getRandom(v -0.5, v+0.5);
                                let v3 = getRandom(v -0.5, v+0.5);
                                var odd = {
                                    created:d,
                                    values:[v,v2,v3],
                                    team_id:t,
                                    broker_id:b
                                }    
                                self._oddRepository.create(odd, function (err, small) {
                                    if (err) reject(err);
                                    console.log("saved odd " + d.toLocaleDateString());
                                });    
                            }
                        }    
                    }
                    });           
                });
            });
        }   

        function getRandom(min, max) {
            var res = Math.floor(Math.random() * (max - min + 1)) + min;
            return res < 1 ? 1 : res;
        }

        function getRandomForTeam(t){
            var teamsOdd = {
                "Bayern Munich":3,
                "Barcelona":3,
                "Real Madrid":4.5,
                "Atletico Madrid":12,
                "Juventus":8,
                "Borussia Dortmund":11,
                "Manchester City":12,
                "Bayern Leverkusen":500,
                "Sevilla":25,
                "Porto":250,
                "Leicester":25,
                "Monaco":50
            };
            var res = getRandom(teamsOdd[t] - 3, teamsOdd[t] + 3);
            return res < 1 ? 1 : res;
        }

        function daysInPast(days){
            var dat = new Date();
            dat.setHours(0,0,0,0);
            dat.setDate(dat.getDate() - days);
            return dat;        
        }

        return Object.create({
            seedTeams,
            seedOdds,
            seedBrokers
        });
};