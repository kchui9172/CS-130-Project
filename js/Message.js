export default class Message {
    // sender: string (userID)
    // timeSent: date obj?
    
    /**
    * Represents a message
    * @param {string} sender - user id of message creator
    * @param {string} timeSent - time stamp of when message was sent
    * @param {text} text - actual text of message
    * @constructor
    */
    constructor(sender, timeSent, text) {
        this._sender = this.;
        this._timeSent = timeSent;
        this._text = text;
        this._sent = false;
        this._aptID = getUser().getAptID();
    }

    /**
    * Function that shows message has been successful posted
    */
    confirmSend() { this._sent = true; }

    /**
    * Returns user id in string form of creator of message
    */
    getSender() { return this._sender; }

    /**
    * Returns time stamp in string form of when message was posted
    */
    getTimeSent() { return this._timeSent; }

    /**
    * Returns text of message posted
    */
    getText() { return this._text; }
}
