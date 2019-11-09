var express = require('express');
var router = express.Router();
const CronJob = require('cron').CronJob;
const axios = require('axios');
const { Pool } = require('pg');
// const db = require('../db');

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: 'postgres',
  database: 'NHLStats',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

/* Uses combination of axios and postgres db requests to populate game_stats table in the team schema */
/* CronJob runs every night at 2am to ensure all *current* games for that day are done */
// new CronJob('0 2 * * *', function() {
// }, null, true, 'America/Los_Angeles');
router.get('/', function(req, res, next) {
  // Gets information on all teams in the NHL
  axios.get('https://statsapi.web.nhl.com/api/v1/teams')
    .then(res => {
      // Get all teams previous match history to update database
      res.data.teams.map((e) => {
        let gameID = '';
        axios.get(`https://statsapi.web.nhl.com/api/v1/teams/${e.id}?expand=team.schedule.previous`)
          .then(async res => {
            gameID = res.data.teams[0].previousGameSchedule.dates[0].games[0].gamePk;
            const client = await pool.connect();
            try {
              await client.query('BEGIN');
              const res = await client.query('SELECT game_id from team.game_stats WHERE game_stats = $1', [gameID]);
              await client.query('COMMIT');
              console.log('1');
            } catch (e) {
              await client.query('ROLLBACK');
              throw e
            } finally {
              client.release();
            }
            

            axios.get(`https://statsapi.web.nhl.com/api/v1/game/${gameID}/boxscore`)
              .then(res => {
                // Insert Game data into the database
                console.log('2');
                db.query(`INSERT INTO team.game_stats(game_id, hometeam, hometeamstats, awayteam, awayteamstats) VALUES 
                          ($1, $2, $3, $4, $5)`, [gameID, res.data.teams.home.team.id, res.data.teams.home.teamStats.teamSkaterStats, res.data.teams.away.team.id, res.data.teams.away.teamStats.teamSkaterStats], async (err, res) => {
                  if (err) {
                    console.log('Error on insert: ', err);
                  } else {
                    console.log(res);
                  }        
                });
            });
          });

            //     // const awayPlayers = res.data.teams.away.players;
            //     // const homePlayers = res.data.teams.home.players;
            //     // // Parse through away players in given game and attempt to insert the row into the database (given it doesn't exist)
            //     // for (var player in awayPlayers) {
            //     //   if (awayPlayers.hasOwnProperty(player)) {
            //     //     if (Object.entries(awayPlayers[player].stats).length !== 0 && awayPlayers[player].stats.constructor === Object) {
            //     //       let playerGameID = awayPlayers[player].person.id.toString() + '_' + gameID.toString();
            //     //       let playerGameStats = awayPlayers[player].stats;
            //     //       let playerID = awayPlayers[player].person.id;
            //     //       let teamID = res.data.teams.away.team.id;
            //     //       // console.log(awayPlayers[player].person.fullName, awayPlayers[player].stats);
            //     //     } else { 
            //     //       // console.log('no game data');
            //     //     }
            //     //   }
            //     // }
            //     // // Parse through away players in given game and attempt to insert the row into the database (given it doesn't exist)
            //     // for (var player in homePlayers) {
            //     //   if (homePlayers.hasOwnProperty(player)) {
            //     //     if (Object.entries(homePlayers[player].stats).length !== 0 && homePlayers[player].stats.constructor === Object) {
            //     //       let playerGameID = homePlayers[player].person.id.toString() + '_' + gameID.toString();
            //     //       let playerGameStats = homePlayers[player].stats;
            //     //       let playerID = homePlayers[player].person.id;
            //     //       let teamID = res.data.teams.away.team.id;
            //     //       // console.log(homePlayers[player].person.fullName, homePlayers[player].stats);
            //     //     } else { 
            //     //       // console.log('no game data');
            //     //     }
            //     //   }
            //     // }
            //   })
            //   .catch(err => {
            //     console.log(err);
            //   });
            // }          
    });
  });
});


module.exports = router;
