import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRoute  } from 'react-router';
import { Navbar, Nav, NavItem} from 'react-bootstrap';

class Navigation extends React.Component{
	constructor() { 
		super();
   };

   render() {
      return (
         <div class="navigation">
            <Navbar>
               <Navbar.Header>
                  <Navbar.Brand>
                     <Link to="/">Rockmates</Link>
                  </Navbar.Brand>
               </Navbar.Header>
               <Nav>
                  <NavItem eventKey={1}><Link to="/Messages">Messages</Link></NavItem>
               </Nav>
               <Nav>
                  <NavItem eventKey={1}><Link to="/Payments">Payments</Link></NavItem>
               </Nav>
               <Nav>
                  <NavItem eventKey={1}><Link to="/Chores">Chores</Link></NavItem>
               </Nav>
            </Navbar>

            <div>               
              {this.props.children}
            </div>
         </div>
      );
   }}

export default Navigation;

