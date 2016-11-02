import React from 'react';
import ReactDOM from 'react-dom';
import TodoList from './TodoList.jsx';
import ToDoItem from './ToDoItem.jsx';
import {Row} from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import {Button} from 'react-bootstrap';

class Messages extends React.Component{
	constructor() { 
		super();
   };

   render(){
   		return (
   			<div classname="messageClass">
   				<Button bsStyle="primary">Back</Button>

   				<div className="messageTitle">
   					<h1>Messages</h1>
   				</div>

   				<Row className="show-grid">
   					<Col sm={4} className="mCol">
   						<div className="inner-col">
   							<h2>Groceries</h2>
   							<div class="list1">
   								<TodoList l1/>
   							</div>
   						</div>
   					</Col>
   					<Col sm={4} className="mCol">
   					 	<div className="inner-col">
   							<h2>Meetings</h2>
   							<div class="list2">
   								<TodoList l2/>
   							</div>
   						</div>
   					</Col>
   					<Col sm={4} className="mCol">
   					   	<div className="inner-col">
   							<h2>Misc</h2>
   							<div class="list3">
   								<TodoList l3/>
   							</div>
   						</div>
   					</Col>
   				</Row>
   			</div>
		);
   }
}

export default Messages;

/*

<div class="row">
   					<div class="col-sm-4">
   						<div class="inner-col">
   							<h2>Groceries</h2>
   								<div class="list1">
   									<ToDoList list1 />
   								</div>
   							</h2>
   						</div>
   					</div>
   				</div>

*/