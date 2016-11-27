import React from 'react';
import ReactDOM from 'react-dom';
import PaymentForm from './PaymentForm.js';
import Balance from './Balance.js';

/**
 * Represents the Payments page.
 *
 * @class React.Component.PaymentsComponent
 * @extends React.Component
 */
export default class PaymentComponent extends React.Component{
    /**
     * Constructs the Payments page.
     *
     * @method constructor
     * @constructor
     */
    constructor() {
        super();
    };

    /**
     * Renders the Payments page.
     *
     * @method render
     */
    render(){
        return (
            <div>
                <h1> Payments </h1>
                    <h2> Add a Payment </h2>
                        <PaymentForm />
                    <h2> Balances </h2>
                        <Balance />
            </div>
	   );
    }
}
