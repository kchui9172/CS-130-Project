import React from 'react';
import ReactDOM from 'react-dom';
import ToDoItem from './ToDoItem.js'; //hypothetically don't need anymore
import dbManager from '../dbManTest.js';
import Message from '../Message.js';

/**
 * Represents a To-Do List.
 *
 * @class React.Component.TodoList
 * @extends React.Component
 */
export default class TodoList extends React.Component {
    /**
     * Constructs a To-Do List.
     *
     * @method constructor
     * @constructor
     */
    constructor() {
        super();

      	this.state = {
            items: []
        }

   	this.addItem = this.addItem.bind(this);
    };

    addItem(e) {
        //dbManager should add item to list
        var db = new dbManager();
        var m = new Message("kristen",this.generateDate(),"this is a test"); //here add information about user and time
        db.addMessage(m);


        //TECHNICALLY CAN REMOVE ALL THIS
        var itemArray = this.state.items;
	    //itemArray.push(this._inputElement.value);
        if (this._inputElement.value == ""){ //if empty, don't create note
            e.preventDefault();
            return;
        }
	    itemArray.unshift({ //newest message at top
	        text: this._inputElement.value,
	        time: this.generateDate(),
            user: "Kristen", //replace with user's name
	        key: this.generateId()} //should replace this with apartment id
	    );

    	this.setState({items: itemArray});
        //REMOVE TO HERE
    	this._inputElement.value="";
    	e.preventDefault();

    }

    /**
     * Generates an ID.
     *
     * @method generateID
     * @return {int} - The generated ID
     */
    generateId() {
        return Math.floor(Math.random() * 90000) + 10000;
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


    /*handleRemove(key){
	var itemArray = this.state.items;
	itemArray = itemArray.filter(function (el){
	        return el.key !== key;
            }
	)
	this.setState({items: itemArray});
    }*/

    /**
     * Renders a To-Do Item.
     *
     * @method render
     */
    render() {
        var db = new dbManager();
        var todoEntries = db.getMessages();
        function createMessages(item){
            return(
                <li key={item.key}>
                    {item.text}
                    <div className="poster">
                        {item.user} - {item.time}
                    </div>
                </li>
            );
        }
        var listItems = todoEntries.map(createMessages);
    	return (
    	    <div className="todoMain">
    		<div className="header">
    		    <form onSubmit={this.addItem}>
    			<input ref={(a) => this._inputElement = a} //inputElement property stores reference to input element
    			    placeholder="Enter note">
    			</input>
    			<button type="submit">+</button>
    		    </form>
    		</div>
                <div className="items">
    		      {<ToDoItem entries={this.state.items}/>}
                </div>
                <div>
                    {listItems}
                </div>
    	    </div>
    	);
    }
}

//SHOULD REPLACE ToDoItem WITH {listItems} 


