import React, {Component} from 'react';
import {Grid, Row, Column} from 'react-cellblock';
import MessagesCard from '../Cards/MessagesCard.js';
/**
 * Represents the Messages page.
 *
 * @class React.Component.Messages
 * @extends React.Component
 */
export default class MessagesView extends React.Component {

  constructor(props, context) {
      super(props, context);
  }

  render() {
  return(
    <Grid breakpoints={[1]} flexible={true} columnWidth={960} gutterWidth={20} onChange={breakpoint => {}} >
          <Row>
            <Column offset="1/16" width="7/8"><MessagesCard /></Column>
          </Row>
        </Grid>
    );
  }
};
