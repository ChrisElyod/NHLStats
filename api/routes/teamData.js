var express = require('express');
var router = express.Router();
const CronJob = require('cron').CronJob;
const axios = require('axios');
const helper = require('../helpers/getGamesStats');
const { Pool, Client } = require('pg');
const db = require('../db');
const getGames = require('../helpers/getGamesStats');

const config = {
  host: 'localhost',
  user: 'postgres',
  password: 'postgres',
  database: 'NHLStats',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000
}

/* Uses combination of axios and postgres db requests to populate game_stats table in the team schema */
/* CronJob runs every night at 2am to ensure all *current* games for that day are done */
// new CronJob('0 2 * * *', function() {
// }, null, true, 'America/Los_Angeles');
router.post('/', async function(req, res, next) {  
  const daysGames = await getGames();

  console.log(daysGames)

  const gameIDs = daysGames.join(', ')
  //testing single query to database with all game id's
  db.query("SELECT * FROM team.sp_cleanArrayForSelectTest($1)",[gameIDs], function(err, res) {
    if (err) {
      console.log('Error: ', err);
    } else {
      console.log('No Error: ', res);
    }
  
  });

  // daysGames.map((gameID) => {
  //   db.query('SELECT * FROM team.game_stats WHERE game_id = $1', [gameID], (err, res) => {
  //     if (err) {
  //       console.error(err);
  //       return
  //     }
  //     if (res.rowCount === 0 && res.rowCount < 2) {
  //       if (res.rows[0].gameID && !res.rows[0].hometeamstats) {
  //         console.log('game exists in db but not all data is present')
  //       } else {
  //         console.log('game does not exist in DB')
  //         axios.get(`https://statsapi.web.nhl.com/api/v1/game/${gameID}/boxscore`)
  //           .then((res) => {
  //             db.query(`INSERT INTO team.game_stats(game_id, hometeam, hometeamstats, awayteam, awayteamstats) VALUES ($1, $2, $3, $4, $5)`, [gameID, res.data.teams.home.team.id, res.data.teams.home.teamStats.teamSkaterStats, res.data.teams.away.team.id, res.data.teams.away.teamStats.teamSkaterStats], async (err, res) => {
  //               if (err) {
  //                 console.log('Error on insert: ', err);
  //               } else {
  //                 console.log('Data inserted into table: ', res);
  //               }        
  //             });
  //           });
  //       }
  //     } else {
  //       console.log('Game already exists in DB')
  //     }
  //   });
  // });
  res.status(200).json({Hi: 'How are ya'})
});


module.exports = router;


                // const awayPlayers = res.data.teams.away.players;
                // const homePlayers = res.data.teams.home.players;
                // // Parse through away players in given game and attempt to insert the row into the database (given it doesn't exist)
                // for (var player in awayPlayers) {
                //   if (awayPlayers.hasOwnProperty(player)) {
                //     if (Object.entries(awayPlayers[player].stats).length !== 0 && awayPlayers[player].stats.constructor === Object) {
                //       let playerGameID = awayPlayers[player].person.id.toString() + '_' + gameID.toString();
                //       let playerGameStats = awayPlayers[player].stats;
                //       let playerID = awayPlayers[player].person.id;
                //       let teamID = res.data.teams.away.team.id;
                //       // console.log(awayPlayers[player].person.fullName, awayPlayers[player].stats);
                //     } else { 
                //       // console.log('no game data');
                //     }
                //   }
                // }
                // // Parse through away players in given game and attempt to insert the row into the database (given it doesn't exist)
                // for (var player in homePlayers) {
                //   if (homePlayers.hasOwnProperty(player)) {
                //     if (Object.entries(homePlayers[player].stats).length !== 0 && homePlayers[player].stats.constructor === Object) {
                //       let playerGameID = homePlayers[player].person.id.toString() + '_' + gameID.toString();
                //       let playerGameStats = homePlayers[player].stats;
                //       let playerID = homePlayers[player].person.id;
                //       let teamID = res.data.teams.away.team.id;
                //       // console.log(homePlayers[player].person.fullName, homePlayers[player].stats);
                //     } else { 
                //       // console.log('no game data');
                //     }
                //   }
                // }