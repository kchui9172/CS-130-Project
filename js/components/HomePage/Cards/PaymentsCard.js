import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

import Time from 'react-time';
import Chip from 'material-ui/Chip';
import Payment from '../../../Payment.js';
import User from '../../../User.js';
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
 * Represents a Payments Table.
 *
 * @class React.Component.PaymentsTable
 * @extends React.Component
 */
class PaymentsTable extends React.Component {
    /**
     * Constructs a PaymentsTable.
     *
     * @method constructor
     * @constructor
     * @param {Object} props - Properties passed by parent
     */
    constructor(props) {
        super(props);
    }

    /**
     * Creates a row for a Payment.
     *
     * @method composeRow
     * @param {Payment} payment - The payment
     * @return {Object} - A renderable component
     */
    composeRow(payment) {
        var date = new Date(payment.getDateDue());
        return (
          <TableRow  className='transparent'>
            <TableRowColumn><Chip backgroundColor={colors.timestamp} ><Time value={date} format="MM/DD hh:mm a"/></Chip></TableRowColumn>
            <TableRowColumn>{payment.getAmount()}</TableRowColumn>
            <TableRowColumn>{payment.getLoaner()}</TableRowColumn>
            <TableRowColumn>{payment.getLoanee()}</TableRowColumn>
            <TableRowColumn>{payment.getPaymentDescription()}</TableRowColumn>
          </TableRow>
        );
    }

    /**
     * Renders a Messages Table.
     *
     * @method render
     */
    render() {
      var paymentEntries = this.props.payments;
      var paymentItems = (paymentEntries && paymentEntries.length!=0) ? paymentEntries.map(this.composeRow) : (<Loading style={style.loading}/>);
        return (
          <Table className='rounded transparent'  height={style.table.height} fixedHeader={true} >
            <TableHeader displaySelectAll={false} adjustForCheckbox={false} style={style.header}  className='transparent frosted'>
              <TableRow >
                <TableHeaderColumn tooltip="Payment Deadline"><h3>Deadline</h3></TableHeaderColumn>
                <TableHeaderColumn tooltip="Amount"><h3>Amount</h3></TableHeaderColumn>
                <TableHeaderColumn tooltip="Loaner"><h3>Loaner</h3></TableHeaderColumn>
                <TableHeaderColumn tooltip="Loanee"><h3>Loanee</h3></TableHeaderColumn>
                <TableHeaderColumn tooltip="Details"><h3>Details</h3></TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false} showRowHover={true} preScanRows={false} className='transparent'>
              {paymentItems}
            </TableBody>
          </Table>
        );
    }
}

/**
 * Represents a Payments Card.
 *
 * @class React.Component.PaymentsCard
 * @extends React.Component
 */
export default class PaymentsCard extends React.Component {
  /**
   * Constructs a Payments Card.
   *
   * @method constructor
   * @constructor
   * @param {Object} props - Properties passed by parent
   */
  constructor(props) {
      super(props);
      this.state = {
          payments: [],
      }
  }

  /**
   * Fetches a Payment from the database.
   *
   * @method fetchPayment
   * @param {string} paymentID - The id of the payment to be fetched
   * @return {Payment} - The Payment object
   */
  fetchPayment(paymentID) {
      console.log("Fetching Payment: " + paymentID);
      var manager = new DBManager();
      var payment = manager.getPayment(paymentID);
      return payment.then(function (m_payment) {
          return manager.getUser(m_payment.getLoaner()).then(function (usr) {
              m_payment.setLoanerID(usr.getName());
              return manager.getUser(m_payment.getLoanee()).then(function (usr2) {
                  m_payment.setLoaneeID(usr2.getName());
                  return m_payment;
              });
          });
      });
  }

  /**
   * Fetches Payments from the database and sets state.
   *
   * @param {Array{String}} paymentIDs - payment ID's associated with User.
   * @method fetchPayments
   */
  fetchPayments(paymentIDs) {
      console.log("Fetching Payments");
      var paymentsArray = [];
      this.setState({payments: paymentsArray});
      for (var i = 0; i < paymentIDs.length; i++) {
          var payment = this.fetchPayment(paymentIDs[i]);
          payment.then(function (m_payment) {
              paymentsArray.push(m_payment);
              this.setState({payments: paymentsArray});
          }.bind(this));
      }
  }


 /**
  * Shows the Messages.
  *
  * @method showMessages
  */
 showPayments(){
     var manager = new DBManager();
     console.log("Getting Payments");
     manager.getPaymentIDs().then(function (messageIDs){
         this.fetchPayments(messageIDs);
     }.bind(this));
 }

  /**
   * Function called when the component mounts.
   *
   * @method componentDidMount
   */
   componentDidMount() {
       console.log("Working!!!");
       this.showPayments();
   }

  /**
   * Renders a Messages Card.
   *
   * @method render
   */
  render() {
  return(
    <Card className='rounded blurred' style={style.card}>
      <PaymentsTable payments={this.state.payments}/>
    </Card>
    );
  }
};
