import React, {Component} from 'react';
import {Grid, Row, Column} from 'react-cellblock';

import ChoresCard   from '../Cards/ChoresCard.js';
import ChoreComponent from '../../../components/ChoreComponent.js';

export default class HomePage extends React.Component {

  constructor(props) {
    super(props);
  };

  render() {
    return (
      <div>
      <Grid breakpoints={[1]} flexible={true} columnWidth={960} gutterWidth={20} onChange={breakpoint => {}} >
            <Row>
              <Column offset="1/16" width="7/8"><ChoreComponent /></Column>
            </Row>
      </Grid>
      <Grid breakpoints={[4]} flexible={true} columnWidth={280} gutterWidth={20} onChange={breakpoint => {}} >
              <Row>
                <Column width="1/4"> <ChoresCard /> </Column>
                <Column width="1/4"> <ChoresCard /> </Column>
                <Column width="1/4"> <ChoresCard /> </Column>
                <Column width="1/4"> <ChoresCard /> </Column>
              </Row>
              <br/>
              <Row>
                <Column width="1/4"> <ChoresCard /> </Column>
                <Column width="1/4"> <ChoresCard /> </Column>
                <Column width="1/4"> <ChoresCard /> </Column>
                <Column width="1/4"> <ChoresCard /> </Column>
              </Row>
              <br/>
              <Row>
                <Column width="1/4"> <ChoresCard /> </Column>
                <Column width="1/4"> <ChoresCard /> </Column>
              </Row>
      </Grid>
    </div>);
  }
};
// <Grid breakpoints={[4]} flexible={true} columnWidth={280} gutterWidth={20} onChange={breakpoint => {}} >
//   <Row>
//     <Column width="1/4"> <ChoresCard /> </Column>
//     <Column width="1/4"> <ChoresCard /> </Column>
//     <Column width="1/4"> <ChoresCard /> </Column>
//     <Column width="1/4"> <ChoresCard /> </Column>
//   </Row>
//   <br/>
//   <Row>
//     <Column width="1/4"> <ChoresCard /> </Column>
//     <Column width="1/4"> <ChoresCard /> </Column>
//     <Column width="1/4"> <ChoresCard /> </Column>
//     <Column width="1/4"> <ChoresCard /> </Column>
//   </Row>
//   <br/>
//   <Row>
//     <Column width="1/4"> <ChoresCard /> </Column>
//     <Column width="1/4"> <ChoresCard /> </Column>
//   </Row>
// </Grid>
