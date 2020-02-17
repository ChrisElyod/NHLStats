import React from 'react';
import { List, Avatar } from 'antd';

class TeamHomePage extends React.Component {
	render() {
		const data = [
			{
				title: 'Ant Design Title 1',
			},
			{
				title: 'Ant Design Title 2',
			},
			{
				title: 'Ant Design Title 3',
			},
			{
				title: 'Ant Design Title 1',
			},
			{
				title: 'Ant Design Title 2',
			},
			{
				title: 'Ant Design Title 3',
			},
		];
		return (
			<div style={{ display: 'flex', width: '50%', alignSelf: 'flex-end' }}>
				<List
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
			</div>
		);
	}
}

export default TeamHomePage;
