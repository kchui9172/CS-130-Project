import React, {Component} from 'react';
import {Grid, Row, Column} from 'react-cellblock';
import MessagesCard from '../Cards/MessagesCard.js';

import TodoList from '../../../components/TodoList.js';

/**
 * Represents a Messages View.
 *
 * @class React.Component.MessagesView
 * @extends React.Component
 */
export default class MessagesView extends React.Component {
  /**
   * Constructs a Messages View.
   *
   * @method constructor
   * @constructor
   * @param {Object} props - Properties passed by parent
   * @param {Object} context - Context passed by parent
   */
  constructor(props, context) {
      super(props, context);
  }

  /** 
   * Renders a Messages View.
   *
   * @method render
   */
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

// <Row>
//   <Column offset="1/16" width="7/8"><TodoList /></Column>
// </Row>
