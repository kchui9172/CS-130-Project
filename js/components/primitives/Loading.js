import React, {Component, PropTypes} from 'react';
import CircularProgress from 'material-ui/CircularProgress';


const size = 80;
const thickness = 7;

export default class Loading extends React.Component {
  static muiName = 'CircularProgress';

  constructor(props) {
    super(props);
  }

  render() {
    return (<CircularProgress size={size} thickness={thickness} {...this.props} />);
  }
}
