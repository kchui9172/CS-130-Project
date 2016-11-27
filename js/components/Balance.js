import React from 'react';
import ReactDOM from 'react-dom';
import DBManager from '../dbManager.js';
import User from '../User.js';
import Payment from '../Payment.js';
import Transaction from './Transaction.js';

/**
 * Represents a Balance.
 *
 * @class React.Component.Balance
 * @extends React.Component
 */
export default class Balance extends React.Component {
    /**
     * Constructs a Balance.
     *
     * @method constructor
     * @constructor
     */
    constructor() {
        super();
        this.state = { balance: [], tenants: [] };
        this.calculateBalance = this.calculateBalance.bind(this);
    };


    /**
    * Sorts Payments related to User
    *
    * @method sortPayments
    * @param {Array[Payment]} - array of payments related to user
    */
    sortPayments(payments){
        console.log("sorting payments");
        console.log(payments); //shows all payments for a user
        console.log(this.state.tenants); //shows all tenants in apartment
        //go through each payment and assign to particular balance
        for (var i = 0; i < payments.length; i++){
            var pay = payments[i];
            for (var j = 0; j < this.state.tenants.length; j++){
                if (pay._loaner == this.state.tenants[j] || pay._loanee == this.state.tenants[j]){
                    //console.log("pushing");
                    //console.log(pay._amount);
                    this.state.balance[j].push(pay);
                }
            }
            //console.log(this.state.balance);
        }
        console.log("done sorting");
    }

    /**
     * Calculate balances that user owes or is owed here!
     *
     * @method calculateBalance
     * @return {decimal} - The balance
    */

    calculateBalance(){
        console.log("calculating balance");
        var manager = new DBManager();

        //get all payments associated with user
        manager.getPaymentIDs().then(function(payments){
            //get all tenants of apartment
            manager.getApartment().then(function (apt){
                console.log("payments: ",payments);
                var tenants = apt.getTenantIDs();
                console.log("Tenants: ",tenants);
                console.log("num tenants: ",tenants.length);
                var tenantArray = [];
                var balanceArray = [];
                //create tenant array: match position of tenant in tenant array with balancex which stores payments related to that user
                for (var i = 0; i < tenants.length; i++){
                    console.log("meow");
                    console.log(tenants[i]);
                    tenantArray.unshift(tenants[i]);
                    balanceArray[i] = [];
                    this.setState({tenants: tenantArray});
                    this.setState({balance: balanceArray});
                }
                console.log("what");

                //call function that sorts through all payments of user
                this.sortPayments(payments);

            }.bind(this))
        }.bind(this));
    }

    componentDidMount() {
      this.calculateBalance();
    }

    /**
     * Renders a Balance between two users.
     *
     * @method render
     */
    render() {
        return (
            <div> 
                <Transaction t={this.state.balance} />
            </div>
        );
    }
}
