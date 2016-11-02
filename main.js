import React from 'react';
import ReactDOM from 'react-dom';
import TodoList from './TodoList.jsx';
import ToDoItem from './ToDoItem.jsx';
import Messages from './messages.jsx';
import HomePage from './HomePage.jsx';
import Navigation from './Nav.jsx';
import Payments from './Payments.jsx';
import Chores from './Chores.jsx';
import { Router, Route, Link, browserHistory, IndexRoute  } from 'react-router';



ReactDOM.render((
   <Router history = {browserHistory}>
      <Route path = "/" component = {Navigation}>
         <IndexRoute component = {HomePage} />
         <Route path = "home" component = {HomePage} />
         <Route path = "messages" component = {Messages} />
         <Route path = "payments" component = {Payments} />
         <Route path = "chores" component = {Chores} />
      </Route>
   </Router>
	
), document.getElementById('nav'));