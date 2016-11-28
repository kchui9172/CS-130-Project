import React from 'react';
import ReactDOM from 'react-dom';
import TodoList from './TodoList.js';
import MessageForm from './MessageForm.js';

/**
 * Represents the Messages page.
 *
 * @class React.Component.Messages
 * @extends React.Component
 */
export default class Messages extends React.Component{
    /**
     * Constructs the Messages page.
     *
     * @method constructor
     * @constructor
     */
    constructor() {
        super();
    };

    /**
     * Renders the Messages page.
     *
     * @method render
     */
    render(){
        return (
            <div>
                <h1> Messages</h1>
                <MessageForm />
                <TodoList />
            </div>
	);
    }
}
