import React from 'react';
import ReactDOM from 'react-dom';
//import App from './App.jsx';
import TodoList from './TodoList.jsx';
import ToDoItem from './ToDoItem.jsx';
//import TodoBox from './TodoBox.jsx';

ReactDOM.render(<TodoList />, document.getElementById('list1'));
ReactDOM.render(<TodoList />, document.getElementById('list2'));
ReactDOM.render(<TodoList />, document.getElementById('list3'));


//ReactDOM.render(<TodoBox />, document.getElementById('todobox'));
//ReactDOM.render(<TodoItem />, document.getElementById('todoapp'));
