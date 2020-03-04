import React from 'react';
import {
  Card,
  Header,
  Loader,
  Table,
  Dimmer,
  Segment,
} from 'semantic-ui-react';
import {
  getAllTeamStats,
  getTeamStats,
  getSpecialTeamStats,
  getFaceoffStats,
} from '../helpers/apolloHeplers';
import { getTeamLogo, formatTeamStats } from '../helpers/helpers';
import { isCompositeType } from 'graphql';

class TeamStats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teamId: this.props.teamId,
      teamStats: [],
      currentYear: null,
    };
  }
  async componentDidMount() {
    const { teamId } = this.props;
    const teamRecordStats = await getTeamStats(teamId, false);
    const teamRecordRank = await getTeamStats(teamId, true);
    const teamItems = formatTeamStats(teamRecordStats, teamRecordRank);
    const specialTeamStats = await getSpecialTeamStats(teamId);
    const specialTeamRank = await getSpecialTeamStats(teamId, true);
    const specialTeamItems = formatTeamStats(specialTeamStats, specialTeamRank);
    const faceoffStats = await getFaceoffStats(teamId);
    const faceoffRank = await getFaceoffStats(teamId, true);
    const faceOffItems = formatTeamStats(faceoffStats, faceoffRank);
    this.setState({
      gameStats: teamItems,
      specialTeam: specialTeamItems,
      faceoff: faceOffItems,
      teamId: teamId,
    });
  }
  async componentDidUpdate(prevProps) {
    const { teamId } = this.props;
    if (teamId !== prevProps.teamId) {
      const { teamId } = this.props;
      const teamRecordStats = await getTeamStats(teamId, false);
      const teamRecordRank = await getTeamStats(teamId, true);
      const teamItems = formatTeamStats(teamRecordStats, teamRecordRank);
      const specialTeamStats = await getSpecialTeamStats(teamId);
      const specialTeamRank = await getSpecialTeamStats(teamId, true);
      const specialTeamItems = formatTeamStats(
        specialTeamStats,
        specialTeamRank
      );
      const faceoffStats = await getFaceoffStats(teamId);
      const faceoffRank = await getFaceoffStats(teamId, true);
      const faceOffItems = formatTeamStats(faceoffStats, faceoffRank);
      this.setState({
        gameStats: teamItems,
        specialTeam: specialTeamItems,
        faceoff: faceOffItems,
        teamId: teamId,
      });
    }
  }
  render() {
    const { gameStats, specialTeam, faceoff } = this.state;
    const gameStatsLoader = typeof gameStats !== 'undefined';
    const specialLoader = typeof specialTeam !== 'undefined';
    const faceoffLoader = typeof faceoff !== 'undefined';
    return (
      <div>
        <Table basic="very" celled>
          <Table.Body>
            <Table.Row>
              <Table.Cell className="statsTable">
                <Segment className="statsTable">
                  <Header
                    as="h3"
                    style={{ marginTop: '0px', marginLeft: '10px' }}
                  >
                    Game Stats
                  </Header>
                  <Dimmer active={!gameStatsLoader} inverted>
                    <Loader size="small">Loading</Loader>
                  </Dimmer>
                  <Card.Group
                    items={gameStats}
                    itemsPerRow={5}
                    textAlign="center"
                    style={{ margin: '0px' }}
                  />
                </Segment>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell className="statsTable">
                <Segment className="statsTable">
                  <Header
                    as="h3"
                    style={{ marginTop: '0px', marginLeft: '10px' }}
                  >
                    Special Team Statistics
                  </Header>
                  <Dimmer active={!gameStatsLoader} inverted>
                    <Loader size="small">Loading</Loader>
                  </Dimmer>
                  <Card.Group
                    items={specialTeam}
                    itemsPerRow={5}
                    textAlign="center"
                    style={{ margin: '0px' }}
                  />
                </Segment>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell className="statsTable">
                <Segment className="statsTable">
                  <Header
                    as="h3"
                    style={{ marginTop: '0px', marginLeft: '10px' }}
                  >
                    Faceoff Statistics
                  </Header>
                  <Dimmer active={!gameStatsLoader} inverted>
                    <Loader size="small">Loading</Loader>
                  </Dimmer>
                  <Card.Group
                    items={faceoff}
                    itemsPerRow={5}
                    textAlign="center"
                    style={{ margin: '0px' }}
                  />
                </Segment>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    );
  }
}

export default TeamStats;
