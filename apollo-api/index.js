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

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
		teams: [Teams]
		players(id: ID!): [Players]
  }
`;
// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
	Query: {
		teams: () => {
			return axios.get('https://statsapi.web.nhl.com/api/v1/teams')
				.then((res) => {
					return res.data.teams;
			});
		},
		players: ({ id }, args) => {
			console.log(args);
			return axios.get(`https://statsapi.web.nhl.com/api/v1/people/8473507`)
				.then((res) => {
					console.log(res.data.people);
					// return res.data.people;
				})
		},
	},
};

  // The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});