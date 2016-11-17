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

export default class FloatingCard extends Component {
  static muiName = 'Card';

  constructor(props, context) {
      super(props, context);
      this.state = {
          zDepth: style.zDepth_onBlur,
      };
    }

  onMouseOver = () => this.setState({zDepth:style.card.zDepth_onFocus});
  onMouseOut = () => this.setState({zDepth:style.card.zDepth_onBlur});

  render() {
      return (
        <Card style={style.card} {...this.props}  onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut} zDepth={this.state.zDepth} />
      );
    }
};
