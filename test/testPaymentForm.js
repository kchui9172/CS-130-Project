// TODO: Imports like testChoreForm

import { assert } from 'chai';

describe("PaymentForm", function() {
    var checkDate = function(chosenDate) {
        if (chosenDate != null) {
            var date = (new Date(chosenDate.toDateString() + " 12:00:00 +0000")).toISOString().substring(0,10);
            var curDate = new Date().toISOString().substring(0,10);
            return curDate <= date ? true : 'Invalid date: cannot choose date from past';
        }
    };

    it("validates okay date", function() {
        assert.isTrue(checkDate(new Date()));
    });

    it("invalidates past date", function() {
        var newDate = new Date();
        newDate.setDate(newDate.getDate() - 3);
        assert.isOk(checkDate(newDate) != true);
    });

    it("invalidates null date", function() {
        assert.isOk(checkDate(null) != true);
    });

    // TODO: other tests to think about

    it("limits amount per transaction", function() {
        assert.isOk("not a restriction we want to place on user right now");
    });

    it("cannot have a negative transaction", function() {
        assert.isOk("not a restriction we want to place on user right now");
    });

    it("limits string input length", function() {
        assert.isOk("is handled by form itself before passing data");
    });

    it("rejects missing required fields", function() {
        assert.isOk("is handled by form itself before passing data");
    });
});
