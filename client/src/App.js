import React from 'react';
import './App.css';
import axios from 'axios';

class App extends React.Component {

  state = {
    session: undefined
  };

  componentDidMount() {
    axios.get(`${process.env.REACT_APP_API_URL}/session`).then((res) => {
      localStorage.setItem('session', res.data);
      this.setState({session: res.data});
    }).catch(error => console.log('not authorized'));
  }

  render() {
    const session = this.state.session;
    console.log(session);
    if (session) {
      return (
          <div className="App">
            Welcome back, {session.username}, <a href={`${process.env.REACT_APP_API_URL}/discord/logout`}>Sign Out</a>
          </div>
      );
    }

    return (
        <div className="App">
          Hello guest, please <a href={`${process.env.REACT_APP_API_URL}/discord/login`}>Login With Discord</a>
        </div>
    );
  }
}
export default App;
