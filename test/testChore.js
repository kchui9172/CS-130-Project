import Chore from '../js/Chore.js';
import { assert } from 'chai';

describe("Chore", function() {
    it("can be converted from json", function() {
        var json = "{\"_choreID\":\"-KXc7FVW20C9jlh-y4i9\",\"_category\":\"Testing the trash\",\"_createdBy\":\"r0SYYxjvlSVUlDiuczenbqynh243\",\"_aptID\":\"-KXc3TKTGn2MVIW3fqbR\",\"_deadline\":\"2016-12-16T23:31:27.606Z\",\"_details\":\"I love CS 130 so much.\",\"_assignedTo\":\"r0SYYxjvlSVUlDiuczenbqynh243\",\"_createdOn\":\"2016-11-27T23:31:27.606Z\",\"_finishedBy\":null}"
        var chore = Chore.JSONtoChore(json);
        assert.equal("-KXc7FVW20C9jlh-y4i9", chore.getChoreID());
    });

    var chore = new Chore('1', '1', 'cat', new Date(), 'det','1');
    it("gets and sets chore id", function() {
        var oldID = chore.getChoreID();
        var newID = '2';
        chore.setChoreID(newID);
        assert.notEqual(oldID, chore.getChoreID());
        assert.equal(newID, chore.getChoreID());
    });

    // TODO: write similar tests for remaining fields
    it("gets and sets category", function() {
    });

    it("gets and sets creator", function() {
    });

    it("gets and sets deadline", function() {
    });

    it("gets and sets details", function() {
    });

    it("gets and sets assignee", function() {
    });

    it("gets and sets creation date", function() {
    });

    it("gets and sets completion date", function() {
    });

    it("gets and sets apartment id", function() {
    });
});
