import React from 'react';
import { client } from './helpers/apolloHeplers';
import { gql } from 'apollo-boost';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: '', favouriteTeam: '' };
  }
  componentDidMount() {
    client
      .query({
        query: gql`
          {
            teams(id: 10) {
              id
              name
              link
              venue {
                name
              }
              abbreviation
              teamName
              locationName
              firstYearOfPlay
              division {
                name
              }
              conference {
                name
              }
              shortName
              officialSiteUrl
            }
          }
        `,
      })
      .then(res => {
        console.log(res.data.teams[0]);
        this.setState({ favouriteTeam: res.data.teams[0] });
      });
  }

  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <div style={{ height: '100vh' }}>
            <Route exact path="/" component={Home} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
