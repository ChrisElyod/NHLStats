const { ApolloServer, gql } = require('apollo-server');
const axios = require('axios');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
	# Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Teams {
    id: Int
    name: String
    link: String
    venue: Venue
    abbreviation: String
    teamName: String
    locationName: String
    firstYearOfPlay: String
    division: Division
    conference: Conference
    franchise: Franchise
    shortName: String
    officialSiteUrl: String
    franchiseId: Int
    active: Boolean
	}
	type Division {
		id: Int
		name: String
		nameShort: String
		link: String
		abbreviation: String
	}
	type Venue {
		name: String
		link: String
		city: String
		timeZone: TimeZone
	}
	type TimeZone {
		id: String
		offset: Int
		tz: String
	}
	type Conference {
		id: ID!
		name: String
		link: String
	}
	type Franchise {
		franchiseId: ID!
		teamName: String
		link: String
	}
	type Players {
		id: ID!
		fullName: String
		link: String
		firstName: String
		lastName: String
		primaryNumber: String
		birthDate: String
		currentAge: Int
		birthCity: String
		birthStateProvince: String
		birthCountry: String
		nationality: String
		height: String
		weight: Int
		active: Boolean
		alternateCaptain: String
		captain: String
		rookie: String
		shootsCatches: String
		rosterStatus: String
		currentTeam: CurrentTeam
		primaryPosition: PrimaryPosition
	}
	type CurrentTeam {
		id: ID!
		name: String
		link: String
	}
	type PrimaryPosition {
		code: String
		name: String
		type: String
		abbreviation: String
	}
	type Schedule {
		copyright: String
		totalItems: Int
		totalEvents: Int
		totalGames: Int
		totalMatches: Int
		dates: [Dates]
	}
	type Dates {
		date: String
		totalItems: Int
		totalEvents: Int
		totalGames: Int
		totalMatches: Int
		games: [Game]
	}
	type Game {
		gamePk: Int
		link: String
		gameType: String
		season: String
		gameDate: String
		status: Status
		teams: ScheduleTeams
	}
	type ScheduleTeams {
		away: Away
		home: Home
	}
	type Away {
		leagueRecord: LeagueRecord
		score: Int
		team: Team
	}
	type Home {
		leagueRecord: LeagueRecord
		score: Int
		team: Team
	}
	type Team {
		id: ID!
		name: String
		link: String
	}
	type LeagueRecord {
		wins: Int
		losses: Int
		ot: Int
		type: String
	}
	type Status {
		abstractGameState: String
		codedGameState: String
		detailedState: String
		statusCode: String
		startTimeTBD: Boolean
	}
	type TeamStats {
		gamesPlayed: Int,
		wins: Int,
		losses: Int
		ot: Int
		pts: Int
		ptPctg: String
		goalsPerGame: Float
		goalsAgainstPerGame: Float
		evGGARatio: Float
		powerPlayPercentage: String
		powerPlayGoals: Int
		powerPlayGoalsAgainst: Int
		powerPlayOpportunities: Int
		penaltyKillPercentage: String
		shotsPerGame: Float
		shotsAllowed: Float
		winScoreFirst: Float
		winOppScoreFirst: Float
		winLeadFirstPer: Float
		winLeadSecondPer: Float
		winOutshootOpp: Float
		winOutshotByOpp: Float
		faceOffsTaken: Float
		faceOffsWon: Int
		faceOffsLost: Int
		faceOffWinPercentage: String
		shootingPctg: Float
		savePctg: Float
	}
	type TeamStatsRank {
		wins: String
		losses: String
		ot: String
		pts: String
		ptPctg: String
		goalsPerGame: String
		goalsAgainstPerGame: String
		evGGARatio: String
		powerPlayPercentage: String
		powerPlayGoals: String
		powerPlayGoalsAgainst: String
		powerPlayOpportunities: String
		penaltyKillPercentage: String
		shotsPerGame: String
		shotsAllowed: String
		winScoreFirst: String
		winOppScoreFirst: String
		winLeadFirstPer: String
		winLeadSecondPer: String
		winOutshootOpp: String
		winOutshotByOpp: String
		faceOffsTaken: String
		faceOffsWon: String
		faceOffsLost: String
		faceOffWinPercentage: String
		savePctRank: String
		shootingPctRank: String
	}

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
		teams(id: ID): [Teams]
		teamStats(id: ID): TeamStats
		teamStatsRank(id: ID): TeamStatsRank
		players(id: ID): [Players]
		schedule(teamId: ID, startDate: String, endDate: String): Schedule
  }
`;
// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
	Query: {
		teams: (data, args) => {
			if(args.id) {
				return axios.get(`https://statsapi.web.nhl.com/api/v1/teams/${args.id}`)
				.then((res) => {
					return res.data.teams;
				});
			}
			return axios.get('https://statsapi.web.nhl.com/api/v1/teams')
				.then((res) => {
					return res.data.teams;
			});
		},
		teamStats: (data, args) => {			
			return axios.get(`https://statsapi.web.nhl.com/api/v1/teams/${args.id}/stats`)
				.then(res => {
					return res.data.stats[0].splits[0].stat;
				});
		},
		teamStatsRank: (data, args) => {
			console.log(args.id)
			return axios.get(`https://statsapi.web.nhl.com/api/v1/teams/${args.id}/stats`)
				.then(res => {
					console.log(res.data.stats[1].splits[0].stat);
					return res.data.stats[1].splits[0].stat;
				});
		},		
		players: (data, args) => {
			return axios.get(`https://statsapi.web.nhl.com/api/v1/people/${args.id}`)
				.then((res) => {
					return res.data.people;
				})
		},
		schedule: (data, args) => {
			if (args.startDate && args.endDate && args.teamId) {
			return axios.get(`https://statsapi.web.nhl.com/api/v1/schedule?startDate=${args.startDate}&endDate=${args.endDate}&teamId=${args.teamId}`)
				.then((res) => {
					return res.data
				})
			}
			return axios.get('https://statsapi.web.nhl.com/api/v1/schedule')
				.then((res) => {
					return res.data
				})
		}
	},
};

  // The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});