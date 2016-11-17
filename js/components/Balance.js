import React from 'react';
import ReactDOM from 'react-dom';
import DBManager from '../dbManager.js';
import User from '../User.js';
import Payment from '../Payment.js';

/**
 * Represents a PaymentForm.
 *
 * @class React.Component.PaymentForm
 * @extends React.Component
 */
export default class PaymentForm extends React.Component {
    /**
     * Constructs a Balance.
     *
     * @method constructor
     * @constructor
     */
    constructor() {
        super();
    };

// Calculate balances that user owes or is owed here!



    /**
     * Renders a Balance between two users.
     *
     * @method render
     */
    render() {
        return (
            <div>
                <li>Roommate 1 owes you $100 </li>
                <li>Roommate 2 owes you $30 </li>
                <li>You owe Roommate 3 $20</li>
            </div>
        );
    }
}





