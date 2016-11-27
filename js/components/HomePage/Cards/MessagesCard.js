import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

import DBManager from '../../../dbManager.js';
import Message from '../../../Message.js';

class MessagesTable extends React.Component {
    /**
     * Constructs a MessagesTable
     *
     * @method constructor
     * @constructor
     */
    constructor(props) {
        super(props);
    }

    composeRow(message) {
        return (
          <TableRow>
            <TableRowColumn>{message.getSender()  }</TableRowColumn>
            <TableRowColumn>{message.getTimeSent()}</TableRowColumn>
            <TableRowColumn>{message.getText()    }</TableRowColumn>
          </TableRow>
        );
    }

    /**
     * Renders a MessagesTable
     *
     * @method render
     */
    render() {
      var messageEntries = this.props.messages;
      console.log(messageEntries);
      var messageItems = (messageEntries) ? messageEntries.map(this.composeRow) : null;
        return (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHeaderColumn tooltip="The Sender">Sender</TableHeaderColumn>
                <TableHeaderColumn tooltip="The Name">Time Sent</TableHeaderColumn>
                <TableHeaderColumn tooltip="Content">Content</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody>
              {messageItems}
            </TableBody>
          </Table>
        );
    }
}

export default class MessagesCard extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
          messages: [],
      }
  }

  fetchMessages() {
    var newMessages = [];
    var db = new DBManager();
    this.setState({messages: newMessages});
    var Promise_MessageIDs = db.getMessageIDs();
    Promise_MessageIDs.then(function(IDs) {
      IDs.forEach(function (ID) {
        db.getMessage(ID).then(function(message){
          newMessages.unshift(message);
          this.setState({messages: newMessages});
          console.log('getMessage:', message);
        }.bind(this),function(err){console.log('getMessageFailed:', err);});
      }.bind(this));
    }.bind(this));
  }

  componentDidMount() {
    this.fetchMessages();
  }

  render() {
  return(
    <Card className='rounded blurred'>
      <CardText>
        <MessagesTable messages={this.state.messages}/>
      </CardText>
    </Card>
    );
  }
};
