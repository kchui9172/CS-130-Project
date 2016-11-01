import React from 'react';
import ReactDOM from 'react-dom';
import ToDoItem from './ToDoItem.jsx';

class TodoList extends React.Component {
	constructor() { 
		super();
      	
      	this.state = {	
      		items: []
      	}
   		
   		this.addItem = this.addItem.bind(this);
   		//this.handleRemove = this.handleRemove.bind(this);

      //this.setStateHandler = this.setStateHandler.bind(this);
      //this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
      //this.findDomNodeHandler = this.findDomNodeHandler.bind(this);
   };

	addItem(e){
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
		this._inputElement.value="";
		e.preventDefault();
	}

	generateId(){
		return Math.floor(Math.random() * 90000) + 10000;
	}

	generateDate(){
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
	
	render(){
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
                <div class="items">
				    <ToDoItem entries={this.state.items}/>
                </div>
			</div>
		);
	}
}


export default TodoList;

//removeNode={this.handleRemove}
