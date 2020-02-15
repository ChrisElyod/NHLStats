import React from 'react';
import axios from 'axios';
import { client } from '../helpers/apolloHeplers';
import { gql } from 'apollo-boost';
import { Image, Header, List, Loader } from 'semantic-ui-react';

class TeamHomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isloading: true, teamData: '' };
  }
  async componentWillMount() {
    const { isloading } = this.state;
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
        this.setState(
          { teamData: res.data.teams[0], isloading: !isloading },
          this.renderTeamInfo()
        );
      })
      .catch(e => console.log(e));
  }
  renderTeamInfo = favouriteTeam => {
    return (
      <List>
        <List.Item>Conference:{favouriteTeam.conference.name}</List.Item>
        <List.Item>Division:{favouriteTeam.division.name}</List.Item>
        <List.Item>Venue:{favouriteTeam.venue.name}</List.Item>
        <List.Item>Website:{favouriteTeam.officialSiteUrl}</List.Item>
      </List>
    );
  };
  render() {
    const { favouriteTeam } = this.props;
    return (
      <div style={{ margin: '1em', display: 'flex' }}>
        <Image
          src={require('../TeamLogos/TOR.png')}
          size="small"
          circular
          bordered
        />
        <div style={{ margin: '.75em' }}>
          <Header as="h2">Toronto Maple Leafs</Header>
          {this.renderTeamInfo(favouriteTeam)}
        </div>
      </div>
    );
  }
}

export default TeamHomePage;
