import React from 'react';
import Dialog from 'material-ui/Dialog';
import {FormsyText} from 'formsy-material-ui/lib'
import RaisedButton from 'material-ui/RaisedButton';
import {CardMedia, CardActions, CardTitle, CardText} from 'material-ui/Card';


import User from '../../User.js';
import Chore from '../../Chore.js';
import Message from '../../Message.js';
import DBManager from '../../dbManager.js';
import Apartment from '../../Apartment.js';

const style = {
  titles:{
    //backgroundColor:'rgba(0,0,255,0.85)',
  },

  dialog:{

  },

  contents:{
      textAlign: 'center',
      width: '480px',
  },

  overlay:{

  },

  bodys:{
    //backgroundColor:'rgba(255,0,255,0.85)',
    // WebkitBackdropFilter:'blur(4px)',
  },
};

/**
 * A modal dialog can only be closed by selecting one of the actions.
 */
export default class AddAptDialog extends React.Component {

  constructor(props, context) {
      super(props, context);
      this.state = {
        modalOpen: true,
        submitEnabled: true,
        hasSubmitted: false,
      };
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
    this.unitTest_bindApartment();
    //var dbManager = new DBManager();
    //var result = dbManager.bindApartment(data.invite_code).catch(this.notifyRequestError);
    // result.then(function(data){
    //   console.log('onSubmit_bind:', data);
    // }).catch(function(data){
    //   console.log('submit_bind_failed:', data);
    // });
  };

  checkAptBinding() {

  };

  unitTest_bindApartment(aptID) {
    console.log('on_UnitTest_bindApartment');
    // Create a test user & add messages
    var manager = new DBManager();
    var uid = "GNfb868cZATuNgsI1kYLA1QxjWi2";
    var user = new User("bob@gmail.com", "Bob", "Jones", "760-989-0632");
    user.setUserID(uid);

    manager.signIn("bob@gmail.com", "password").then(function () {
    var message = new Message("ABCDEFGHIJK", "1112333", "HELLOW WORLD", "aasdfasdf");
    var chore = new Chore("random", "23/23/23", "Do this task well");
    var apartment = new Apartment("Apt. 311 | 715 Gayley | Los Angeles, CA 92203");
    // apartment.addTenant(uid);
    manager.addUser(user);
    manager.addMessage(message);
    manager.addChore(chore);
    var id = manager.addApartment(apartment);
    console.log('apartment ID:', id);
    manager.bindApartment(id);
  });
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
          style={style.dialog}
          contentClassName="dialogHack"
          contentStyle={style.contents}
          overlayStyle={style.overlay}
          bodyStyle={style.bodys}
          titleStyle={style.titles}
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
