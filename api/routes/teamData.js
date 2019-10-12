var express = require('express');
var router = express.Router();
const axios = require('axios');
const db = require('../db');

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
            db.query('SELECT * FROM team.game_stats WHERE game_id = $1', [res.data.teams[0].previousGameSchedule.dates[0].games[0].gamePk],(err, res) => {
              if (res.rows.length === 0) {
                axios.get('https://statsapi.web.nhl.com/api/v1/game/2019020019/boxscore')
                  .then(res => {
                    console.log(res.data.teams.away.teamStats.teamSkaterStats);
                    console.log(res.data.teams.home.teamStats.teamSkaterStats);
                  })
              }
            })
          });            
      });
  })
});

module.exports = router;
