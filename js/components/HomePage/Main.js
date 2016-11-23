import React, {Component} from 'react';
import {Grid, Row, Column} from 'react-cellblock';
import FlatButton from 'material-ui/RaisedButton';
import SwipeableViews from 'react-swipeable-views';


import FAB from '../primitives/FAB.js';
import NavDrawer from '../primitives/NavDrawer.js';
import AddAptDialog from './AddAptDialog.js';
import NavList from './NavList.js';

import MessagesCard from './Cards/MessagesCard.js';
import PaymentsCard from './Cards/PaymentsCard.js';
import ChoresCard   from './Cards/ChoresCard.js';

export default class HomePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      openDrawer: true,
    };
  };

  handleDrawerToggle = () => this.setState({openDrawer: !this.state.openDrawer});

  render() {
    return (

      <div>
        <FAB onTouchTap={this.handleDrawerToggle}/>
        <NavDrawer>
          <NavList/>
        </NavDrawer>

        <div>
          <Grid breakpoints={[3]} flexible={true} columnWidth={300} gutterWidth={20} onChange={breakpoint => {}} >
            <Row>
              <Column width="1/3" ><PaymentsCard/></Column>
              <Column width="1/3"><MessagesCard/></Column>
              <Column width="1/3"> <ChoresCard /> </Column>
            </Row>
            <br/>
          </Grid>
        </div>

      </div>
    );
  }
}
//<AddAptDialog/>
