import React from 'react';
import ReactDOM from 'react-dom';
import TodoList from './TodoList.js';
import ToDoItem from './ToDoItem.js';

export default class Messages extends React.Component{
    constructor() {
        super();
    };

    render(){
        return (
            <TodoList/>
/*
            <div classname="messageClass">
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
*/
	);
    }
}
