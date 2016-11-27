import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';

const style = {
  card: {
    padding: '20px',
    textAlign: 'center',
    borderRadius: '16px',
  },
};

/**
 * Represents a Floating Dialog.
 *
 * @class React.Component.FloatingDialog
 * @extends React.Component
 */
export default class FloatingDialog extends Component {
  static muiName = 'Dialog';

  /**
   * Consturcts a Floating Dialog.
   *
   * @method constructor
   * @constructor
   * @param {Object} props - Properties passed by parent
   * @param {Object} context - Context passed by parent
   */
  constructor(props, context) {
      super(props, context);
      // this.state = {
      //     zDepth: style.zDepth_onBlur,
      // };
    }

  // onMouseOver = () => this.setState({zDepth:style.card.zDepth_onFocus});
  // onMouseOut = () => this.setState({zDepth:style.card.zDepth_onBlur});

  /**
   * Renders a Floating Dialog.
   *
   * @method render
   */
  render() {
      return (
        <Dialog contentClassName="dialogHack" contentStyle={style.card} {...this.props} />
      );
    }
};
