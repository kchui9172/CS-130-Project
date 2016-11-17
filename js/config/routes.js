import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';

import DBManager from '../dbManager.js';
import NavBar from '../components/NavBar.js';
import FourOFour from '../components/FourOFour.js';
import AppLayout from '../components/AppLayout.js';
import AuthPage from '../components/AuthPage/Main.js';
import HomePage from '../components/HomePage/Main.js';

var firebase = require("firebase");
// Firebase API Credentials
var config = {
  apiKey: "AIzaSyCAFUnm_bsnpiRyziqTB41QZoLW3-OYp20",
  authDomain: "rockmates-d8edb.firebaseapp.com",
  databaseURL: "https://rockmates-d8edb.firebaseio.com",
  storageBucket: "rockmates-d8edb.appspot.com",
  messagingSenderId: "370968243217"
};

firebase.initializeApp(config);
var db = new DBManager();

// Declarative route configuration (could also load this config lazily
// instead, all you really need is a single root route, you don't need to
// colocate the entire config).
function requireAuth(nextState, replace) {
//var loggedOut = (null == db.getUser);
    var loggedOut = false;//(null === firebase.auth().currentUser) ;
    //(null == db.getUser())
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
  var loggedOut = (null === firebase.auth().currentUser) ;
  //  var loggedOut = (null == db.getUser);//!DBManager.user_cache;
    var redirectPath = loggedOut ? '/login' : '/home';
    replace({
      pathname: redirectPath,
      state: { nextPathname: nextState.location.pathname }
    })
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
//<Route path="dashboard" component={Dashboard} onEnter={requireAuth} />
//onEnter={Routing.checkAuth} onEnter={Routing.requireAuth}
//<Route path="*" onEnter={checkAuth} />
//onEnter={checkAuth}
//
