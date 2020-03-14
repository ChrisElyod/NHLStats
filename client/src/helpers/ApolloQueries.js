import gql from 'graphql-tag';
export const GET_TEAM_INFO = gql`
  {
    teams(id: $teamId) {
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
  }`;
export const GET_TEAM_STATS = gql`
  query TeamStats($id: Int!) {
    teamStats (id: 10) {
      gamesPlayed
      wins
      losses
      ot
      pts
    }
  }`;
export const GET_TEAM_STATS_RANK = gql`
  {
    teamStatsRank (id: $teamId) {
      wins
      losses
      ot
      pts
    }
  }`;
export const GET_ALL_TEAM_STATS = gql`
  {
    teamStats (id: $teamId) {
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
  }`;
export const GET_ALL_TEAM_STATS_RANK = gql`
  {
    teamStatsRank (id: $teamId) {
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
  }`;
export const GET_SPECIAL_TEAM_STATS = gql`
  {
    teamStats (id: $teamId) {
      powerPlayPercentage
      powerPlayGoals
      powerPlayGoalsAgainst
      powerPlayOpportunities
      penaltyKillPercentage
    }
  }`;
export const GET_SPECIAL_TEAM_STATS_RANK = gql`
  {
    teamStatsRank (id: $teamId) {
      powerPlayPercentage
      powerPlayGoals
      powerPlayGoalsAgainst
      powerPlayOpportunities
      penaltyKillPercentage
    }
  }`;
export const GET_FACEOFF_STATS = gql`
  {
    teamStats (id: $teamId) {
      faceOffsTaken
      faceOffsWon
      faceOffsLost
      faceOffWinPercentage
    }
  }`;
export const GET_FACEOFF_STATS_RANK = gql`
  {
    teamStatsRank (id: $teamId) {
      faceOffsTaken
      faceOffsWon
      faceOffsLost
      faceOffWinPercentage
    }
  }`;
export const GET_ALL_TEAMS = gql`
  {
    teams {
      id
      name
    }
  }`;
// export const GET_TEAM_SCHEDULE = gql`
//   {
//     schedule(teamId: $teamId, startDate: "${startDate}", endDate: "${endDate}") {
//       dates {
//         date
//         games {
//           gamePk
//           teams {
//             away {
//               score
//               team {
//                 name
//               }
//             }
//             home {
//               score
//               team {
//                 name
//               }
//             }
//           }
//         }
//       }
//     }
//   }`;