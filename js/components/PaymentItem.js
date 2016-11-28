import React from 'react';
import ReactDOM from 'react-dom';
import Payment from '../Payment.js';

/**
 * Represents the Payments page.
 *
 * @class React.Component.PaymentsComponent
 * @extends React.Component
 */
export default class PaymentItem extends React.Component{
    /**
     * Constructs a Payment Item.
     *
     * @method constructor
     * @constructor
     * @param {Payment} props - Properties passed by parent
     */
    constructor(props) {
        super(props);
    };

    /**
     * Renders a Payments Item.
     *
     * @method render
     */
    render() {
        var payments = this.props.payments;
        function createPayments(payment){
            return (
                <li key={payment.getLoaner()}>
                    {payment.getPaymentDescription()}
                    <div className="poster">
                        {payment.getLoanee()}
                    </div>
                </li>
            );
        }
        var listPayments = payments.map(createPayments);

        return(
            <ul className="theList">
                 {listPayments}
            </ul>
        );
    }
}
