import React from 'react';
import ReactDOM from 'react-dom';
import DBManager from '../dbManager.js';
import User from '../User.js';
import Message from '../Message.js';

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
            items: [],
            listItems: {},
        }

        this.addItem = this.addItem.bind(this);
    };

    addItem(e) {
        var manager = new DBManager();
        var uid = "GNfb868cZATuNgsI1kYLA1QxjWi2";
        var aptid = "ASD77SDF70";

        var testUser = new User("bob@gmail.com", "Bob", "Jones", "760-989-0632");
        testUser.setUserID(uid);
        testUser.setAptID(aptid);
        manager.addUser(testUser);

        if (this._inputElement.value == ""){ //if empty, don't create note
            e.preventDefault();
            return;
        }


        var newMessage = new Message("Kristen",this.generateDate(),this._inputElement.value, 1234);
        manager.addMessage(newMessage);
        console.log("added message");
        //return message has been sucessfully added or if empty do nothing

        var itemArray = this.state.items;

        itemArray.unshift({ //newest message at top
            text: this._inputElement.value,
            time: this.generateDate(),
            user: "Kristen", //replace with user's name
            key: 1234} //should replace this with apartment id
        );

        this.setState({items: itemArray});
        this._inputElement.value="";
        e.preventDefault();
    }

    /**
     * Generates a Date.
     *
     * @method generateDate
     * @return {string} - The generated date
     */
    generateDate() {
        var date = new Date();
        var year = date.getUTCFullYear();
        var month = date.getUTCMonth();
        var day = date.getUTCDate();
        //month 2 digits
        month = ("0" + (month + 1)).slice(-2);

       //year 2 digits
        year = year.toString().substr(2,2);

        var formattedDate = month + '/' + day + "/" + year;
        return formattedDate;
    }

    /**
     * Renders a Message Form.
     *
     * @method render
     */

    render() {
        return (
            <div>
                <div>
                    <form onSubmit={this.addItem}>
                        <input ref={(a) => this._inputElement = a} //inputElement property stores reference to input element
                            placeholder="Enter note">
                        </input>
                        <button type="submit">+</button>
                    </form>
                </div>
            </div>
        );
    }
}
