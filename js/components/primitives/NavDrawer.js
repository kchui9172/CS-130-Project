import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

import NavList from './NavList.js';

const style = {
  zIndex: '998',
  position: 'fixed',
  marginTop: '56px',
};

export default class NavDrawer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: true};
  }

  handleToggle = () => this.setState({open: !this.state.open});

  render() {
    return (
      <div >
        <RaisedButton
          label="Toggle Drawer"
          onTouchTap={this.handleToggle}
        />
        <Drawer style={style} open={this.state.open}>
          <NavList/>
        </Drawer>
      </div>
    );
  }
}
