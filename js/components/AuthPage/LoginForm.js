import React, {Component} from 'react';
import Formsy from 'formsy-react';

import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {FormsyText} from 'formsy-material-ui/lib'
import {CardMedia, CardActions, CardTitle, CardText} from 'material-ui/Card';

import DBManager from '../../dbManager.js';
import FloatingDialog from '../primitives/FloatingDialog.js';

const style = {
  image: {
    filter:'opacity(75%) saturate(70%) hue-rotate(3530deg)',
    boxShadow:'0 1px 2px rgba(0,0,0,0.25)',
  },

  button: {
    backgroundColor: "#a4c639",
    hoverColor: "#8AA62F",
  },
  contents: {
    padding:'6px',
  },
};

/**
 * Represents a Login Form.
 *
 * @class React.Component.LoginForm
 * @extends React.Component
 */
const LoginForm = React.createClass({
  contextTypes: {
      router: React.PropTypes.object.isRequired
  },

  /**
   * Enables the login button.
   *
   * @method enableButton
   */
  enableButton() {
    this.setState({
      canSubmit: true,
    });
  },

  /**
   * Disables the login button.
   *
   * @method disableButton
   */
  disableButton() {
    this.setState({
      canSubmit: false,
    });
  },

  /**
   * Submits the Login Form to the database
   *
   * @method submitForm
   * @param {Object} data - The Login Form data
   */
  submitForm(data) {

    if(data.email=="" || data.password=="") {
        return this.notifyFormError(data);
      }

    this.setState({
      hasSubmitted: true,
      canSubmit: false,
    });

    console.log('submitLogin:', data);
    var dbManager = new DBManager();
    var result = dbManager.signIn(data.email, data.password, this.notifyLoginError);
  },

  /**
   * Notifies that login error has occurred.
   *
   * @method notifyLoginError
   * @param {Error} error - The error
   */
  notifyLoginError(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.error(errorCode);
    this.setState({
      errorDialog: true,
      errorText: errorMessage,
    });
    return null;
  },

  /**
   * Resets the Login Form.
   *
   * @method resetLoginForm
   */
  resetLoginForm() {
    this.setState(this.getInitialState());
    this.refs.login.reset();
  },

  /**
   * Notifies that there is an error in the Login Form
   *
   * @method notifyFormError
   * @param {Object} data - The current data in the form
   */
  notifyFormError(data) {
    console.error('Form error:', data);
    this.setState({
      emailInvalid: (data.email==""),
      passwordInvalid: (data.password==""),
    });
  },

  /**
   * Gets the initial state of the Login Form.
   *
   * @method getInitialState
   */
  getInitialState() {
    return {
      validateEmail: true,
      emailInvalid: false,

      validatePassword: true,
      passwordInvalid: false,

      hasSubmitted: false,
      canSubmit:true,

      errorText: null,
      errorDialog: false,
    };
  },

  /**
   * Enables password validation.
   *
   * @method enablePasswordValidation
   */
  enablePasswordValidation() {
    this.setState({
      validatePassword: true,
    });
    console.log('validatePassword:', 'true');
  },

  /**
   * Disables password validation.
   *
   * @method disabePasswordValidation
   */
  disablePasswordValidation() {
    this.setState({
      validatePassword: false,
      passwordInvalid: false,
    });
    console.log('validatePassword:', 'false');
  },

  /**
   * Enables email validation.
   *
   * @method enableEmailValidation
   */
  enableEmailValidation() {
    this.setState({
      validateEmail: true,
    });
    console.log('validateEmail:', 'true');
  },

  /**
   * Disables email validation.
   *
   * @method disableEmailValidation
   */
  disableEmailValidation() {
    this.setState({
      validateEmail: false,
      emailInvalid: false,
    });
    console.log('validateEmail:', 'false');
  },

  /**
   * Renders a Login Form.
   *
   * @method render
   */
  render() {
    return (
      <div>
      <CardMedia>
        <img style={style.image} src={require('../../../static/assets/loginForm.jpg')} />
      </CardMedia>
      <CardTitle title="Hello Again!" subtitle="Login to your account" />
      <CardText style={style.contents}>
      <Formsy.Form ref="login" onValid={this.enableButton} onInvalid={this.disableButton} onValidSubmit={this.submitForm} onInvalidSubmit={this.notifyFormError}>
        <FormsyText required={!this.state.validateEmail} onBlur={this.enableEmailValidation} onFocus={this.disableEmailValidation} name="email" validations={this.state.emailInvalid ? {isUndefined:false} : this.state.validateEmail ? {isEmail:true,} : {isExisty:true}} validationError="Please provide a valid email address" floatingLabelText={'Email'} disabled={this.state.hasSubmitted} />
        <FormsyText required={!this.state.validatePassword} onBlur={this.enablePasswordValidation} onFocus={this.disablePasswordValidation} type="password" name="password" validations={this.state.passwordInvalid ? {isUndefined:false} : {isExisty:true}} validationError="Password field cannot be empty" floatingLabelText="Password" disabled={this.state.hasSubmitted}/>
        <CardActions>
          <RaisedButton fullWidth={true} type="submit" label="Login" primary={false} secondary={true} disabled={!this.state.canSubmit||this.state.hasSubmitted}/>
        </CardActions>
      </Formsy.Form>
      </CardText>
      <FloatingDialog title={"Login Failed!"} modal={false} open={this.state.errorDialog} onRequestClose={this.resetLoginForm}>
        {this.state.errorText}
      </FloatingDialog>
      </div>
  );
},
});

export default LoginForm;
