import React, {Component} from 'react';
import {Card} from 'material-ui/Card';

const style = {
  card: {
    zDepth_onBlur:1,
    zDepth_onFocus: 5,
    padding: '0px',
    textAlign: 'center',
    borderRadius: '6px',
  },
};

/** 
 * Represents a Floating Card
 *
 * @class React.Component.FloatingCard
 * @extends React.Component
 */
export default class FloatingCard extends Component {
  static muiName = 'Card';

  /**
   * Constructs a Floating Card
   *
   * @method constructor
   * @constructor
   * @param {Object} props - Properties passed by parent
   * @param {Object} context - Context passed by parent
   */
  constructor(props, context) {
      super(props, context);
      this.state = {
          zDepth: style.zDepth_onBlur,
      };
    }

  /**
   * Handles event where mouse is over Floatng Card.
   *
   * @method onMouseOver
   */
  onMouseOver = () => this.setState({zDepth:style.card.zDepth_onFocus});
  /**
   * Handles event where mouse moves out of Floating Card.
   *
   * @method onMouseOut
   */
  onMouseOut = () => this.setState({zDepth:style.card.zDepth_onBlur});

  /**
   * Renders a Floating Card.
   *
   * @method render
   */
  render() {
      return (
        <Card className="blurred" style={style.card} {...this.props}  onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut} zDepth={this.state.zDepth} />
      );
    }
};
