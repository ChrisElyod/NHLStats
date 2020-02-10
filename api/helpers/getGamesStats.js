const axios = require('axios');

var getGames = async function() {
	return axios.get(`https://statsapi.web.nhl.com/api/v1/schedule`)
		.then((res) => {
			const games = [];
			res.data.dates[0].games.map((game) => {
					games.push(game.gamePk);
			});
			return games;
		});
};

module.exports = getGames;