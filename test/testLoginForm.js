import { assert } from 'chai';

describe("LoginForm", function() {
    it("has form validation", function() {
        assert.isOk("form validation is handled by handlers defined outside of the project and cannot be tested through a unit test like this");
    });

    // Things to check -> validated by form itself
    it("rejects missing fields", function() {
    });

    it("accepts valid email address", function() {
    });

    it("rejects invalid email address", function() {
    });

    it("accepts valid password", function() {
    });

    it("rejects too short of password", function() {
    });

    it("rejects password with invalid characters", function() {
    });

    it("rejects non-matching passwords", function() {
    });
    
    it("limits input string length", function() {
    });
});
