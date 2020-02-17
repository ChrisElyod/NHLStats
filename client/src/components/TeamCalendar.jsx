import React from 'react';
import { Image, Divider } from 'semantic-ui-react'
import { Calendar } from 'antd';

class TeamCalendar extends React.Component {
	onPanelChange = (value, mode) => {
		console.log(value, mode);
	};
	dateCellRender = (value) => {
		return (
			<div style={{ position: 'relative', alignContent: 'center' }}>
				<Image
					src={require(`../TeamLogos/TOR.png`)}
					size="tiny"
					circular
					style={{ display: 'block', float: 'right' }}
				/>
				<Image
					src={require(`../TeamLogos/TOR.png`)}
					size="tiny"
					circular
					style={{ display: 'block' }}
				/>
				<Divider vertical >@</Divider>
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