import React from 'react';
import { Image, Form, Button, Loader, Segment } from 'semantic-ui-react';

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user: '',
			userError: false,
			pass: '',
			passError: false,
			formError: false
		};
	}

	formSubmit = (event) => {
		const { user, pass } = this.state;
		let error = false;
		console.log(user, pass);
		if (!user || !pass) {
			if (!user) {
				this.setState({ userError: true });
				error = true;
			} else {
				this.setState({ userError: false });
				error = false;
			}
			if (!pass) {
				this.setState({ passError: true });
				error = true;
			} else {
				this.setState({ passError: false });
				error = false;
			}
			this.setState({ formError: true });
		} else {
			this.setState({ userError: false, passError: false });
		}
	}

	render() {
		const { favouriteTeam } = this.props;
		return (
			<div style={{ width: "25%", margin: '1em' }}>
				<Segment style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
					<Image src={require('../TeamLogos/NHL.png')} size='medium' circular />
					<Form style={{ diaplay: 'flex', flexDirection: 'row', justifyContent: 'center' }}
						onSubmit={this.formSubmit}
						error={this.state.formError}>
						<Form.Field width={16} required onChange={(e) => this.setState({ user: e.target.value })} error={this.state.userError}>
							<label>Username</label>
							<input placeholder='Username' />
						</Form.Field>
						<Form.Field width={16} required onChange={(e) => this.setState({ pass: e.target.value })} error={this.state.passError} >
							<label>Password</label>
							<input placeholder='Password' />
						</Form.Field>
						<Button type='submit' style={{ width: '100%' }}>Login</Button>
					</Form>
				</Segment>
			</div>
		);
	}



}

export default Login;