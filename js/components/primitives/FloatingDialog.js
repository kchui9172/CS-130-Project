import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';

const style = {
  card: {
    zDepth_onBlur:1,
    zDepth_onFocus: 5,
    padding: '20px',
    textAlign: 'center',
    borderRadius: '16px',
  },
};

export default class FloatingDialog extends Component {
  static muiName = 'Dialog';

  constructor(props, context) {
      super(props, context);
      // this.state = {
      //     zDepth: style.zDepth_onBlur,
      // };
    }

  // onMouseOver = () => this.setState({zDepth:style.card.zDepth_onFocus});
  // onMouseOut = () => this.setState({zDepth:style.card.zDepth_onBlur});

  render() {
      return (
        <Dialog contentStyle={style.card} {...this.props} />
      );
    }
};
