import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import ActionAndroid from 'material-ui/svg-icons/action/android';
import FontIcon from 'material-ui/FontIcon';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

import DBManager from '../dbManager.js';

const style = {
  bar : {
    zIndex:'999',
    position:'fixed',
    marginBottom:'48px',
    textTransform:'uppercase',
  },
  container : {
    paddingBottom: 96,
  },
  button: {
    marginTop:-2,
    color:'white',
  },
};

class NavLinks extends Component {
  static muiName = 'FlatButton';
  render() {
    return (
      <div>
      <FlatButton {...this.props} label="API Docs" />
      <FlatButton {...this.props} label="GitHub"   style={style.button} href="https://github.com/kchui9172/CS-130-Project/tree/new-master" />
      </div>
    );
  }
}

/**
 * This example is taking advantage of the composability of the `AppBar`
 * to render different components depending on the application state.
 */
//export default class NavBar extends Component {
const NavBar = React.createClass({

  getInitialState() {
    return {
      contextVars: {
        dbManager : new DBManager(),
      },
    };
  },

  render() {
    return (
      <div>
      <div style={style.container}>
        <AppBar style={style.bar}
          title="Rockmates"
          iconElementLeft={<IconButton><NavigationClose /></IconButton>}
          iconElementRight={<NavLinks />}
        />
      </div>
        {this.props.children}
      </div>
    );
  },
});

export default NavBar;
