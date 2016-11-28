import DBManager from './dbManager.js';
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
     * @param {string} userID - The ID of the user
     * @param {string} aptID - The ID of the apartment
     * @param {Date} timeSent - The timestamp of when message was sent
     * @param {text} text - The actual text of message
     */
    constructor(userID, aptID, timeSent, text) {
        this._sender = userID;
        this._aptID = aptID;
        this._messageID = null;
        this._timeSent = timeSent;
        this._text = text;
        this._sent = false;
    }

    /**
     * Creates a Message from input JSON.
     *
     * @method JSONtoMessage
     * @static
     * @param {string} - JSON representing a User
     * @return {Message} - The Message represented by the JSON
     */
    static JSONtoMessage(data) {
        var message = new Message();
        var JSONObj = JSON.parse(data);
        message._messageID = JSONObj._messageID;
        message._sender = JSONObj._sender;
        message._timeSent = JSONObj._timeSent;
        message._text = JSONObj._text;
        message._sent = JSONObj._sent;
        message._aptID = JSONObj._aptID;
        return message;
    }

    /**
     * Updates Message to show that it has  been successful posted.
     *
     * @method confirmSend
     */
    confirmSend() { this._sent = true; }


    /**
     * Gets the Message ID
     *
     * @method getMessageID
     * @return {string} - The ID of the message
     */
    getMessageID() { return this._messageID; }

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

    /**
     * Sets the Message ID
     *
     * @method setMessageID
     */
    setMessageID(messageID) { this._messageID = messageID; }
}
