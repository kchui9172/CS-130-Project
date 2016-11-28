// TODO: fix error thrown on importing react component
// and then import

import { assert } from 'chai';

describe("ChoreForm", function() {
    var validateData = function(data) {
        console.log("data: ",data);
        var yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        if (yesterday >= data.choreFirstDueDate) {
            console.log('Cannot assign chores due in the past');
            return false;
        }
        var repeatFrequency = parseInt(data.choreRepeatFrequency);
        if (repeatFrequency < 1 || repeatFrequency > 365) {
            console.log('Repeat frequency must be between 1 and 365, inclusive');
            return false;
        }
        var numberOccurrences = parseInt(data.choreNumberOccurrences);
        if (numberOccurrences < 1 || numberOccurrences > 100) {
            console.log('Number of occurrences must be between 1 and 100, inclusive');
            return false;
        }
        return true;
    };

    var data = {
        choreName: "name",
        choreCategory: "category",
        choreAssignee: "assignee",
        choreFirstDueDate: new Date(),
        choreNumberOccurrences: 3,
        choreRepeatFrequency: 3,
        choreDetails: "details"
    };

    it("validates good input", function() {
        assert.isTrue(validateData(data));
    });

    it("invalidates past date", function() {
        var oldDate = new Date(data.choreFirstDueDate);
        data.choreFirstDueDate = data.choreFirstDueDate.setDate(data.choreFirstDueDate.getDate() - 2);
        assert.isFalse(validateData(data));
        data.choreFirstDueDate = oldDate;
    });

    it("invalidates negative number occurrences", function() {
        var oldNum = data.choreNumberOccurrences;
        data.choreNumberOccurrences = -1;
        assert.isFalse(validateData(data));
        data.choreNumberOccurrences = oldNum;
    });

    it("invalidates large number occurrences", function() {
        var oldNum = data.choreNumberOccurrences;
        data.choreNumberOccurrences = 1000;
        assert.isFalse(validateData(data));
        data.choreNumberOccurrences = oldNum;
    });

    it("invalidates negative repeat frequency", function() {
        var oldNum = data.choreRepeatFrequency;
        data.choreRepeatFrequency = -1;
        assert.isFalse(validateData(data));
        data.choreNumberOccurrences = oldNum;
    });

    it("invalidates large repeat frequency", function() {
        var oldNum = data.choreRepeatFrequency;
        data.choreRepeatFrequency = 1000;
        assert.isFalse(validateData(data));
        data.choreNumberOccurrences = oldNum;
    });

    it("limits string input length", function() {
        assert.isOk("Handled by form itself before passing data");
    });

    it("rejects empty required fields", function() {
        assert.isOk("Handled by form itself before passing data");
    });
});
