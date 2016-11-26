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


/**
 * A modal dialog can only be closed by selecting one of the actions.
 */
export default class AddAptDialog extends React.Component {

  constructor(props, context) {
      super(props, context);
      this.state = {
        modalOpen: false,
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

    var bindRequest= new DBManager().bindApartment(data.invite_code)
                     .then(function(apt){
                        console.log('onSubmit_bind:', data);
                        this.setState({modalOpen: false});}.bind(this))
                     .catch(this.notifyRequestError);
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

  checkAptBinding() {
    new DBManager().getApartment()
    .then(function(apt){console.log('Apt Binding looks OK', apt.getAptID());})
    .catch(function(err) {
      console.log('Apt Binding looks corrupt..prompting', err);
      this.setState({modalOpen: true});
    }.bind(this));
  };

  checkUserBinding() {
    var user = DBManager.currentUser();
    var db = new DBManager();
    var userPromise = db.getUser()
                      .then(function(_user){console.log('User Binding looks OK', _user.getUserID());})
                      .catch(function(err){
                        console.log('User Binding looks corrupt..fixing');
                        var newUser = new User(user.email, user.displayName, "", "");
                        newUser.setUserID(user.uid);
                        db.addUser(newUser).then(function(addedUser){
                          console.log('addedUser:', addedUser);
                        });
                      });
  };

  componentDidMount() {
    this.checkUserBinding();
    this.checkAptBinding();
  };

  render() {
    return (
        <Dialog
          modal={true}
          title="Invite Code"
          className="frosted"
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
            disabled={false}
          />
      </Formsy.Form>
    </Dialog>
    );
  };
}


// unitTest_bindApartment(aptID) {
//   console.log('on_UnitTest_bindApartment');
//   // Create a test user & add messages
//   var manager = new DBManager();
//   var uid = "GNfb868cZATuNgsI1kYLA1QxjWi2";
//   var user = new User("bob@gmail.com", "Bob", "Jones", "760-989-0632");
//   user.setUserID(uid);
//
//   manager.signIn("bob@gmail.com", "password").then(function () {
//   var message = new Message("ABCDEFGHIJK", "1112333", "HELLOW WORLD", "aasdfasdf");
//   var chore = new Chore("random", "23/23/23", "Do this task well");
//   var apartment = new Apartment("Apt. 311 | 715 Gayley | Los Angeles, CA 92203");
//   // apartment.addTenant(uid);
//   manager.addUser(user);
//   manager.addMessage(message);
//   manager.addChore(chore);
//   var id = manager.addApartment(apartment);
//   console.log('apartment ID:', id);
//   manager.bindApartment(id);
// });
// };
