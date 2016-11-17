import React, {Component} from 'react';
import Drawer from 'material-ui/Drawer';
import {Grid, Row, Column} from 'react-cellblock';
import FlatButton from 'material-ui/RaisedButton';
import SwipeableViews from 'react-swipeable-views';

import NavList from '../NavList.js';
import SummaryInfo from './SummaryInfo.js';

const style = {
  drawer: {
    zIndex: '998',
    position: 'absolute',
  },
  content: {
    position:'absolute',
    paddingTop:'156px',
  },
};

const ResponsiveSummary = (SummaryInfo);
export default class AuthPage extends React.Component {

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
        <Drawer style={style.drawer} open={this.state.openDrawer}>
          <NavList/>
        </Drawer>

        <div style={style.contents} >
          <Grid  breakpoints={[3]}  columnWidth={320} gutterWidth={48} onChange={breakpoint => {}} >
            <Row>
              <Column width={this.state.openDrawer ? "1/2" : "2/3"} offset={this.state.openDrawer ? "1/6" : "0/1"}> <ResponsiveSummary /> </Column>
            </Row>
          </Grid>
        </div>

      </div>
    );
  }
}
