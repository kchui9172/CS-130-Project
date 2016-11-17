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
  square: {
    border: '1px solid #77aaff',
    boxShadow:  '-1px 1px #77aaff,-2px 2px #77aaff,-3px 3px #77aaff,-4px 4px #77aaff,-5px 5px #77aaff',
  },
};

const LoginForm = React.createClass({
  contextTypes: {
      router: React.PropTypes.object.isRequired
  },

  enableButton() {
    this.setState({
      canSubmit: true,
    });
  },

  disableButton() {
    this.setState({
      canSubmit: false,
    });
  },

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
    result.then(function(data){
      console.log('resultLogin:', data);
      //this.onLoginSuccessful();
    });
  },

  notifyLoginError(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.error(errorCode);
    this.setState({
      errorDialog: true,
      errorText: errorMessage,
    });
  },

  resetLoginForm() {
    this.setState(this.getInitialState());
    this.refs.login.reset();
  },

  notifyFormError(data) {
    console.error('Form error:', data);
    this.setState({
      emailInvalid: (data.email==""),
      passwordInvalid: (data.password==""),
    });
  },

  onLoginSuccessful() {
    var location = self.props.location
    if (location.state && location.state.nextPathname) {
      self.context.router.replace(location.state.nextPathname)
    } else {
        self.context.router.replace('/home')
    }
  },

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

  enablePasswordValidation() {
    this.setState({
      validatePassword: true,
    });
    console.log('validatePassword:', 'true');
  },

  disablePasswordValidation() {
    this.setState({
      validatePassword: false,
      passwordInvalid: false,
    });
    console.log('validatePassword:', 'false');
  },

  enableEmailValidation() {
    this.setState({
      validateEmail: true,
    });
    console.log('validateEmail:', 'true');
  },

  disableEmailValidation() {
    this.setState({
      validateEmail: false,
      emailInvalid: false,
    });
    console.log('validateEmail:', 'false');
  },

  render() {
    return (
      <div>
      <CardMedia>
        <img style={style.image} src='https://upload.wikimedia.org/wikipedia/en/4/4d/SpongeBob_SquarePants_characters_cast.png'/>
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
