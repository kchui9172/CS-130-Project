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
  contents: {
    marginLeft:256,
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
          <Grid breakpoints={[3]} flexible={true} columnWidth={300} gutterWidth={20} onChange={breakpoint => {}} >
            <Row>
              <Column width="1/3" ><ResponsiveSummary/></Column>
              <Column width="1/3"><ResponsiveSummary/></Column>
              <Column width="1/3"> <ResponsiveSummary /> </Column>
            </Row>
            <br/>
            <Row>
              <Column width="1/3" ><ResponsiveSummary/></Column>
              <Column width="1/3"><ResponsiveSummary/></Column>
              <Column width="1/3"> <ResponsiveSummary /> </Column>
            </Row>
            <br/>
            <Row>
              <Column width="1/3" ><ResponsiveSummary/></Column>
              <Column width="1/3"><ResponsiveSummary/></Column>
              <Column width="1/3"> <ResponsiveSummary /> </Column>
            </Row>
            <br/>
          </Grid>
        </div>

      </div>
    );
  }
}
