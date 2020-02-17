import React from 'react';
import { List, Avatar } from 'antd';
import { getTeamSchedule } from '../helpers/apolloHeplers';

class TeamHomePage extends React.Component {
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
	render() {
		const data = [
			{
				title: 'Current Season',
			},
			{
				title: 'Prior Season 1',
			},
			{
				title: 'Prior Season 2',
			},
			{
				title: 'Prior Season 3',
			},
			{
				title: 'Prior Season 4',
			},
			{
				title: 'Prior Season 5',
			},
		];
		const { teamSchedule } = this.state;
		console.log(teamSchedule);
		return (
			<List
				style={{ width: '50%', display: 'flex', justifyContent: 'flexEnd' }}
				itemLayout="horizontal"
				grid={{ column: 3 }}
				size="tiny"
				dataSource={data}
				renderItem={item => (
					<List.Item>
						<List.Item.Meta
							avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
							title={<a href="https://ant.design">{item.title}</a>}
							description="Ant Design, a design language for background applications"
						/>
					</List.Item>
				)}
			/>
		);
	}
}

export default TeamHomePage;
