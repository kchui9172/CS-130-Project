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
   		this.handleRemove = this.handleRemove.bind(this);

      //this.setStateHandler = this.setStateHandler.bind(this);
      //this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
      //this.findDomNodeHandler = this.findDomNodeHandler.bind(this);
   };

	addItem(e){
		var itemArray = this.state.items;
		//itemArray.push(this._inputElement.value);
		itemArray.push({
			text: this._inputElement.value,
			time: Date.now(),
			//later add functionality of user that added this message
			key: this.generateId()}
			);
		
		this.setState({items: itemArray});
		this._inputElement.value="";
		e.preventDefault();
	}

	generateId(){
		return Math.floor(Math.random() * 90000) + 10000;
	}

	
	handleRemove(key){
		var itemArray = this.state.items;
		itemArray = itemArray.filter(function (el){
			return el.key !== key;
        }
		)
		this.setState({items: itemArray});
	}
	
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
                        
				<ToDoItem entries={this.state.items} removeNode={this.handleRemove}/>
			</div>
		);
	}
}


export default TodoList;

