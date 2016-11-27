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

import PaymentForm from '../../components/PaymentForm.js';
import MessageForm from '../../components/MessageForm.js';
import ChoreForm from '../../components/ChoreForm.js';

const style = {

  button: {
    margin: 40,
    position:'fixed',
    right:0,
    bottom:0,
    zIndex:10,
    transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
  },

  popover: {
    backgroundColor:'rgba(102,67,167,0.45)',
  },

  editorVisible: {
    margin: 100,
    position:'fixed',
    right:0,
    bottom:0,
    zIndex:10,
    transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
  },

  editorInvisible: {
    margin: 100,
    position:'fixed',
    right:0,
    bottom:-512,
    zIndex:10,
    transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
  },
};

/*
 * Default size and `mini` FABs, in primary (default), `secondary` and `disabled` colors.
 */
/**
 * Represents a Floating Action Button.
 *
 * @class React.Component.FAB
 * @extends React.Component
 */
 export default class FAB extends React.Component {

   static muiName = 'FloatingActionButton';

   /**
    * Constructs a Floating Action Button.
    *
    * @method constructor
    * @constructor
    * @param {Object} props - Properties passed by parent
    */
   constructor(props) {
     super(props);
     this.state = {
       open: false,
       editView: null,
       editorPosition: style.editorInvisible,
     };
   }

   /**
    * Handles touch tap event.
    *
    * @method handleTouchTap
    * @param {Event} event - The event triggered on touch tap
    */
   handleTouchTap = (event) => {
     // This prevents ghost click.
     event.preventDefault();
     this.setState({
       open: true,
       anchorEl: event.currentTarget,
     });
   };

   /**
    * Handles request to close Floating Action Button
    *
    * @method handleRequestClose
    */
   handleRequestClose = () => {
     this.setState({
       open: false,
     });
   };

    /**
     * Renders a Floating Action Button.
     *
     * @method render
     */
    render() {
        var _icon = null;
        var _color = null;
        var _view = null;
        if (this.props.view == 1) {
          _icon  = <ContentSend />
          _color = colors.message
          _view = <MessageForm />
        }
        else if (this.props.view == 2) {
          _icon  = <EventNote />
          _color = colors.chore
          _view = <ChoreForm />
        }
        else if (this.props.view == 3) {
          _icon  = <AttachMoney />
          _color = colors.payment
          _view  = <PaymentForm />
        }
        return (
          <div>

          <FloatingActionButton backgroundColor={_color} style={style.button} onTouchTap={this.handleTouchTap}>
            {_icon}
          </FloatingActionButton>
          <Popover
            zDepth={5}
            open={this.state.open}
            anchorEl={this.state.anchorEl}
            anchorOrigin={{horizontal: 'left', vertical: 'top'}}
            targetOrigin={{horizontal: 'right', vertical: 'bottom'}}
            onRequestClose={this.handleRequestClose}
            className="blurred-more rounded-more"
            style={style.popover}
          >
          {_view}
          </Popover>
          </div>
        );
    }
}
// // <Create />
// <Menu>
// <MessageEditor />
// </Menu>
//<MessageEditor style={this.state.editorPosition} />
// <MenuItem primaryText="New Message" onTouchTap={function(){this.messageEditor()}.bind(this)} rightIcon={<ContentSend color={colors.message}/>}/>
// <MenuItem primaryText="New Payment" onTouchTap={function(){this.setState({editView: <editPayment />});console.log('editPayment');}.bind(this)} rightIcon={<AttachMoney color={colors.payment}/>}/>
// <MenuItem primaryText="Add Chore"   onTouchTap={function(){this.setState({editView: <editChore   />});console.log('editChore');  }.bind(this)} rightIcon={<EventNote   color={colors.chore}  />}/>
