import Message from '../js/Message.js'

import { assert } from 'chai';

describe("Message", function() {
    it("can be converted from json", function() {
        var json = "{\"_sender\":\"M8XJyl6bavb952DSa7MqbQUttFk2\",\"_aptID\":\"-KXc3TKTGn2MVIW3fqbR\",\"_messageID\":\"-KXc4QyY51Bp6Z_yDn9Y\",\"_timeSent\":\"2016-11-27T23:19:07.324Z\",\"_text\":\"Hello -KXc3TKTGn2MVIW3fqbR!\",\"_sent\":false}";
        var message = Message.JSONtoMessage(json);
        assert.isOk(message);
        assert.equal("-KXc4QyY51Bp6Z_yDn9Y", message.getMessageID());
    });

    var message = new Message('1', '1', new Date(), 'text');
    it("gets and sets message id", function() {
        assert.equal(null, message.getMessageID());
        message.setMessageID('2');
        assert.equal('2', message.getMessageID());
    });

    // TODO: write additional tests for getters and setters if wanted

    it("gets sender", function() {
    });

    it("gets time sent", function() {
    });

    it("gets text", function() {
    });
});
