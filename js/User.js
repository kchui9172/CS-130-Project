/**
 * Represents a User.
 *
 * @class User
 */
export default class User {
    /**
    * Constructs a User.
    *
    * @method constructor
    * @constructor
    * @param {string} email - The email of User
    * @param {string} firstName - The first name of the User
    * @param {string} lastName - The last name of the User
    * @param {string} phoneNumber - The phone number of the User
    */
    constructor(email, firstName, lastName, phoneNumber) {
            this._userID = null;
            this._email = email;
            this._firstName = firstName;
            this._lastName = lastName;
            this._phoneNumber = phoneNumber;
            this._aptID = null;
            this._messages = new Array(0);
            this._chores = new Array(0);
            this._payments = new Array(0);
    }

    /**
     * Creates a User from input JSON.
     *
     * @method JSONtoUser
     * @static
     * @param {string} - JSON representing a User
     * @return {User} - The User represented by the JSON
     */
    static JSONtoUser(data) {
        var user = new User();
        var JSONObj = JSON.parse(data);
        user._userID = JSONObj._userID;
        user._email = JSONObj._email;
        user._firstName = JSONObj._firstName;
        user._lastName = JSONObj._lastName;
        user._phoneNumber = JSONObj._phoneNumber;
        user._aptID = JSONObj._aptID;
        user._messages = JSONObj._messages;
        user._chores = JSONObj._chores;
        user._payments = JSONObj._payments;
        return user;
    }

    /**
     * Gets the name of the User (first and last names).
     *
     * @method getName
     * @return {string} - The first and last names of the User
     */
    getName() { return (this._firstName + ' ' + this._lastName); }

    /**
     * Gets the email of the User.
     *
     * @method getEmail
     * @return {string} - The email of the User
     */
    getEmail() { return this._email; }

    /**
     * Gets the ID of the User.
     *
     * @method getUserID
     * @return {string} - The User ID
     */
    getUserID() { return this._userID; }

    /**
     * Gets the Apartment ID.
     *
     * @method getAptID
     * @return {string} - The Apartment ID
     */
    getAptID() { return this._aptID; }

    /**
     * Gets the message IDs associated with the User.
     *
     * @method getMessageIDs
     * @return {array{string}} - The message IDs of the messages created by the User
     */
    getMessageIDs() { return this._messages; }

    /**
     * Gets the chore IDs associated with the User.
     *
     * @method getChoreIDs
     * @return {array{string}} - The chore IDs of all chores associated with the User
     */
    getChoreIDs() { return this._chores; }

    /**
     * Gets the payment IDs associated with User.
     *
     * @method getPaymentIDs
     * @return {array{string}} - The payment IDs of all payments associated with the User
     */
    getPaymentIDs() { return this._payments; }

    /**
     * Sets the User ID.
     *
     * @method setUserID
     * @param {string} userID - The new value of the User ID
     */
    setUserID(userID) { this._userID = userID; }

    /**
     * Sets the apartment ID.
     *
     * @method setAptID
     * @param {string} aptID - The new value of the apartment ID
     */
    setAptID(aptID) { this._aptID = aptID; }

    /**
     * Add message to messages array.
     *
     * @method addMessage
     * @param {string} messageID - The ID associated with message to be added
     */
    addMessage(messageID) { this._messages.push(messageID); }

    /**
     * Add chore to chores array.
     *
     * @method addChore
     * @param {string} choreID - The ID associated with chore to be added
     */
    addChore(choreID) { this._chores.push(choreID); }

    /**
     * Add payment to payments array.
     *
     * @method addPayment
     * @param {string} paymentID - The ID associated with payment to be added
     */
    addPayment(paymentID) { this._payments.push(paymentID); }
}
