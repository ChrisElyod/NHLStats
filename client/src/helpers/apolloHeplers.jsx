import ApolloClient from 'apollo-boost';
import { gql } from 'apollo-boost';

export const client = new ApolloClient({
  uri: 'http://localhost:4000',
});

export const getTeamInfo = (teamId) => {
  return client
    .query({
      query: gql`
        {
          teams(id: ${teamId}) {
            id
            name
            venue {
              name
            }
            abbreviation
            teamName
            division {
              name
            }
            conference {
              name
            }
            officialSiteUrl
          }
        }
      
      `,
    })
    .then(res => res)
    .catch(e => console.log(e));
}
export const getTeamStats = (teamId) => {
  return client
    .query({
      query: gql`
      {
        teamStats (id: ${teamId}) {
          gamesPlayed
          wins
          losses
          ot
          pts
        }
      }
    `,
    })
    .then(res => res)
    .catch(e => console.log(e));
}
export const getAllTeams = () => {
  return client
    .query({
      query: gql`
        {
          teams {
            id
            name
          }
        }
      `,
    })
    .then(res => {
      const options = res.data.teams.map(e => {
        return { key: e.id, text: e.name, value: e.id }
      });
      return options;
    })
    .catch(e => console.log(e));
}
export const getTeamSchedule = (teamId, startDate, endDate) => {
  return client
    .query({
      query: gql`
      {
        schedule(teamId: ${teamId}, startDate: "${startDate}", endDate: "${endDate}") {
          dates {
            date
            games {
              gamePk
              teams {
                away {
                  score
                  team {
                    name
                  }
                }
                home {
                  score
                  team {
                    name
                  }
                }
              }
            }
          }
        }
      }
      `,
    })
    .then(res => res.data)
    .catch(e => console.log(e));
}


