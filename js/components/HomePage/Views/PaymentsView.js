import React, {Component} from 'react';
import {Grid, Row, Column} from 'react-cellblock';
import PaymentsCard from '../Cards/PaymentsCard.js';

const style = {
  heading: {
      marginLeft: '267px',
      fontWeight: '400',
      fontSize: '24px',
  },
};

/**
 * Represents a Payments View.
 *
 * @class React.Component.PaymentsView
 * @extends React.Component
 */
export default class PaymentsView extends React.Component {
  /**
   * Constructs a Payments View.
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
   * Renders a Payments View.
   *
   * @method render
   */
  render() {
  return(
      <div>
        <h1 style={style.heading}> PAYMENTS </h1>
        <Grid breakpoints={[1]} flexible={true} columnWidth={960} gutterWidth={20} onChange={breakpoint => {}} >
          <Row>
            <Column offset="1/16" width="7/8"><PaymentsCard /></Column>
          </Row>
        </Grid>
      </div>
    );
  }
};
