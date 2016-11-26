import 'css/index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/index.js';
import {purple_light} from './config/MUI.js';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


import MessageComponent from './components/MessageComponent';
import ChoreComponent from './components/ChoreComponent';
import PaymentComponent from './components/PaymentComponent';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

ReactDOM.render(
  <MuiThemeProvider muiTheme={purple_light} >
    <App />
  </MuiThemeProvider>,
    document.querySelector('#app')
);

// ReactDOM.render(
//   <MuiThemeProvider muiTheme={purple_light} >
//     <MessageComponent />
//   </MuiThemeProvider>,
//   document.querySelector('.messages')
// );
//
// ReactDOM.render(
//   <MuiThemeProvider muiTheme={purple_light} >
//     <ChoreComponent />
//   </MuiThemeProvider>,
//   document.querySelector('.chores')
// );
//
// ReactDOM.render(
//   <MuiThemeProvider muiTheme={purple_light} >
//     <PaymentComponent />
//   </MuiThemeProvider>,
//   document.querySelector('.payments')
// );
