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
        this.state = { balances: [] };
        this.calculateBalance = this.calculateBalance.bind(this);
    };

    /**
     *Calculate balances that user owes or is owed here!
     *
     *@method calculateBalance
     *@return balance
    */

    calculateBalance(){
        var manager = new DBManager();
        var owed = manager.getOwedPayments();
        var owe = manager.getOwePayments();
        var roommates = manager.getRoommates();
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
