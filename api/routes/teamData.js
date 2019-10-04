var express = require('express');
var router = express.Router();
const axios = require('axios');

/* GET Data for all teams. */
router.get('/', function(req, res, next) {
  let homeTeam = '';
  let awayTeam = '';
  let winningTeam = '';
  let shotsFor = 0;
  let shotsAgainst = 0;

  // Gets information on all teams in the NHL
  axios.get('https://statsapi.web.nhl.com/api/v1/teams')
    .then(res => {
      // Get all teams previous match history to update database
      res.data.teams.map(e => {
        axios.get(`https://statsapi.web.nhl.com/api/v1/teams/${e.id}?expand=team.schedule.previous`)
          .then(res => {
            let checkedTeam = res.data.teams[0].name;
            axios.get(`https://statsapi.web.nhl.com/api/v1/game/${res.data.teams[0].previousGameSchedule.dates[0].games[0].gamePk}/linescore`)
              .then(res => {
                if(checkedTeam === res.data.teams.home.team.name){
                  // Determine which team was home and which was away
                  homeTeam = checkedTeam;
                  awayTeam = res.data.teams.away.team.name;

                  // Get shots on goal and shots against - broken down by period
                  let periods = res.data.periods;
                  periods.map(period => {
                    console.log(period);
                    shotsFor += period.home.shotsOnGoal;
                    shotsAgainst += period.away.shotsOnGoal;
                  });
                  console.log(shotsFor, shotsAgainst);

                } else {
                  homeTeam = res.data.teams.home.team.name;
                  awayTeam = checkedTeam;
                }

              });            
          })
          shotsFor = 0;
          shotsAgainst = 0;
      })
    });
});


module.exports = router;
