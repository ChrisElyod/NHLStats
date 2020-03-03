import ApolloClient from 'apollo-boost';
import { gql } from 'apollo-boost';

export const client = new ApolloClient({
  uri: 'http://localhost:4000',
});

export const getTeamInfo = teamId => {
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
};
export const getTeamStats = (teamId, teamRank) => {
  if (teamRank) {
    return client
      .query({
        query: gql`
      {
        teamStatsRank (id: ${teamId}) {
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
};
export const getSpecialTeamStats = (teamId, teamRank) => {
  if (teamRank) {
    return client
      .query({
        query: gql`
      {
        teamStatsRank (id: ${teamId}) {
          powerPlayPercentage
          powerPlayGoals
          powerPlayGoalsAgainst
          powerPlayOpportunities
          penaltyKillPercentage
        }
      }
    `,
      })
      .then(res => res)
      .catch(e => console.log(e));
  }
  return client
    .query({
      query: gql`
    {
      teamStats (id: ${teamId}) {
        powerPlayPercentage
        powerPlayGoals
        powerPlayGoalsAgainst
        powerPlayOpportunities
        penaltyKillPercentage
      }
    }
  `,
    })
    .then(res => res)
    .catch(e => console.log(e));
};
export const getAllTeamStats = (teamId, teamRank) => {
  if (teamRank) {
    return client
      .query({
        query: gql`
      {
        teamStatsRank (id: ${teamId}) {
          wins
          losses
          ot
          pts
          ptPctg
          goalsPerGame
          goalsAgainstPerGame
          evGGARatio
          powerPlayPercentage
          powerPlayGoals
          powerPlayGoalsAgainst
          powerPlayOpportunities
          penaltyKillPercentage
          shotsPerGame
          shotsAllowed
          winScoreFirst
          winOppScoreFirst
          winLeadFirstPer
          winLeadSecondPer
          winOutshootOpp
          winOutshotByOpp
          faceOffsTaken
          faceOffsWon
          faceOffsLost
          faceOffWinPercentage
          savePctRank
          shootingPctRank
        }
      }
    `,
      })
      .then(res => res)
      .catch(e => console.log(e));
  }
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
          ptPctg
          goalsPerGame
          goalsAgainstPerGame
          evGGARatio
          powerPlayPercentage
          powerPlayGoals
          powerPlayGoalsAgainst
          powerPlayOpportunities
          penaltyKillPercentage
          shotsPerGame
          shotsAllowed
          winScoreFirst
          winOppScoreFirst
          winLeadFirstPer
          winLeadSecondPer
          winOutshootOpp
          winOutshotByOpp
          faceOffsTaken
          faceOffsWon
          faceOffsLost
          faceOffWinPercentage
          shootingPctg
          savePctg
        }
      }
    `,
    })
    .then(res => res)
    .catch(e => console.log(e));
};
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
        return { key: e.id, text: e.name, value: e.id };
      });
      return options;
    })
    .catch(e => console.log(e));
};
export const getTeamSchedule = async (teamId, startDate, endDate) => {
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
    .then(res => {
      return res.data;
    })
    .catch(e => console.log(e));
};
