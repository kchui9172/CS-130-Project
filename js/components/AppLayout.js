var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Link = ReactRouter.Link;

import DBManager from '../dbManager.js';
import NavBar from './NavBar.js';
import AuthPage from '../components/AuthPage/Main.js';

var AppLayout = React.createClass({

    render: function() {

        var loggedIn = (DBManager.user_cache !== null);
        var register;

        if (loggedIn) {
            register = null
        } else {
          register = 1
        }
        return (
            <div>
            <NavBar/>
                <div className="container">
                    <div className="row">
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
});

module.exports = AppLayout;
