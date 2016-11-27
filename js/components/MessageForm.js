import React from 'react';
import ReactDOM from 'react-dom';
import DBManager from '../dbManager.js';
import User from '../User.js';
import Message from '../Message.js';

import RaisedButton from 'material-ui/RaisedButton';
import {FormsyText} from 'formsy-material-ui/lib';
import Formsy from 'formsy-react';

import Divider from 'material-ui/Divider';
import { CardActions, CardTitle, CardText} from 'material-ui/Card';

import {snack} from './primitives/Snacker.js';

const style = {
  messagebox: {
    textAlign:'center',
    padding:'12px',
    minWidth:'420px',
  },
  messagebody: {
    minHeight:'200px',
    borderRadius: '6px',
    padding:'6px',
    backgroundColor:'rgba(135,125,102,0.1)',
    border:'2px solid rgba(224, 224, 224,0.8)',
  },
};

export default class MessageForm extends React.Component {
    /**
     * Constructs a Message Form.
     *
     * @method constructor
     * @constructor
     */
    constructor() {
        super();

        this.state = {
            value: '',
            sending:false,
            sent:false,
        };

        this.addItem = this.addItem.bind(this);
        this.handleChange = this.handleChange.bind(this);
        //this.handleSubmit = this.handleSubmit.bind(this);
    };

    /**
     * Adds a Message to the database
     *
     * @method addItem
     * @param {Object} e - The submitted object with the message text
     */
    addItem(e) {

        if(e.messageText.trim() === '')
          return;
        this.setState({sending:true});
        var now = new Date();
        var db = new DBManager();
        console.log("about to add message", e.messageText);
        var apt_IDPromise = db.getApartment().then(function(apt) {return apt.getAptID()});
        var userIDPromise = db.getUser().then(function(user) {return user.getUserID()});
        Promise.all([userIDPromise, apt_IDPromise]).then(values => {
          console.log('onfetch userID, aptID', values[0], values[1]);
          var message = new Message(values[0], values[1], now, e.messageText);
          db.addMessage(message).then(function(success) {
            this.setState({sending:false, sent:true});
          }.bind(this), function(err) {
            this.setState({sending:false, sent:false});
          }.bind(this));
        });
      //  snack('adding message', 1000)
        this.state.value="";
        //e.preventDefault();
        }

  /**
   * Handles change in the message text box.
   *
   * @method handleChange
   * @param {Event} event - The event triggered on change
   */
  handleChange(event) {
    this.setState({value: event.target.value});
  }


    /**
     * Renders a Message Form.
     *
     * @method render
     */

  render() {
    var _label = this.state.sending ? "Sending..." : this.state.sent ? "Sent!" : "Send Message";
    return (
        <div style={style.messagebox}>
        <CardTitle title="New Message" />
        <Divider />
        <Formsy.Form ref="addMessage" onValidSubmit={this.addItem} >
          <CardText>
            <FormsyText required={true} fullWidth={true} name="messageText" hintText={"Type message here"} multiLine={true} rows={1} textareaStyle={style.messagebody} underlineDisabledStyle={null} errorText="Message Field cannot be empty"/>
          </CardText>
          <CardActions>
          <RaisedButton fullWidth={true} type="submit" label={_label} primary={false} secondary={true} disabled={this.state.sent}/>
          </CardActions>
        </Formsy.Form>
        </div>
    );
  }
}
