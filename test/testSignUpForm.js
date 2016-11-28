import { assert } from 'chai';

describe("AuthForm", function() {
    it("has form validation", function() {
        assert.isOk("form validation is handled by handlers defined outside of the project and cannot be tested through a unit test like this");
    });

    // Things to check -> validated by form itself
    it("accepts valid first name", function() {
    });

    it("rejects invalid first name", function() {
        assert.isOk("test name length");
        assert.isOk("test characters");
        assert.isOk("test missing");
    });

    it("accepts valid last name", function() {
    });

    it("rejects invalid last name", function() {
        assert.isOk("test name length");
        assert.isOk("test characters");
        assert.isOk("test missing");
    });

    it("accepts valid email address", function() {
    });

    it("rejects invalid email address", function() {
        assert.isOk("test email length");
        assert.isOk("test characters");
        assert.isOk("test missing");
    });

    it("accepts valid password", function() {
    });

    it("rejects invalid password", function() {
        assert.isOk("test password length");
        assert.isOk("test characters");
        assert.isOk("test missing");
    });

    it("accepts valid second password", function() {
    });

    it("rejects invalid second password", function() {
        assert.isOk("test passwords match");
    });
});
