import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {cyan500,cyan700,grey400,grey500,grey300,darkBlack,fullBlack, white} from 'material-ui/styles/colors';

import AuthPage from './js/components/AuthPage/Main.js';
import MessageComponent from './js/components/MessageComponent'
import NavBar from './js/components/NavBar.js';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const muiTheme = getMuiTheme({
  palette: {
    textColor: '#283c46',
    accent1Color: '#3cb371',
    accent2Color: '#ACE7EF',
    primary3Color: grey400,
    primary1Color: '#856ec6',
    primary2Color: '#715ea8',
    accent3Color: grey500,
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey300,
    //disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: cyan500,
    //clockCircleColor: fade(darkBlack, 0.07),
    shadowColor: fullBlack,
  },

  appBar: {
  height: 48,
  },

});

ReactDOM.render(
  <MuiThemeProvider muiTheme={muiTheme} >
    <NavBar/>
  </MuiThemeProvider>,
    document.querySelector('#appBar')
);

ReactDOM.render(
  <MuiThemeProvider muiTheme={muiTheme} >
    <AuthPage />
  </MuiThemeProvider>,
    document.querySelector('#content')
);

ReactDOM.render(
    <MessageComponent />,
    document.querySelector('.messages')
);

/** TODO: Please convert this to better CSS later **/
document.querySelector('#appBar').style.paddingBottom = '96px';
document.body.style.backgroundColor = '#a9b1b1';
document.body.style.margin = '0';
