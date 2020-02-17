import React from 'react';
import { client, getTeamInfo, getTeamStats, getAllTeams } from '../helpers/apolloHeplers';
import { Image, Header, Dropdown, List, Placeholder, Divider } from 'semantic-ui-react';
import TeamCalendar from './TeamCalendar';
import SeasonList from './SeasonList';

class TeamHomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isloading: true,
      teamData: '',
      teamAbbrev: '',
      conferenceName: '',
      divisionName: '',
      venueName: '',
      teamURL: '',
      teamName: '',
      record: '',
      gamesPlayed: '',
      points: 0,
      pace: 0
    };
  }
  async componentDidMount() {
    const { isloading } = this.state;
    getTeamInfo(10)
      .then(res => {
        this.setState({
          divisionName: res.data.teams[0].division.name,
          conferenceName: res.data.teams[0].conference.name,
          venueName: res.data.teams[0].venue.name,
          teamURL: res.data.teams[0].officialSiteUrl,
          teamName: res.data.teams[0].name,
          teamAbbrev: res.data.teams[0].abbreviation,
          isloading: !isloading
        }, () => this.renderTeamInfo());
      });
    getTeamStats(10)
      .then(res => {
        const record = `${res.data.teamStats.wins}-${res.data.teamStats.losses}-${res.data.teamStats.ot}`;
        const pace = Math.round((res.data.teamStats.pts / res.data.teamStats.gamesPlayed) * 82);
        this.setState({ record: record, gamesPlayed: res.data.teamStats.gamesPlayed, points: res.data.teamStats.pts, pace: pace });
      });
    getAllTeams()
      .then(res => this.setState({ teamOptions: res }))
  }

  getSelectedTeam = (e, data) => {
    getTeamInfo(data.value).then(res => this.setState({ divisionName: res.data.teams[0].division.name, conferenceName: res.data.teams[0].conference.name, venueName: res.data.teams[0].venue.name, teamURL: res.data.teams[0].officialSiteUrl, teamName: res.data.teams[0].name, teamAbbrev: res.data.teams[0].abbreviation }));
    getTeamStats(data.value).then(res => {
      const record = `${res.data.teamStats.wins}-${res.data.teamStats.losses}-${res.data.teamStats.ot}`;
      const pace = Math.round((res.data.teamStats.pts / res.data.teamStats.gamesPlayed) * 82);
      this.setState({ record: record, gamesPlayed: res.data.teamStats.gamesPlayed, points: res.data.teamStats.pts, pace: pace });
    });
  }

  renderTeamInfo = () => {
    const { divisionName, conferenceName, venueName, teamURL, record, gamesPlayed, points, pace } = this.state;
    return (
      <div style={{ display: 'flex' }}>
        <List>
          <List.Item>Conference: {conferenceName}</List.Item>
          <List.Item>Division: {divisionName}</List.Item>
          <List.Item>Venue: {venueName}</List.Item>
          <List.Item>Website: {teamURL}</List.Item>
        </List>
        <List style={{ marginTop: '0px', marginLeft: '1em' }}>
          <List.Item>Games Played: {gamesPlayed}</List.Item>
          <List.Item>Record: {record}</List.Item>
          <List.Item>Points: {points}</List.Item>
          <List.Item>Pace: {pace}</List.Item>
        </List>
      </div >
    );
  }
  renderPlaceHolders = () => {
    return (
      <Placeholder>
        <Placeholder.Line />
        <Placeholder.Line />
        <Placeholder.Line />
        <Placeholder.Line />
      </Placeholder>
    );
  }

  render() {
    const { isLoading, teamAbbrev, teamOptions } = this.state;
    return (
      <div>
        <div style={{ margin: '1.5em', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          {teamAbbrev ?
            <Image
              src={`http://mlse.com/wp-content/uploads/2016/10/16_Leafs.png`}
              size="small"
              circular
              bordered
            /> :
            <Placeholder style={{ height: 150, width: 150 }}>
              <Placeholder.Image rectangular />
            </Placeholder>}

          <div style={{ margin: '.75em' }}>
            <Dropdown
              options={teamOptions}
              defaultValue={10}
              placeholder="Please Select a Team"
              search
              selection
              scrolling
              onChange={this.getSelectedTeam}
            />
            <Divider />
            {isLoading ?
              this.renderPlaceHolders()
              : this.renderTeamInfo()}
          </div>
          <SeasonList />
        </div>
        <TeamCalendar />
      </div>
    );
  }
}

export default TeamHomePage;
