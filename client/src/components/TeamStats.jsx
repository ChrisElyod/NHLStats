import React from 'react';
import { Card } from 'semantic-ui-react';
import { Calendar, Table } from 'antd';
import { getAllTeamStats, getTeamStats } from '../helpers/apolloHeplers';
import { getTeamLogo, formatTeamStats } from '../helpers/helpers';

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
    const teamStats = await getAllTeamStats(this.props.teamId);
    const teamStatsRank = await getAllTeamStats(this.props.teamId, true);
    const teamItems = formatTeamStats(teamRecordStats, teamRecordRank);
    this.setState({ teamStats: teamItems });
  }
  async componentDidUpdate(prevProps) {
    const { teamId } = this.props;
    if (teamId !== prevProps.teamId) {
      const teamRecordStats = await getTeamStats(teamId, false);
      const teamRecordRank = await getTeamStats(teamId, true);
      const specialTeamStats = await getAllTeamStats(teamId);
      const teamStatsRank = await getAllTeamStats(teamId, true);
      const teamItems = formatTeamStats(teamRecordStats, teamRecordRank);
      this.setState({ teamStats: teamItems, teamId: teamId });
    }
  }
  render() {
    const { teamStats } = this.state;
    const compare = true;
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignContent: 'space-between',
        }}
      >
        <Card.Group
          items={teamStats}
          centered
          itemsPerRow={4}
          textAlign="center"
          style={{ margin: '0px' }}
        />
      </div>
    );
  }
}

export default TeamStats;
