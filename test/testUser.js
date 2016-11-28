import User from '../js/User.js';

import { assert } from 'chai';

describe("User", function() {
    it("can be converted from json", function() {
        var json = "{\"_userID\":\"GNfb868cZATuNgsI1kYLA1QxjWi2\",\"_email\":\"test@gmail.com\",\"_firstName\":\"first\",\"_lastName\":\"last\",\"_phoneNumber\":\"012-345-6789\",\"_aptID\":\"ASD77SDF70\",\"_payments\":[]}";
        var user = User.JSONtoUser(json);
        assert.equal("GNfb868cZATuNgsI1kYLA1QxjWi2", user.getUserID());
    });

    var user = new User('email', 'firstname', 'lastname', 'phonenumber');
    it("gets and sets user id", function() {
        assert.isNull(user.getUserID());
        user.setUserID('userid');
        assert.equal('userid', user.getUserID());
    });

    it("gets and sets apartment id", function() {
        assert.isNull(user.getAptID());
        user.setAptID('aptid');
        assert.equal('aptid', user.getAptID());
    });

    it("gets full name", function() {
        assert.equal("firstname lastname", user.getName());
    });

    it("gets and updates payment ids", function() {
        user.addPayment('1');
        assert.deepEqual(['1'], user.getPaymentIDs());
    });

    // TODO: write similar tests for remaining fields

    it("gets and sets email", function() {
    });

    it("gets and sets first name", function() {
    });

    it("gets and sets last name", function() {
    });

    it("gets and sets phone number", function() {
    });
});
