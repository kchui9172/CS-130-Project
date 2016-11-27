import React, {Component} from 'react';
import {Grid, Row, Column} from 'react-cellblock';
import MessagesCard from '../Cards/MessagesCard.js';
/**
 * Represents a Settings View.
 *
 * @class React.Component.SettingsView
 * @extends React.Component
 */
export default class SettingsView extends React.Component {
  /**
   * Constructs a Settings View.
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
   * Renders a Settings View.
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
