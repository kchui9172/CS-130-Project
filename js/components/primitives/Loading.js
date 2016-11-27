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

/**
 * Represents a Loading Page.
 *
 * @class React.Component.Loading
 * @extends React.Component
 */
export default class Loading extends React.Component {
  static muiName = 'CircularProgress';

  /**
   * Constructs a Loading Page.
   *
   * @method constuctor
   * @constructor
   * @param {Object} props - Properties passed by parent
   */
  constructor(props) {
    super(props);
  }

  /**
   * Renders a Loading Page.
   *
   * @method render
   */
  render() {
    return (<div style={style.wrapper}><CircularProgress style={style.content} size={size} thickness={thickness} {...this.props} /></div>);
  }
}
