import Payment from '../js/Payment.js'

import { assert } from 'chai';

describe("Payment", function() {
    it("can be converted from json", function() {
        var json = "{\"_paymentID\":\"-KXc7wDpqECwbBzoEFLR\",\"_amount\":\"$99.99\",\"_loaner\":\"jQlFVuLOLmUVVn20sLq5y1x9pzC2\",\"_loanee\":\"M8XJyl6bavb952DSa7MqbQUttFk2\",\"_dateLoaned\":\"2016-11-27T23:34:25.994Z\",\"_datePaid\":null,\"_dateDue\":\"12/13/2016\",\"_paymentDescription\":null,\"_paymentCategory\":\"Cable Bill for December\",\"_recurringPaymentPeriod\":\"Utilities\"}";
        var payment = Payment.JSONtoPayment(json);
        assert.isOk(payment);
        assert.equal(payment.getPaymentID(), "-KXc7wDpqECwbBzoEFLR");
    });

    var payment = new Payment(1.00, 'loaner', 'loanee', new Date(), new Date(), new Date(), 'description', 'category', 3);
    it("gets and sets payment id", function() {
        assert.isNull(payment.getPaymentID());
        payment.setPaymentID('id');
        assert.equal('id', payment.getPaymentID());
    });

    // TODO: write equivalent tests for remaining fields

    it("gets and sets amount", function() {
    });

    it("gets and sets loaner", function() {
    });

    it("gets and sets loanee", function() {
    });

    it("gets and sets date loaned", function() {
    });

    it("gets and sets date paid", function() {
    });

    it("gets and sets date due", function() {
    });

    it("gets and sets payment description", function() {
    });

    it("gets and sets payment category", function() {
    });

    it("gets and sets recurring payment period", function() {
    });
});
