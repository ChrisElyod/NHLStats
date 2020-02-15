import React from 'react';
import { client } from '../helpers/apolloHeplers';
import { gql } from 'apollo-boost';
import { Image } from 'semantic-ui-react';
import TeamHomePage from './TeamHomePage';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isloading: true, favouriteTeam: '' };
  }
  componentWillMount() {
    client
      .query({
        query: gql`
          {
            teams(id: 10) {
              id
              name
              link
              venue {
                name
              }
              abbreviation
              teamName
              locationName
              firstYearOfPlay
              division {
                name
              }
              conference {
                name
              }
              shortName
              officialSiteUrl
            }
          }
        `,
      })
      .then(res => {
        console.log(res.data.teams[0]);
        this.setState({ favouriteTeam: res.data.teams[0] });
      });
  }
  render() {
    const { favouriteTeam } = this.state;
    const teamAbbreviation = 'TOR';
    return <TeamHomePage favouriteTeam={favouriteTeam} />;
  }
}

export default Home;
