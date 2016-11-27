import React from 'react';
import ReactDOM from 'react-dom';
import DBManager from '../dbManager.js';
import User from '../User.js';
import Message from '../Message.js';

import RaisedButton from 'material-ui/RaisedButton';
import {FormsyText} from 'formsy-material-ui/lib';
import Formsy from 'formsy-react';

import FloatingCard from './primitives/FloatingCard.js';
import { CardActions, CardTitle, CardText} from 'material-ui/Card';

/*import Formsy from 'formsy-react';
import {FormsyText} from 'formsy-material-ui/lib';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton'; */

/**
 * Represents a Message Form.
 *
 * @class React.Component.MessageForm
 * @extends React.Component
 */
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
            value: ''
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
        console.log(e.messageText);
        console.log("about to add message");
        var manager = new DBManager();
        // manager.signIn("bob@gmail.com","password").then(function(){
        //     manager.getUser().then(function(user){
        //         console.log("meow");
        //         console.log(e.messageText);
        //         var message = new Message(user.getUserID(),user.getAptID(), new Date(), e.messageText);
        //         manager.addMessage(message);
        //     });
        // }.bind(this));
        console.log("added message");
        this.state.value="";
        //e.preventDefault();
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
    return (
        <Formsy.Form ref="addMessage" onValidSubmit={this.addItem} >
            <FormsyText required={true}  name="messageText" floatingLabelText={'Enter note'} multiLine={true} rows={3}/>
            <RaisedButton fullWidth={false} type="submit" label="Send Message" primary={false} secondary={true} />
        </Formsy.Form>
    );
  }
}



/*
                    <form onSubmit={this.addItem}>
                        <input ref={(a) => this._inputElement = a} //inputElement property stores reference to input element
                            placeholder="Enter note">
                        </input>
                        <button type="submit">+</button>
                    </form>
*/

/*        <form onSubmit={this.addItem}>
            <input ref={(a) => this._inputElement = a} //inputElement property stores reference to input element
                placeholder="Enter note">
            </input>
            <button type="submit">+</button>
        </form>
        */
