/**
 * Represents a Payment.
 *
 * @class Payment
 */
export default class Payment {
    /**
     * Represents a payment.
     *
     * @method constructor
     * @constructor
     * @param {double} amount - The amount owed in this payment
     * @param {string} loaner - The user id of the loaner of this payment
     * @param {string} loanee - The user id of the loanee of this payment
     * @param {Date} dateLoaned - The date the loan was made
     * @param {Date} datePaid - The date the loan was repaid
     * @param {Date} dateDue - The date the loan is to be repaid
     * @param {string} paymentDescription - Description of what the loan was for
     * @param {string} paymentCategory - What category this payment belongs to
     * @param {int} recurringPaymentPeriod - How often this payment is made
     */
    constructor(amount, loaner, loanee, dateLoaned, datePaid, dateDue, paymentDescription, paymentCategory, recurringPaymentPeriod) {
        this._amount = amount;
        this._loaner = loaner;
        this._loanee = loanee;
        this._dateLoaned = dateLoaned;
        this._datePaid = datePaid;
        this._dateDue = dateDue;
        this._paymentDescription = paymentDescription;
        this._paymentCategory = paymentCategory;
        this._recurringPaymentPeriod = recurringPaymentPeriod;
    }

    /**
     * Creates a Payment from input JSON.
     *
     * @method JSONtoPayment
     * @static
     * @param {string} - JSON representing a Payment
     * @return {Payment} - The Payment represented by the JSON
     */
    static JSONtoPayment(data) {
        var payment = new Payment();
        var JSONObj = JSON.parse(data);
        payment._amount = JSONObj._amount;
        payment._loaner = JSONObj._loaner;
        payment._loanee = JSONObj._loanee;
        payment._dateLoaned = JSONObj._dateLoaned;
        payment._datePaid = JSONObj._datePaid;
        payment._dateDue = JSONObj._dateDue;
        payment._paymentDescription = JSONObj._paymentDescription;
        payment._paymentCategory = JSONObj._paymentCategory;
        payment._recurringPaymentPeriod = JSONObj._recurringPaymentPeriod;
        return payment;
    }

    /**
     * Gets amount for this payment.
     *
     * @method getAmount
     * @return {double} - The amount owed
     */
    getAmount() { return this._amount; }

    /**
     * Gets loaner for this payment.
     *
     * @method getLoaner
     * @return {string} - The loaner in this payment
     */
    getLoaner() { return this._loaner; }

    /**
     * Gets loanee for this payment.
     *
     * @method getLoanee
     * @return {string} - The loaner in this payment
     */
    getLoanee() { return this._loanee; }

    /**
     * Gets date loaned for this payment.
     *
     * @method getDateLoaned
     * @return {Date} - The date this payment was loaned
     */
    getDateLoaned() { return this._dateLoaned; }

    /**
     * Gets date paid for this payment.
     *
     * @method getDatePaid
     * @return {Date} - The date this payment was paid
     */
    getDatePaid() { return this._datePaid; }

    /**
     * Gets date due for this payment.
     *
     * @method getDateDue
     * @return {Date} - The date this payment is due
     */
    getDateDue() { return this._dateDue; }

    /**
     * Gets this payment's description.
     *
     * @method getPaymentDescription
     * @return {string} - Description of payment
     */
    getPaymentDescription() { return this._paymentDescription; }

    /**
     * Gets this payment's category.
     *
     * @method getPaymentCategory
     * @return {string} - Category of payment
     */
    getPaymentCategory() { return this._paymentCategory; }

    /**
     * Gets this payment's recurring payment period.
     *
     * @method getPaymentPeriod
     * @return {int} - The recurring payment period
     */
    getPaymentPeriod() { return this._recurringPaymentPeriod; }

    /**
     * Sets the date the payment was repaid.
     *
     * @method setDatePaid
     * @param {Date} date
     * @return {void}
     */
    setDatePaid(date){
        this._datePaid = date;
    }

    /**
     * Sets the Loaner ID
     *
     * @method setLoanerID
     * @param {string} loanerID
     * @return {void}
     */
    setLoanerID(loanerID){
        this._loaner = loanerID;
    }

    /**
     * Sets the Loanee ID
     *
     * @method setLoaneeID
     * @param {string} loaneeID
     * @return {void}
     */
    setLoaneeID(loaneeID){
        this._loanee = loaneeID;
    }

}
