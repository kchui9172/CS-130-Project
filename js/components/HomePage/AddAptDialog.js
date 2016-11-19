import React from 'react';
import Dialog from 'material-ui/Dialog';
import {FormsyText} from 'formsy-material-ui/lib'
import RaisedButton from 'material-ui/RaisedButton';
import {CardMedia, CardActions, CardTitle, CardText} from 'material-ui/Card';

import DBManager from '../../dbManager.js';

const style = {
  dialog:{
      textAlign: 'center',
      width: '480px',
      padding:'32px',
  },
};

/**
 * A modal dialog can only be closed by selecting one of the actions.
 */
export default class AddAptDialog extends React.Component {
  state = {
    modalOpen: true,
    submitEnabled: true,
    hasSubmitted: false,
  };

  handleOpen = () => {
    this.setState({modalOpen: true});
  };

  handleClose = () => {
    this.setState({modalOpen: false});
  };

  enableButton = () => {
    this.setState({submitEnabled:true});
  };

  disableButton = () => {
    this.setState({submitEnabled:false});
  };

  submitForm = (data) => {

    if(data.invite_code=="") {
        return this.notifyFormError(data);
    }

    this.setState({
      hasSubmitted: true,
      submitEnabled: false,
    });

    console.log('submit_bind:', data);
    var dbManager = new DBManager();
    var result = dbManager.bindApartment(data.invite_code, this.notifyRequestError);
    // result.then(function(data){
    //   console.log('onSubmit_bind:', data);
    // }).catch(function(data){
    //   console.log('submit_bind_failed:', data);
    // });
  };

  notifyRequestError(error) {
    console.log('onSubmit_error:');
    var errorCode = error.code;
    var errorMessage = error.message;
    console.error(errorCode);
    this.setState({
            hasSubmitted: false,
            submitEnabled: true,
    });
  };


  render() {
    return (
        <Dialog
          title="Invite Code"
          modal={true}
          contentStyle={style.dialog}
          open={this.state.modalOpen}
        >
        <Formsy.Form ref="InviteCode"
            onValid={this.enableButton}
            onInvalid={this.disableButton}
            onValidSubmit={this.submitForm}
            onInvalidSubmit={this.notifyFormError}
        >
        <FormsyText
          required={true}
          name="invite_code"
          validations={{isExisty:true}}
          validationError="Please provide a valid invite code"
          floatingLabelText={'Invite Code'}
          disabled={this.state.hasSubmitted}
        />
          <RaisedButton
            fullWidth={true}
            type="submit"
            label="Add Apartment"
            primary={true}
            secondary={false}
            disabled={false}//{!this.state.canSubmit||this.state.hasSubmitted}
          />
      </Formsy.Form>
    </Dialog>
    );
  }
}
