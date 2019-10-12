import React from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {apiResponse: ''};
  }

  async componentWillMount() {
    await axios.get('http://localhost:3000/')
      .then(res => {
        this.setState({apiResponse: res.data})
        console.log(res.data);
      })
  }

  render() { 
    return <h1>Hello</h1>;
  }
}

export default App;
