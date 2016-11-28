import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PaymentItem from './PaymentItem.js';
import Payment from '../Payment.js';
import User from '../User.js';
import DBManager from '../dbManager.js';

/**
 * Represents a Payments List.
 *
 * @class React.Component.PaymentsList
 * @extends React.Component
 */
 export default class PaymentList extends React.Component{
     /**
      * Constructs the Payments page.
      *
      * @method constructor
      * @constructor
      */
     constructor() {
         super();

         this.state = {
             payments: [],
             listPayments: {},
         }
     };

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
             return m_payment;
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
     * Function called when component mounts.
     *
     * @method componentDidMount
     */
    componentDidMount() {
        console.log("Working!!!");
        this.showPayments();
    }

    /**
     * Renders a Payments Item.
     *
     * @method render
     */
    render() {
    	return (
    	    <div className="todoMain">
            <div className="items">
    		      <PaymentItem payments={this.state.payments}/>
            </div>
    	    </div>
    	);
    }
}
