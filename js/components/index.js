import React, { Component } from 'react';
import { Match, BrowserRouter, Link, Miss, Redirect } from 'react-router';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import { firebaseAuth } from '../config/firebase.js'
import NavBar from './NavBar.js';
import AuthPage from './AuthPage/Main.js';
import HomePage from './HomePage/Main.js';

function checkAuth(nextState, replace) {
    var loggedIn = firebaseAuth().currentUser !== null;
    var redirectPath = loggedIn ? '/home' : '/login';
    replace({
      pathname: redirectPath,
      state: { nextPathname: nextState.location.pathname }
    })
    console.log('checkAuth: loggedIn? =>', loggedIn);
}

function requireAuth(nextState, replace) {
    var loggedIn = firebaseAuth().currentUser !== null;
    if(!loggedIn) {
      var redirectPath = '/login';
      replace({
        pathname: redirectPath,
        state: { nextPathname: nextState.location.pathname }
      })
    }
  console.log('requireAuth: loggedIn? =>', loggedIn);
}

function signOut(nextState, replace) {
    var loggedIn = firebaseAuth().currentUser !== null;
    console.log('signOut: loggedIn? =>', loggedIn);
    if(!loggedIn) {
      var redirectPath = '/login';
      replace({
        pathname: redirectPath,
        state: { nextPathname: nextState.location.pathname }
      })
    } else {
      return firebaseAuth().signOut();
    }
}

function requireNoAuth(nextState, replace) {
    var loggedIn = firebaseAuth().currentUser !== null;
    if(loggedIn) {
      var redirectPath = '/home';
      replace({
        pathname: redirectPath,
        state: { nextPathname: nextState.location.pathname }
      })
    }
  console.log('requireAuth: loggedIn? =>', loggedIn);
}

export default class App extends Component {
  state = {
    authed: false,
    loading: true,
  }

  componentDidMount () {
    this.removeListener = firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
          loading: false,
        });
      browserHistory.push('/home');
      } else {
        this.setState({
          loading: false
        });
      browserHistory.push('/login');
      }
    })
  }
  componentWillUnmount () {
    this.removeListener()
  }

  render() {
    return (this.state.loading === true ? <h1>loadingModal</h1> : (
      <div>
      <Router history={browserHistory}>
        <Route path="/" component={NavBar} >
          <IndexRoute onEnter={checkAuth} />
          <Route authed={this.state.authed} path="/home" component={HomePage} onEnter={requireAuth}/>
          <Route authed={this.state.authed} path="/login" component={AuthPage} onEnter={requireNoAuth}/>
          <Route authed={this.state.authed} path="/logout" onEnter={signOut}/>
        </Route>
      </Router>
      </div>
    ));
  }
}
// }
// <BrowserRouter>
//   {({router}) => (
//     <div>
//           <Match pattern='/' exactly component={NavBar} />
//           <MatchWhenUnauthed authed={this.state.authed} pattern='/login' component={AuthPage} />
//           <MatchWhenAuthed authed={this.state.authed} pattern='/dashboard' component={HomePage} />
//           <Miss render={() => <h3>No Match</h3>} />
//     </div>
//   )}
// </BrowserRouter>
