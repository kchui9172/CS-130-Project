export default class User {
    // email, firstName, lastName, phoneNumber, apartment: string
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
    // return string Name
    getName() { return (this._firstName + ' ' + this._lastName); }

    // return string Email
    getEmail() { return this._email; }

    // return string User ID
    getUserID() { return this._userID; }

    // return string Apartment ID
    getAptID() { return this._aptID; }

    // return array{Message IDs}
    getMessageIDs() { return this._messages; }

    // return array{Chore IDs}
    getChoreIDs() { return this._chores; }

    // return array{Payment IDs}
    getPaymentIDs() { return this._payments; }

    // userID: string
    setUserID(userID) { this._userID = userID; }

    // aptID: string
    setAptID(aptID) { this._aptID = aptID; }

    // messageID: string
    addMessage(messageID) { this._messages.push(messageID); }

    // choreID: string
    addChore(choreID) { this._chores.push(choreID); }

    // paymentID: string
    addPayment(paymentID) { this._payments.push(paymentID); }
}
