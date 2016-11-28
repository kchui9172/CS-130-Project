import React, {Component} from 'react';
import {Grid, Row, Column} from 'react-cellblock';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FloatingCard from '../../primitives/FloatingCard.js';
import ActionHome from 'material-ui/svg-icons/action/home';
import {colors} from '../../../config/MUI.js';
import Email from 'material-ui/svg-icons/communication/email';
import Payment from 'material-ui/svg-icons/action/payment';
import EventNote from 'material-ui/svg-icons/notification/event-note';

const style={
  messages:{
    backgroundColor:colors.message,
  },
};
/**
 * Represents a Payments View.
 *
 * @class React.Component.PaymentsView
 * @extends React.Component
 */
export default class HomeView extends React.Component {
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
    <Grid breakpoints={[1]} flexible={true} columnWidth={960} gutterWidth={20} onChange={breakpoint => {}} >
          <Row>
            <Column>
              <Card>
                <CardTitle title="Welcome to Rockmates!"/>
                <CardText title="Welcome"/>
                </Card>
            </Column>
          </Row>
          <br/>
          <Row>
          <Column width="1/3">
            <FloatingCard>
              <CardMedia>
              <Email className='frosted button-card' style={style.messages}/>
              </CardMedia>
            </FloatingCard>
          </Column>
          <Column width="1/3">
            <FloatingCard>
              <CardMedia>
              <EventNote className='frosted button-card' style={style.messages}/>
              </CardMedia>
            </FloatingCard>
          </Column>
          <Column width="1/3">
            <FloatingCard>
              <CardMedia>
              <Payment className='frosted button-card' style={style.messages}/>
              </CardMedia>
            </FloatingCard>
          </Column>
          </Row>
          <br/>
        </Grid>
    );
  }
};
