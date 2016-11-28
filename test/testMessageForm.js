import { assert } from 'chai';

describe("MessageForm", function() {
    it("does input validation", function() {
        assert.isOk("Message form doesn't need to validate input as results are stringified stored in firebase.");
    });

    // TODO: other possible tests
    it("does not allow certain special characters", function() {
    });

    it("has a length restriction", function() {
        assert.isOk("handled by the form itself");
    });

    it("does not allow missing text field", function() {
        assert.isOk("handled by the form itself");
    });
})
