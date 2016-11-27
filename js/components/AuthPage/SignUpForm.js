import React from 'react';
import Formsy from 'formsy-react';
import {FormsyText} from 'formsy-material-ui/lib'
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';

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
  square: {
    border: '1px solid #77aaff',
    boxShadow:  '-1px 1px #77aaff,-2px 2px #77aaff,-3px 3px #77aaff,-4px 4px #77aaff,-5px 5px #77aaff',
  },
};

const validationChecks = {

  Password1: {
    check: {minLength:8, maxLength: 128},
    error: {minLength: '8 characters minimum', maxLength: '128 characters maximum'},
  },

  Password2: {
    check: {equalsField : 'password'},
    error: {minLength: '8 characters minimum', maxLength: '128 characters maximum', equalsField: 'Passwords must match'},
  },
}

/**
 * Represents a Sign-Up Form
 *
 * @class React.Component.SignUpForm
 * @extends React.Component
 */
const SignUpForm = React.createClass({
  /**
   * Enables the sign-up button.
   *
   * @method enableButton
   */
  enableButton() {
    this.setState({
      canSubmit: true,
    });
  },

  /**
   * Disables the sign-up button.
   *
   * @method disableButton
   */
  disableButton() {
    this.setState({
      canSubmit: false,
    });
  },

  /**
   * Submits the Sign-Up Form to the database.
   *
   * @method submitForm
   * @param {Object} data - The data in the Sign-Up Form
   */
  submitForm(data) {
    if(data.firstname=="" || data.email=="" || data.password=="" || data.repassword=="") {
        return this.notifyFormError(data);
      }

    this.setState({
      hasSubmitted: true,
      canSubmit: false,
    });

    console.log('submitSignUp:', data);
    var dbManager = new DBManager();
    var result = dbManager.signUp(data.email, data.password, data.firstname, data.lastname, this.notifySignupError);
  },

  /**
   * Notifies that a sign-up error has occurred.
   *
   * @method notifySignUpError
   * @param {Error} error - The error
   */
  notifySignupError(error) {
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
   * Notifies that there is an error in the Sign-Up Form.
   *
   * @method notifyFormError
   * @param {Object} data - The data in the Sign-Up Form
   */
  notifyFormError(data) {
    console.error('Form error:', data);
    this.setState({
      FirstNameInvalid: (data.firstname==""),
      emailInvalid: (data.email==""),
      passwordInvalid: (data.password==""),
      password2Invalid: (data.repassword==""),
    });
  },

  /**
   * Resets the Sign-Up Form.
   *
   * @method resetSignupForm
   */
  resetSignupForm() {
    this.setState(this.getInitialState());
    this.refs.signup.reset();
  },

  /**
   * Gets the initial state of the Sign-Up Form.
   *
   * @method getInitialState
   */
  getInitialState() {
    return {
      validateFirstName: true,
      FirstNameInvalid: false,

      validateLastName: true,
      LastNameInvalid: false,

      validateEmail: true,
      emailInvalid: false,

      validatePassword: true,
      passwordInvalid: false,

      validatePassword2: true,
      password2Invalid: false,

      hasSubmitted: false,
      canSubmit: true,

      errorText: null,
      errorDialog: false,
    };
  },

  /**
   * Enables first name validation.
   *
   * @method enableFirstNameValidation
   */
  enableFirstNameValidation() {
    this.setState({
      validateFirstName: true,
    });
    console.log('validateFirstName:', 'true');
  },

  /**
   * Disables first name validation.
   *
   * @method disableFirstNameValidation
   */
  disableFirstNameValidation() {
    this.setState({
      validateFirstName: false,
      FirstNameInvalid: false,
    });
    console.log('validateFirstName:', 'false');
  },

  /**
   * Enables last name validation.
   *
   * @method enableLastNameValidation
   */
  enableLastNameValidation() {
    this.setState({
      validateLastName: true,
    });
    console.log('validateLastName:', 'true');
  },

  /**
   * Disables last name validation
   *
   * @method disableLastNameValidation
   */
  disableLastNameValidation() {
    this.setState({
      validateLastName: false,
      LastNameInvalid: false,
    });
    console.log('validateLastName:', 'false');
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
   * @method disablePasswordValidation
   */
  disablePasswordValidation() {
    this.setState({
      validatePassword: false,
      passwordInvalid: false,
    });
    console.log('validatePassword:', 'false');
  },

  /**
   * Enables re-entered password validation.
   * 
   * @method enablePassword2Validation
   */
  enablePassword2Validation() {
    this.setState({
      validatePassword2: true,
    });
    console.log('validatePassword2:', 'true');
  },

  /**
   * Disables re-entered password validation.
   *
   * @method disablePassword2Validation
   */
  disablePassword2Validation() {
    this.setState({
      validatePassword2: false,
      password2Invalid: false,
    });
    console.log('validatePassword2:', 'false');
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
   * Renders a Sign-Up Form.
   *
   * @method render
   */
  render() {
    return (
      <div>
        <CardTitle title = "Welcome to Rockmates!" subtitle = "Create a new account"/>
        <CardText style={style.contents}>
        <Formsy.Form ref="signup" onValid={this.enableButton} onInvalid={this.disableButton} onValidSubmit={this.submitForm} onInvalidSubmit={this.notifyFormError}>
          <FormsyText required={!this.state.validateFirstName} onBlur={this.enableFirstNameValidation} onFocus={this.disableFirstNameValidation} name="firstname"                  validations={this.state.FirstNameInvalid ? {isUndefined:false} : this.state.validateFirstName ? {isAlpha:true}                  : {isExisty:true}} validationError ="(Required) First name can contain letters only." floatingLabelText={'First Name'}        disabled={this.state.hasSubmitted} />
          <FormsyText                                          onBlur={this.enableLastNameValidation}  onFocus={this.disableLastNameValidation}  name="lastname"                   validations={this.state.LastNameInvalid  ? {isUndefined:false} : this.state.validateLastName  ? {isAlpha:true}                  : {isExisty:true}} validationError ="Last name can contain letters only."             floatingLabelText={'Last Name'}         disabled={this.state.hasSubmitted} />
          <FormsyText required={!this.state.validateEmail}     onBlur={this.enableEmailValidation}     onFocus={this.disableEmailValidation}     name="email"                      validations={this.state.emailInvalid     ? {isUndefined:false} : this.state.validateEmail     ? {isEmail:true}                  : {isExisty:true}} validationError ="Please provide a valid email address"            floatingLabelText={'Email'}             disabled={this.state.hasSubmitted} />
          <FormsyText required={!this.state.validatePassword}  onBlur={this.enablePasswordValidation}  onFocus={this.disablePasswordValidation}  name="password"  type="password"  validations={this.state.passwordInvalid  ? {isUndefined:false} : this.state.validatePassword  ? validationChecks.Password1.check: {isExisty:true}} validationErrors={validationChecks.Password1.error}                floatingLabelText={'Password'}          disabled={this.state.hasSubmitted} />
          <FormsyText required={!this.state.validatePassword2} onBlur={this.enablePassword2Validation} onFocus={this.disablePassword2Validation} name="password2" type="password"  validations={this.state.password2Invalid ? {isUndefined:false} : this.state.validatePassword2 ? validationChecks.Password2.check: {isExisty:true}} validationError ="Both passwords must match!"                      floatingLabelText={'Re-enter password'} disabled={this.state.hasSubmitted} />
        <CardActions>
          <RaisedButton fullWidth={true} type="submit" label="SignUp" primary={false} secondary={true} disabled={!this.state.canSubmit||this.state.hasSubmitted}/>
        </CardActions>
      </Formsy.Form>
      </CardText>
      <FloatingDialog title={"Signup Failed!"} modal={false} open={this.state.errorDialog} onRequestClose={this.resetSignupForm}>
        {this.state.errorText}
      </FloatingDialog>
    </div>
  );
},
});

export default SignUpForm;
