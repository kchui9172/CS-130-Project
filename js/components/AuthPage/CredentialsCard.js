import React, {Component} from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';

import LoginForm from './LoginForm.js';
import SignUpForm from './SignUpForm.js';
import FloatingCard from '../primitives/FloatingCard.js';

const style = {
  card: {
    width: '320px',
    position: 'fixed',
  },
  tabs: {
    overflow:'hidden',
    borderRadius: '6px 6px 0px 0px',
  }
};

/**
 * Represents a Credentials Card.
 *
 * @class React.Component.CredentialCard
 * @extends React.Component
 */
export default class CredentialsCard extends React.Component {
  /**
   * Constructs a Credentials Card.
   *
   * @method constructor
   * @constructor
   * @param {Object} props - Properties passed by parent
   * @param {Object} context - Context passed by parent
   */
  constructor(props, context) {
      super(props, context);
      this.state = {
          slideIndex: 0,
      };
    }

  /**
   * Handles event where Credentials Card is changed.
   *
   * @method handleChange
   * @param {Object} value - The new, changed value
   */
  handleChange = (value) => {
    this.setState({
      slideIndex: value,
    });
  };

  /**
   * Renders a Credentials Card.
   *
   * @method render
   */
  render() {
  return(
    <div style={style.card}>
    <FloatingCard>
        <div>
          <Tabs style={style.tabs} onChange={this.handleChange} value={this.state.slideIndex}>
              <Tab label='SignUp' value={0} />
              <Tab label='Login' value={1} />
          </Tabs>
          <SwipeableViews index={this.state.slideIndex} onChangeIndex={this.handleChange}>
                  <SignUpForm/>
                  <LoginForm/>
          </SwipeableViews>
        </div>
    </FloatingCard>
    </div>
    );
  }
}
