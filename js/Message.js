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
    constructor(sender, timeSent, text, aptID) {
        this._sender = sender;
        this._timeSent = timeSent;
        this._text = text;
        this._sent = false;
        this._aptID = aptID;
    }

    /**
     * Creates a User from input JSON.
     *
     * @method JSONtoUser
     * @static
     * @param {string} - JSON representing a User
     * @return {User} - The User represented by the JSOn
     */
    static JSONtoMessage(data) {
        var message = new Message();
        var JSONObj = JSON.parse(data);
        user._sender = JSONObj._sender;
        user._timeSent = JSONObj._timeSent;
        user._text = JSONObj._text;
        user._sent = JSONObj._sent;
        user._aptID = JSONObj._aptID;
        return message;
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
