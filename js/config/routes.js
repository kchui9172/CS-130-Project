import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';

import DBManager from '../dbManager.js';
import NavBar from '../components/NavBar.js';
import AuthPage from '../components/AuthPage/Main.js';
import HomePage from '../components/HomePage/Main.js';

// Declarative route configuration (could also load this config lazily
// instead, all you really need is a single root route, you don't need to
// colocate the entire config).
function requireAuth(nextState, replace) {
  //  var db = new DBManager();
    var loggedIn = DBManager.isLoggedIn();
    if(!loggedIn) {
      var redirectPath = '/login';
      replace({
        pathname: redirectPath,
        state: { nextPathname: nextState.location.pathname }
      })
    }
  console.log('requireAuth: loggedIn? =>', loggedIn);
}

function checkAuth(nextState, replace) {
  //  var db = new DBManager();
    var loggedIn = DBManager.isLoggedIn();
    var redirectPath = loggedIn ? '/home' : '/login';
    replace({
      pathname: redirectPath,
      state: { nextPathname: nextState.location.pathname }
    })
    console.log('checkAuth: loggedIn? =>', loggedIn);
}

export default class Routes extends React.Component {
    render() {
        return(
              <Router history={browserHistory}>
                <Route path="/" component={NavBar} >
                  <IndexRoute component={AuthPage} onEnter={checkAuth} />
                  <Route path="/home" component={HomePage} onEnter={requireAuth}/>
                  <Route path="/login" component={AuthPage}/>
                </Route>
              </Router>
        )
    };
};
