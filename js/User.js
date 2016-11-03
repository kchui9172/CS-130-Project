export default class User {
    /**
    * Represents a User
    * @param {string} email - email of user
    * @param {string} firstName - user's first name
    * @param {string} lastName - user's last name
    * @param {string} phoneNumber - user's phone number
    * @param {string} apartment - id of apartment user belongs to
    */
    constructor(email, firstName, lastName, phoneNumber, apartment) {
            this._userID = null;
            this._email = email;
            this._firstNname = firstName;
            this._lastName = lastName;
            this._phoneNumber = phoneNumber;
            this._aptID = apartment;
            this._messages = new Array(0);
            this._chores = new Array(0);
            this._payments = new Array(0);
    }
    /**
    * Returns user's name (first and last names) in string form
    */
    getName() { return (this._firstName + ' ' + this._lastName); }

    /** 
    * Return user's email in string form
    */
    getEmail() { return this._email; }

    /** 
    * Returns user's id in string form
    */
    getUserID() { return this._userID; }

    /** 
    * Returns apartment id in string form
    */
    getAptID() { return this._aptID; }

    /**
    * Returns array of message ids (each as string) associated with the user (messages created by user) 
    */
    getMessageIDs() { return this._messages; }

    /**
    * Return array of chore ids (each as string) belonging to user
    */
    getChoreIDs() { return this._chores; }

    /** 
    * Return array of payment ids (each as string) associated with user
    */
    getPaymentIDs() { return this._payments; }

    /**
    * Set user id 
    * @param {string} userID - value to set user's id to
    */
    setUserID(userID) { this._userID = userID; }

    /** 
    * Set apartment id
    * @param {string} aptID - value to set user's apartment id to 
    */
    setAptID(aptID) { this._aptID = aptID; }

    /** 
    * Add message (via message id) to messages array
    * @param {string} messageID - id associated with message to be added
    */
    addMessage(messageID) { this._messages.push(messageID); }

    /**
    * Add chore (via chore id) to chores array
    * @param {string} choreID - id associated with chore to be added
    */
    addChore(choreID) { this._chores.push(choreID); }

    /** 
    * Add payment (via payment id) to payments array
    * @param {string} paymentID - id associated with payment to be added 
    */
    addPayment(paymentID) { this._payments.push(paymentID); }
}
