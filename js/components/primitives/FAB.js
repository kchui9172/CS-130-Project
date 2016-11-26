import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Create from 'material-ui/svg-icons/content/create';

import ContentSend from 'material-ui/svg-icons/content/send';
import AttachMoney from 'material-ui/svg-icons/editor/attach-money';
import EventNote from 'material-ui/svg-icons/notification/event-note';

import {colors} from '../../config/MUI.js';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import {List, ListItem} from 'material-ui/List';

import editMessage from '../HomePage/Cards/MessageEditor.js';

const style = {

  button: {
    margin: 40,
    position:'fixed',
    right:0,
    bottom:0,
    zIndex:10,
  },

  popover: {
    backgroundColor:'rgba(102,67,167,0.45)',
  },

  editorview: {
    margin: 40,
    position:'fixed',
    right:0,
    bottom:0,
    zIndex:10,
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
       editView: null,
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
          <div style={style.editorview}>{this.state.editView}</div>
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
              <MenuItem primaryText="New Message" onTouchTap={function(){this.setState({editView: <editMessage />});console.log('editMessage');}.bind(this)} rightIcon={<ContentSend color={colors.message}/>}/>
              <MenuItem primaryText="New Payment" onTouchTap={function(){this.setState({editView: <editPayment />});console.log('editPayment');}.bind(this)} rightIcon={<AttachMoney color={colors.payment}/>}/>
              <MenuItem primaryText="Add Chore"   onTouchTap={function(){this.setState({editView: <editChore   />});console.log('editChore');  }.bind(this)} rightIcon={<EventNote   color={colors.chore}  />}/>
            </Menu>
          </Popover>
          </div>
        );
    }
}
