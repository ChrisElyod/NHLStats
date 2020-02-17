import React from 'react';
import { Image, Divider, Header } from 'semantic-ui-react'
import { Calendar } from 'antd';
import { getTeamSchedule } from '../helpers/apolloHeplers';

class TeamCalendar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			teamSchedule: [],
		};
	}
	async componentDidMount() {
		const teamSched = await getTeamSchedule(10, "2019-01-01", "2019-12-31");
		this.setState({ teamSchedule: teamSched.schedule.dates });
	}
	onPanelChange = (value, mode) => {
		console.log(value, mode);
	};
	dateCellRender = (value) => {
		const { teamSchedule } = this.state;
		return (
			<div>
				{teamSchedule.map(item => (
					<div style={{ display: 'flex', position: 'relative', justifyContent: 'space-between' }}>
						<div>
							<Image
								src={require(`../TeamLogos/TOR.png`)}
								size="tiny"
								circular
								style={{ display: 'block', float: 'right' }}
							/>
							<Header as="h4" style={{ marginTop: "0px", marginLeft: '.25em' }}>{item.games[0].teams.away.team.name} - </Header>
						</div>
						<div>
							<Image
								src={require(`../TeamLogos/TOR.png`)}
								size="tiny"
								circular
								style={{ display: 'block' }}
							/>
							<Header as="h4" style={{ marginTop: "0px", marginLeft: '.25em' }}>BOS - </Header>
						</div>
						<Divider vertical >@</Divider>
					</div>
				))}
			</div>
		);
	}
	render() {
		return (
			<div>
				<Calendar dateCellRender={this.dateCellRender} onPanelChange={this.onPanelChange} />
			</div>
		);
	}
}

export default TeamCalendar;