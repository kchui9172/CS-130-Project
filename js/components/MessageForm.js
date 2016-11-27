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

    isEmptyString() {
        return String(this).replace(/^\s+|\s+$/g, '');
    }
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
        //         console.log("meow");
        //         console.log(e.messageText);
        //         var message = new Message(user.getUserID(),user.getAptID(), new Date(), e.messageText);
        //         manager.addMessage(message);
        //     });
        // }.bind(this));
      //  snack('adding message', 1000)
        this.state.value="";
        //e.preventDefault();
        }

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
/*if (this._inputElement.value != ""){ //if empty, don't create note
    var context = this;
    console.log("about to add a message");
    var manager = new DBManager();
    //console.log(this._inputElement.value);;
    manager.signIn("bob@gmail.com", "password").then(function () {
        manager.getUser().then(function(user) {
            console.log(context._inputElement.value);
            var message = new Message(user.getUserID(),user.getAptID(), new Date(), context._inputElement.value);
            manager.addMessage(message);
        });
    });

    console.log("added message");
    //return message has been sucessfully added or if empty do nothing
    this._inputElement.value="";
    e.preventDefault();
}else{
    e.preventDefault();
    return;
}*/
//}
