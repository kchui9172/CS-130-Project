import React from 'react';
import ReactDOM from 'react-dom';
import DBManager from '../dbManager.js';
import User from '../User.js';
import Payment from '../Payment.js';

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
        this.state = { balance0: [], balance1: [], balance2:[], balance3:[], balance4:[], tenants: [] };
        this.calculateBalance = this.calculateBalance.bind(this);
    };

    sortPayments(payments){
        console.log("sorting payments");
        console.log(payments); //shows all payments for a user
        console.log(this.state.tenants); //shows all tenants in apartment
        console.log("tis is it: ",payments[0]);
        for (var i = 0; i < payments.length; i++){
            //go through each payment and assign to particular balance
            console.log("what is this");
            if (payments[i].getLoaner() == "roommateLoaner1"){
                console.log("add to loaner1's balance");
            }
            else{
                console.log("repeat with else-if statements to check other tenants");
            }
        }
        console.log("done sorting");
    }

    /**
     *Calculate balances that user owes or is owed here!
     *
     *@method calculateBalance
     *@return balance
    */

    calculateBalance(){
        console.log("calculating balance");
        var manager = new DBManager();

        //get all payments associated with user
        manager.getPaymentIDs().then(function(payments){
            //get all tenants of apartment
            manager.getApartment().then(function (apt){
                var tenants = apt.getTenantIDs();
                console.log("Tenants: ",tenants);
                console.log("num tenants: ",tenants.length);
                var tenantArray = [];
                //create tenant array: match position of tenant in tenant array with balancex which stores payments related to that user
                for (var i = 0; i < tenants.length; i++){
                    console.log("meow");
                    console.log(tenants[i]);
                    tenantArray.unshift(tenants[i]);
                    this.setState({tenants: tenantArray});
                }
                console.log("what");

                //call function that sorts through all payments of user
                this.sortPayments(payments);

            }.bind(this))
        }.bind(this));


        // create 2 arrays:
        //     Array1 = holds total balance of owed/owe between two ppl (position corresponds to roommate)
        //     Array2 = holds description of balance owed/owe (description of payment and amount) between two ppl (position corresponds to rommate)
        //     render per roommate
        // */
        return (
            <div>
                <p>Your current balance:</p>
                <p>Balance between you and Roommate 1: </p>
                <p>Balance between you and Roommate 2: </p>
                <p>Balance between you and Roommate 3: </p>
            </div>
        );
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
            <div> {this.state.balances} </div>
        );
    }
}
