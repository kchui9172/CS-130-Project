import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

import Time from 'react-time';
import Chip from 'material-ui/Chip';
import Message from '../../../Message.js';
import {colors} from '../../../config/MUI.js';
import DBManager from '../../../dbManager.js';
import Loading from '../../primitives/Loading.js';

const style={
  card:{
    padding:'0px',
    overflow:'hidden',
  },
  loading:{
    textAlign:'center',
    padding:'128px',
  },
  table: {
    height:'512px',
    overflow:'hidden',
    padding:'0px',
  },
  header:{
    fontSize:'24px',
    fontWeight:'bold',
    backgroundColor:'rgba(101, 86, 177, 0.80)',
    color:'white',
  },
};
/**
 * Represents a Messages Table.
 *
 * @class React.Component.Messagesable
 * @extends React.Component
 */
class MessagesTable extends React.Component {
    /**
     * Constructs a MessagesTable.
     *
     * @method constructor
     * @constructor
     * @param {Object} props - Properties passed by parent
     */
    constructor(props) {
        super(props);
    }

    /**
     * Creates a row for a Message.
     *
     * @method composeRow
     * @param {Message} message - The message
     * @return {Object} - A renderable component
     */
    composeRow(message) {
        var date = new Date(message.getTimeSent());
        return (
          <TableRow  className='transparent'>
            <TableRowColumn>{message.getSender()}</TableRowColumn>
            <TableRowColumn><Chip backgroundColor={colors.timestamp} ><Time value={date} format="YYYY/MM/DD hh:mm a"/></Chip></TableRowColumn>
            <TableRowColumn>{message.getText()    }</TableRowColumn>
          </TableRow>
        );
    }

    /**
     * Renders a Messages Table.
     *
     * @method render
     */
    render() {
      var messageEntries = this.props.messages;
      var messageItems = (messageEntries && messageEntries.length!=0) ? messageEntries.map(this.composeRow) : (<Loading style={style.loading}/>);
        return (
          <Table className='rounded transparent'  height={style.table.height} fixedHeader={true} >
            <TableHeader displaySelectAll={false} adjustForCheckbox={false} style={style.header}  className='transparent frosted'>
              <TableRow >
                <TableHeaderColumn tooltip="The Sender"><h3>Sender</h3></TableHeaderColumn>
                <TableHeaderColumn tooltip="Creation Time"><h3>Time Sent</h3></TableHeaderColumn>
                <TableHeaderColumn tooltip="Content"><h3>Content</h3></TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false} showRowHover={true} preScanRows={false} className='transparent'>
              {messageItems}
            </TableBody>
          </Table>
        );
    }
}

/**
 * Represents a Messages Card.
 *
 * @class React.Component.MessagesCard
 * @extends React.Component
 */
export default class MessagesCard extends React.Component {
  /**
   * Constructs a Messages Card.
   *
   * @method constructor
   * @constructor
   * @param {Object} props - Properties passed by parent
   */
  constructor(props) {
      super(props);
      this.state = {
          messages: [],
      }
  }

  /**
   * Fetches messages from the database.
   *
   * @method fetchMessages
   */
  fetchMessages() {
    var newMessages = [];
    var db = new DBManager();
    this.setState({messages: newMessages});
    var Promise_MessageIDs = db.getMessageIDs();
    Promise_MessageIDs.then(function(IDs) {
      IDs.forEach(function (ID) {
        db.getMessage(ID).then(function(message){
          db.getUser(message.getSender()).then(function(user){
            var readableMessage = new Message(user.getName(), null, message.getTimeSent(), message.getText());
            newMessages.unshift(readableMessage);
            this.setState({messages: newMessages});
            console.log('getMessage:', message);
          }.bind(this),function(err){
          console.log('getReadableUserFailed:', err);
          this.setState({messages: newMessages});
          console.log('getMessage:', message);
        });
        }.bind(this),function(err){console.log('getMessageFailed:', err);});
      }.bind(this));
    }.bind(this));
  }

  /**
   * Function called when the component mounts.
   *
   * @method componentDidMount
   */
  componentDidMount() {
    this.fetchMessages();
  }

  /**
   * Renders a Messages Card.
   *
   * @method render
   */
  render() {
  return(
    <Card className='rounded blurred' style={style.card}>
      <MessagesTable messages={this.state.messages}/>
    </Card>
    );
  }
};
