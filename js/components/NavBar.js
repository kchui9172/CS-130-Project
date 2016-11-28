import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import FontIcon from 'material-ui/FontIcon';
import InfoOutline from 'material-ui/svg-icons/action/info-outline';
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
  },

  github:{
    width:28,
  },
};

/**
 * Represents Navigation Links
 *
 * @class React.Component.NavLinks
 * @extends React.Component
 */
class NavLinks extends Component {
  static muiName = 'FlatButton';
  /**
   * Renders Navigation Links
   *
   * @method render
   */
  render() {
    return (
      <div>
      <FlatButton {...this.props} label="GitHub" href="https://github.com/kchui9172/CS-130-Project/tree/master" target="_blank" secondary={true} icon={<img style={style.github} src={require('../../static/assets/github-logo-light.png')}/>} />
      <FlatButton {...this.props} label="API Documentation"  href="https://rockmates-d8edb.firebaseapp.com" target="_blank" secondary={true} icon={<Code />} />
      <FlatButton {...this.props} label="About Us" href="https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.youtube.com%2Fchannel%2FUCnNvceDSYLUaIfFDsvM12Zg%2Fvideos%3F%26ab_channel%3DKYLEMATTER&h=WAQHXL_hQ" target="_blank" secondary={true} icon={<InfoOutline />} />
      </div>
    );
  }
}

/*
 * This example is taking advantage of the composability of the `AppBar`
 * to render different components depending on the application state.
 */
//export default class NavBar extends Component {
/**
 * Represents a Navigation Bar.
 *
 * @class React.Component.NavBar
 * @extends React.Component
 */
const NavBar = React.createClass({

  /**
   * Gets the initial state.
   *
   * @method getInitialState
   */
  getInitialState() {
    return {
      contextVars: {
        dbManager : new DBManager(),
      },
    };
  },

  /**
   * Renders the Navigation Bar.
   *
   * @method render
   */
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
