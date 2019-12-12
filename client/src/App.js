import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: '' };
  }

  // async componentWillMount() {
  //   await axios.get('http://localhost:3000/getGameData').then(res => {
  //     this.setState({ apiResponse: res.data });
  //     console.log(res.data);
  //   });
  // }

  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <div>
            <Route exact path="/" component={Home} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
