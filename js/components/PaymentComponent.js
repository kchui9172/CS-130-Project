import React from 'react';
import ReactDOM from 'react-dom';
import PaymentForm from './PaymentForm.js';
import Balance from './Balance.js';
import Payment from '../Payment.js';
import DBManager from '../dbManager.js';
import PaymentList from './PaymentList.js';

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
     render() {
         return (
             <div>
                 <h1> Payments</h1>
                 <PaymentList  />
             </div>
         );
     }
}
