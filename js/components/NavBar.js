import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import FontIcon from 'material-ui/FontIcon';
import Code from 'material-ui/svg-icons/action/code';
import ActionAndroid from 'material-ui/svg-icons/action/android';
import NavigationClose from 'material-ui/svg-icons/social/whatshot';

import DBManager from '../dbManager.js';

const style = {
  bar : {
    zIndex:'999',
    position:'fixed',
    marginBottom:'48px',
    textTransform:'uppercase',
    paddingLeft:'20px',
  },
  container : {
    paddingBottom: 76,
  },
  button: {
    marginTop:-2,
    color:'white',
  },

  drawerToggle:{
    width: 48,
   height: 48,
  }
};

class NavLinks extends Component {
  static muiName = 'FlatButton';
  render() {
    return (
      <div>
      <FlatButton {...this.props} label="GitHub" href="https://github.com/kchui9172/CS-130-Project/tree/master" target="_blank" secondary={true} icon={<Code />} />
      <FlatButton {...this.props} label="API Documentation"  href="https://github.com/kchui9172/CS-130-Project/tree/master" target="_blank" secondary={true} icon={<Code />} />
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
        <AppBar className="frosted" style={style.bar}
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
