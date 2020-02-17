import React from 'react';
import { client } from './helpers/apolloHeplers';
import { gql } from 'apollo-boost';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import './App.css';
import Navbar from './components/Navbar';
import Login from './components/Home';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: '', favouriteTeam: '' };
  }

  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <div style={{ height: '100vh' }}>
            <Route exact path="/" component={Login} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
