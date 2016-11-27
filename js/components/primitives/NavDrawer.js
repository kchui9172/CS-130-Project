import React from 'react';
import Drawer from 'material-ui/Drawer';

const style = {
  drawer: {
    zIndex: '998',
    position: 'absolute',
  },
};

/**
 * Represents a Navigation Drawer.
 *
 * @class React.Component.NavDrawer
 * @extends React.Component
 */
export default class NavDrawer extends React.Component {

  static muiName = 'Drawer';

  /**
   * Constructs a Navigation Drawer
   *
   * @method constructor
   * @constructor
   * @param {Object} props - Properties passed by parent
   */
  constructor(props) {
      super(props);
      this.state = {
          styles: {width:'56px'},
      };
    }

  /**
   * Handles event where mouse moves over Navigation Drawer.
   *
   * @method onMouseOver
   */
  onMouseOver = () => {this.setState({styles: {width:'256px',transition: 'width 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',}})};
  
  /**
   * Handles event where mouse moves out of Navigation Drawer.
   *
   * @method onMouseOut
   */
  onMouseOut  = () => {this.setState({styles: {width:'56px',transition: 'width 250ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',}})};

  /**
   * Renders a Navigation Drawer.
   *
   * @method render
   */
  render() {
    return (
        <div onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut}>
        <Drawer containerClassName="blurred" style={style.drawer} open={true} containerStyle={this.state.styles}  {...this.props}  />
        </div>
    );
  }
}
