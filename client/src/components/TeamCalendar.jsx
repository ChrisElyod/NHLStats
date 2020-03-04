import React from 'react';
import { Image, Divider, Header } from 'semantic-ui-react';
import { Calendar } from 'antd';
import { getTeamSchedule } from '../helpers/apolloHeplers';
import { formatDate, getTeamLogo } from '../helpers/helpers';

class TeamCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teamSchedule: [],
      months: [],
      currentDate: null,
      currentYear: null,
    };
  }
  async componentDidMount() {
    const { teamId } = this.props;
    const currentMonth = new Date();
    const teamSchedule = await this.getMonthsData(teamId, currentMonth);
    this.setState({
      teamSchedule: teamSchedule.schedule.dates,
    });
  }
  async componentDidUpdate(prevProps) {
    const { teamId } = this.props;
    if (teamId !== prevProps.teamId) {
      const { currentDate } = this.state;
      console.log(currentDate);
      const teamSchedule = await this.getMonthsData(
        teamId,
        currentDate ? currentDate : new Date()
      );
      if (teamSchedule) {
        this.setState({
          teamSchedule: teamSchedule.schedule.dates,
        });
      }
    }
  }
  getMonthsData = (teamId, currentMonth) => {
    const { startDate, endDate } = this.renderMonths(currentMonth);
    return getTeamSchedule(teamId, startDate.toString(), endDate.toString());
  };
  /**
   * Function to get the first and last days of the month that's being displayed on the calendar
   */
  renderMonths = month => {
    let startDate;
    let endDate;
    const lastOfMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0);
    if (month.getMonth() < 9) {
      startDate = `${month.getFullYear()}-0${month.getMonth() + 1}-01`;
      endDate = `${month.getFullYear()}-0${month.getMonth() +
        1}-${lastOfMonth.getDate()}`;
    } else {
      startDate = `${month.getFullYear()}-${month.getMonth() + 1}-01`;
      endDate = `${month.getFullYear()}-${month.getMonth() +
        1}-${lastOfMonth.getDate()}`;
    }
    return {
      startDate: startDate,
      endDate: endDate,
    };
  };

  onPanelChange = async (value, mode) => {
    const { teamId } = this.props;
    const teamSchedule = await this.getMonthsData(teamId, value._d);
    if (teamSchedule) {
      this.setState({
        teamSchedule: teamSchedule.schedule.dates,
        currentDate: value._d,
      });
    }
  };

  onChange = value => {
    // console.log(value);
  };

  /**
   * Used to filter the contents of teamSchedule (array of games for the month for provided team)
   */
  getDaysGame = (value, teamSchedule) => {
    const daysGame = teamSchedule.find(game => {
      return game.date === formatDate(value._d);
    });
    if (daysGame) {
      return [daysGame];
    }
    return [];
  };
  /**
   * built in function for antdesign calendar component.
   * Required to render custom content inside of date cells
   */
  dateCellRender = value => {
    const { teamSchedule } = this.state;
    const game = this.getDaysGame(value, teamSchedule);
    if (game.length > 0) {
      const homeTeam = game[0].games[0].teams.home.team.name.split(' ');
      const homeTeamLogo = getTeamLogo(homeTeam[homeTeam.length - 1]);
      const awayTeam = game[0].games[0].teams.away.team.name.split(' ');
      const awayTeamLogo = getTeamLogo(awayTeam[awayTeam.length - 1]);
      const homeScore = game[0].games[0].teams.home.score;
      const awayScore = game[0].games[0].teams.away.score;
      return (
        <div>
          <div
            style={{
              display: 'flex',
              position: 'relative',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                }}
              >
                <Image
                  src={awayTeamLogo}
                  size="tiny"
                  style={{
                    display: 'block',
                    float: 'right',
                    position: 'relative !important',
                    padding: '10px',
                  }}
                />
                <p
                  className={
                    awayScore > homeScore ? 'winningTeam' : 'losingTeam'
                  }
                  style={{ paddingTop: '5px' }}
                >
                  {new Date(game[0].date) > new Date() ? null : awayScore}
                </p>
              </div>
              <Header as="h5" style={{ marginTop: '0px', textAlign: 'center' }}>
                {awayTeam[awayTeam.length - 1]}
              </Header>
            </div>
            <div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  alignItems: 'end',
                }}
              >
                <p
                  className={
                    homeScore > awayScore ? 'winningTeam' : 'losingTeam'
                  }
                  style={{ borderRight: '5px' }}
                >
                  {new Date(game[0].date) > new Date() ? null : homeScore}
                </p>
                <Image
                  src={homeTeamLogo}
                  size="tiny"
                  style={{
                    display: 'block',
                    float: 'right',
                    position: 'relative !important',
                    padding: '10px',
                  }}
                />
              </div>
              <Header as="h5" style={{ marginTop: '0px', textAlign: 'center' }}>
                {homeTeam[homeTeam.length - 1]}
              </Header>
            </div>
            <Divider vertical>@</Divider>
          </div>
        </div>
      );
    }
    return;
  };
  render() {
    return (
      <div>
        <Calendar
          dateCellRender={this.dateCellRender}
          onPanelChange={this.onPanelChange}
          onChange={this.onChange}
        />
      </div>
    );
  }
}

export default TeamCalendar;
