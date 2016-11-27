import React, {Component, PropTypes} from 'react';
import CircularProgress from 'material-ui/CircularProgress';


const style={
  wrapper:{
    textAlign:'center',
  },
  content:{
    display: 'inline-block',
    padding:'16px',
  },
};
const size = 80;
const thickness = 7;

export default class Loading extends React.Component {
  static muiName = 'CircularProgress';

  constructor(props) {
    super(props);
  }

  render() {
    return (<div style={style.wrapper}><CircularProgress style={style.content} size={size} thickness={thickness} {...this.props} /></div>);
  }
}
