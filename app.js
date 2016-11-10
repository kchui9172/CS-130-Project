import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {cyan500,cyan700,grey400,grey500,grey300,darkBlack,fullBlack, white} from 'material-ui/styles/colors';

import Login from './js/components/Login'
import MessageComponent from './js/components/MessageComponent'

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
});

// const App = () => (
//     <MuiThemeProvider muiTheme={muiTheme} >
//         <Login />
//     </MuiThemeProvider>
// );

ReactDOM.render(
  <MuiThemeProvider muiTheme={muiTheme} >
    <Login />
  </MuiThemeProvider>,
    document.querySelector('.login')
);

ReactDOM.render(
    <MessageComponent />,
    document.querySelector('.messages')
);