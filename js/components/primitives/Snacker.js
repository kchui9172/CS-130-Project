import React from 'react';
import ReactDOM from 'react-dom';
import Snackbar from 'material-ui/Snackbar';
import RaisedButton from 'material-ui/RaisedButton';
import {purple_light} from '../../config/MUI.js';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class Snacker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handleTouchTap = () => {
    this.setState({
      open: true,
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    return (
        <Snackbar
          open={this.state.open}
          message={this.props.statement}
          autoHideDuration={4000}
          onRequestClose={this.props.onClose}
        />
    );
  }
}

export const snack = (message,time) => {

  ReactDOM.render(
    <MuiThemeProvider muiTheme={purple_light} >
      <Snacker />
    </MuiThemeProvider>,document.querySelector('#snacker')
  );
}
