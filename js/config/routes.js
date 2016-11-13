import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';

import DBManager from '../dbManager.js';
import NavBar from '../components/NavBar.js';
import AppLayout from '../components/AppLayout.js';
import AuthPage from '../components/AuthPage/Main.js';
import HomePage from '../components/HomePage/Main.js';

// Declarative route configuration (could also load this config lazily
// instead, all you really need is a single root route, you don't need to
// colocate the entire config).
function requireAuth(nextState, replace) {
    var db = new DBManager();
    var loggedOut = false; //(null == db.getUser());
    if(loggedOut) {
    var redirectPath = '/login';
    replace({
      pathname: redirectPath,
      state: { nextPathname: nextState.location.pathname }
    })
  }
  console.log('requireAuth: loggedOut? =>', loggedOut);
}

function checkAuth(nextState, replace) {
    var db = new DBManager();
    var loggedOut = true; //(null == db.getUser());
    var redirectPath = loggedOut ? '/login' : '/home';
    replace({
      pathname: redirectPath,
      state: { nextPathname: nextState.location.pathname }
    })
    console.log('checkAuth: loggedOut? =>', loggedOut);
}

export default class Routes extends React.Component {
    render() {
        return(
              <Router history={browserHistory}>
                <Route path="/" component={NavBar} >
                  <IndexRoute component={AuthPage} onEnter={checkAuth} />
                  <Route path="/home" component={HomePage} onEnter={requireAuth}/>
                  <Route path="/login" component={AuthPage} />
                </Route>
              </Router>
        )
    };
};
//<Route path="*" onEnter={checkAuth} />
