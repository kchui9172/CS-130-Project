import React from 'react';
import Drawer from 'material-ui/Drawer';

const style = {
  drawer: {
    zIndex: '998',
    position: 'absolute',
  },
};

export default class NavDrawer extends React.Component {

  static muiName = 'Drawer';

  constructor(props) {
      super(props);
      this.state = {
          styles: {width:'56px'},
      };
    }

  onMouseOver = () => {this.setState({styles: {width:'256px',transition: 'width 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',}})};
  onMouseOut  = () => {this.setState({styles: {width:'56px',transition: 'width 250ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',}})};

  render() {
    return (
        <div onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut}>
        <Drawer containerClassName="blurred" style={style.drawer} open={true} containerStyle={this.state.styles}  {...this.props}  />
        </div>
    );
  }
}
