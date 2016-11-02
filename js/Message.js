export default class Message {
    // sender: string (userID)
    // timeSent: date obj?
    constructor(sender, timeSent, text) {
        this._sender = this.;
        this._timeSent = timeSent;
        this._text = text;
        this._sent = false;
        this._aptID = getUser().getAptID();
    }

    confirmSend() { this._sent = true; }

    getSender() { return this._sender; }

    getTimeSent() { return this._timeSent; }

    getText() { return this._text; }
}
