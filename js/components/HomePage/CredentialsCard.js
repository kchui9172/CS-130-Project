import React, {Component} from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';

import LoginForm from './LoginForm.js';
import SignUpForm from './SignUpForm.js';
import FloatingCard from '../FloatingCard.js';

const style = {
  card: {
    zDepth_onBlur:1,
    zDepth_onFocus: 5,
    width: '320px',
    padding: '0px',
    textAlign: 'center',
    borderRadius: '6px',
  },
  tabs: {
    overflow:'hidden',
    borderRadius: '6px 6px 0px 0px',
  }
};

export default class CredentialsCard extends React.Component {

  constructor(props, context) {
      super(props, context);
      this.state = {
          slideIndex: 0,
      };
    }

  handleChange = (value) => {
    this.setState({
      slideIndex: value,
    });
  };

  render() {
  return(
    <FloatingCard style={style.card}>
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
    );
  }
}
