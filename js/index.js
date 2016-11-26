//import '../css/index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {cyan500,cyan700,grey400,grey500,grey300,darkBlack,fullBlack, white} from 'material-ui/styles/colors';

import App from './components/index.js';
import MessageComponent from './components/MessageComponent';
import ChoreComponent from './components/ChoreComponent';
import PaymentComponent from './components/PaymentComponent';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const muiTheme = getMuiTheme({
  palette: {
    textColor: '#283c46',    // dirty-blue-black
    accent1Color: '#3cb371', // green
    accent2Color: '#80cbc4', //'#856ec6',//'#ACE7EF', // cyan
    primary3Color: grey400,
    primary1Color: 'rgba(101, 86, 177, 0.80)',//;'rgba(133, 110, 198, 0.85 )',//'#856ec6',  // lighter - purple
    primary2Color: '#715ea8', // purple
    accent3Color: grey500,
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey300,
    pickerHeaderColor: cyan500,
    shadowColor: fullBlack,
  },
  appBar: {
  height: 56,
  },
});

ReactDOM.render(
  <MuiThemeProvider muiTheme={muiTheme} >
    <App />
  </MuiThemeProvider>,
    document.querySelector('#app')
);

ReactDOM.render(
  <MuiThemeProvider muiTheme={muiTheme} >
    <MessageComponent />
  </MuiThemeProvider>,
  document.querySelector('.messages')
);

ReactDOM.render(
  <MuiThemeProvider muiTheme={muiTheme} >
    <ChoreComponent />
  </MuiThemeProvider>,
  document.querySelector('.chores')
);

ReactDOM.render(
  <MuiThemeProvider muiTheme={muiThemes} >
    <PaymentComponent />
  </MuiThemeProvider>,
  document.querySelector('.payments')
);
