import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import TodoItem from './TodoItem.js';
import DBManager from '../dbManager.js';
import User from '../User.js';
import Message from '../Message.js';
/**
 * Represents a To-Do List.
 *
 * @class React.Component.TodoList
 * @extends React.Component
 */
export default class TodoList extends Component {
    /**
     * Constructs a To-Do List.
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

    };

    /**
     * Tests messages
     *
     * @method TestMessages
     */
    TestMessages() {
      // Create a test user & add messages
      /*var manager = new DBManager();
      var uid = "ZNfb868cZATuNgsI1kYLA1QxjWi2";
      var aptid = "ASD77SDF70";

      var testUser = new User("bob@gmail.com", "Bob", "Jones", "760-989-0632");
      testUser.setUserID(uid);
      testUser.setAptID(aptid);
      manager.addUser(testUser);

      console.log("done creating user");
      var obj = new Message("ABCDEFGHIJK", "1112333", "HELLOW WORLD", "aasdfasdf")
      manager.addMessage(obj);
      manager.addMessage(obj);
      manager.addMessage(obj);
      manager.addMessage(obj);

      console.log("get messages");
      var ids = manager.getMessages();
      console.log('ids :', ids);
      var messages = this.createMessages(ids);*/


      // var manager = new DBManager();
      // manager.signIn("bob@gmail.com", "password").then(function () {
      //   manager.getUser().then(function(user) {
      //     var message = new Message(user.getUserID(),user.getAptID(), new Date(), "Hello this is a test");
      //     manager.addMessage(message);
      //   });
      // });

      manager.getMessageIDs().then(function (messages) {
      messages.forEach(function (value) {
        manager.getMessage(value).then(function (message) {
            console.log('========================');
            console.log(message.getText());
            console.log(message.getTimeSent());
        })
      })
    });
    }

    /**
     * Pulls a message from the database.
     *
     * @method pullMessage
     * @param {string} id - The id of the message to be pulled
     * @return {Object} - The message data
     */
    pullMessage(id) {
      var manager = new DBManager();
      var message = manager.getMessage(id);
      return message.then(function(e){
          var words = e.getText().toString();
          var t = e.getTimeSent().toString();
          var s = e.getSender().toString();
          return {text: words, time: t, user: s};
      });
    }

// Extracts information to make message
    /**
     * Pulls messages from the database
     *
     * @method pullMessages
     * @param {array{string}} ids - The ids of the messages to be pulled
     */
    pullMessages(ids) {
        console.log('start createMessages (ids)', ids.length, ids);
        var itemArray = [];
        this.setState({items: itemArray});
        for (var i = 0; i < ids.length; i++){
          var newMessage = this.pullMessage(ids[i]);
          newMessage.then(function(contents) {
            //
            itemArray.unshift(contents);
            this.setState({items: itemArray});
          }.bind(this));
        }
    }

    /**
     * Shows the Messages.
     *
     * @method showMessages
     */
    showMessages(){
      // var manager = new DBManager();
      // manager.signIn("bob@gmail.com","password").then(function(){
      //   manager.getMessageIDs().then(function (messages){
      //     console.log('on_getMessageIDs::', messages);
      //     this.pullMessages(messages);
      //     }.bind(this))
      //   }.bind(this));
      }
      //var ids = manager.getMessageIDs();
      //return this.createMessages(ids);

//this.messageListener =
    /**
     * Function called when component mounts.
     *
     * @method componentDidMount
     */
     componentDidMount() {
      this.showMessages();
        //this.showMessages().bind(this);
        //setInterval(function(){ this.showMessages().bind(this); }, 3000);
      //   var db = new DBManager();
      //   db.signIn("bob@gmail.com","password").then(function(){
      //   //db.listenForMessages();
      //   //this.listener = db.listenForMessages(this.showMessages());
      //   console.log('ComponentMounted');
      // }.bind(this));
      //  this.forceUpdate();
     }

    /**
     * Renders a To-Do Item.
     *
     * @method render
     */
    render() {
    	return (
    	    <div className="todoMain">
            <div className="items">
    		      <TodoItem entries={this.state.items}/>
            </div>
    	    </div>
    	);
    }
}
//<button disabled={true} onClick={this.reshowMessages()}/>
