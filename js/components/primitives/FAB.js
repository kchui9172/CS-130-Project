import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Create from 'material-ui/svg-icons/content/create';

import ContentSend from 'material-ui/svg-icons/content/send';
import AttachMoney from 'material-ui/svg-icons/editor/attach-money';
import EventNote from 'material-ui/svg-icons/notification/event-note';

import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import {List, ListItem} from 'material-ui/List';

const style = {
  button: {
    margin: 20,
    position:'fixed',
    right:0,
    bottom:0,
    zIndex:10,
  },
  popover: {
    backgroundColor:'rgba(102,67,167,0.45)',
  },
};

/**
 * Default size and `mini` FABs, in primary (default), `secondary` and `disabled` colors.
 */
 export default class FAB extends React.Component {

   static muiName = 'FloatingActionButton';

   constructor(props) {
     super(props);
     this.state = {
       open: false,
     };
   }

   handleTouchTap = (event) => {
     // This prevents ghost click.
     event.preventDefault();

     this.setState({
       open: true,
       anchorEl: event.currentTarget,
     });
   };

   handleRequestClose = () => {
     this.setState({
       open: false,
     });
   };


    render() {
        return (
          <div>
          <FloatingActionButton secondary={true} style={style.button} {...this.props} onTouchTap={this.handleTouchTap}>
            <Create />
          </FloatingActionButton>
          <Popover
            open={this.state.open}
            anchorEl={this.state.anchorEl}
            anchorOrigin={{horizontal: 'left', vertical: 'top'}}
            targetOrigin={{horizontal: 'right', vertical: 'bottom'}}
            onRequestClose={this.handleRequestClose}
            className="blurred rounded"
            style={style.popover}
          >
            <Menu>
              <MenuItem primaryText="New Message" rightIcon={<ContentSend/>}/>
              <MenuItem primaryText="New Payment" rightIcon={<AttachMoney/>}/>
              <MenuItem primaryText="Add Chore"   rightIcon={<EventNote/>}/>
            </Menu>
          </Popover>
          </div>
        );
    }
}
