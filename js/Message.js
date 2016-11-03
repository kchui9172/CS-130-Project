/**
 * Represents a Message.
 *
 * @class Message
 */
export default class Message { 
    /**
     * Represents a message.
     *
     * @method constructor
     * @constructor
     * @param {string} sender - The User ID of message creator
     * @param {Date} timeSent - The timestamp of when message was sent
     * @param {text} text - The actual text of message
     */
    constructor(sender, timeSent, text) {
        this._sender = this.;
        this._timeSent = timeSent;
        this._text = text;
        this._sent = false;
        this._aptID = getUser().getAptID();
    }

    /**
     * Updates Message to show that it has  been successful posted.
     *
     * @method confirmSend
     */
    confirmSend() { this._sent = true; }

    /**
     * Gets the user id of the creator of the Message.
     *
     * @method getSender
     * @return {string} - The user ID of the creator
     */
    getSender() { return this._sender; }

    /**
     * Gets the timestamp of when the Message was posted.
     *
     * @method getTimeSent
     * @return {Date} - The time when the Message was posted
     */
    getTimeSent() { return this._timeSent; }

    /**
     * Gets the text of Message.
     *
     * @method getText
     * @return {string} - The text of the Message
     */
    getText() { return this._text; }
}
