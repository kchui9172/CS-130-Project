import { ref, firebaseHandle } from '../js/config/firebase.js'
var firebase = firebaseHandle;

import Apartment from '../js/Apartment.js'
import Message from '../js/Message.js';
import Chore from '../js/Chore.js';
import Payment from '../js/Payment.js';
import User from '../js/User.js';
import DBManager from '../js/dbManager.js';
import {assert} from 'chai';

describe("DBManager", function() {
    var userid = "GNfb868cZATuNgsI1kYLA1QxjWi2";
    var aptid = "ASD77SDF70";
    var manager = new DBManager();

    it("is Singleton", function() {
        var first = new DBManager();
        var second = new DBManager();
        assert.strictEqual(first, second);
    });
    
    it("gets Auth Handle", function() {
        assert.isOk(manager.getAuthHandle());
    });

    it("accesses firebase", function() {
        assert.isOk(firebase.database().ref().child('users'));
        assert.isOk(firebase.database().ref().child('apartments'));
        assert.isOk(firebase.database().ref().child('messages'));
        assert.isOk(firebase.database().ref().child('chores'));
        assert.isOk(firebase.database().ref().child('payments'));
    });

    it("edits users", function() {
        var testUser = new User("test@gmail.com", "first", "last", "012-345-6789");
        testUser.setUserID(userid);
        testUser.setAptID(aptid);
        return manager.addUser(testUser).then(function (uid) {
            if (DBManager.isLoggedIn()) {
                assert.isOk(uid);
            }
            else {
                assert.isOk(!uid);
            }
        }, function (error) {
            if (DBManager.isLoggedIn()) {
                assert.fail("Failed to edit user", "Should edit user");
            }
            else {
                assert.isOk(error);
            }
        });
    });

    it("gets user information", function() {
        return manager.getUser(userid).then(function (user) {
            assert.isOk(user);
            return user;
        });
    });

    it("signs up a new user", function() {
        if (!DBManager.isLoggedIn()) {
            var callback = function(error) {
                manager.signIn("test@gmail.com", "test12345");
                var testUser = new User("test@gmail.com", "first", "last", "012-345-6789");
                testUser.setUserID(userid);
                testUser.setAptID(aptid);
                return manager.addUser(testUser).then(function (uid) {
                    return manager.getUser(uid).then(function (retUser) {
                        assert.deepEqual(testUser, retUser);
                    });
                });
            }
            return manager.signUp("test@gmail.com", "test12345", "first", "last", callback);
        }
    });

    it("signs in an existing user", function() {
        if (!DBManager.isLoggedIn())
        {
            var callback = function(error) {
                var testUser = new User("test@gmail.com", "first", "last", "012-345-6789");
                testUser.setUserID(userid);
                testUser.setAptID(aptid);
                return manager.addUser(testUser).then(function(uid) {
                    return manager.getUser(uid).then(function(retUser) {
                        assert.deepEqual(testUser, retUser);
                    });
                });
            };
            return manager.signIn("test@gmail.com", "test12345", callback); 
        }
    });

    it("converts between objects and strings", function() {
        var testUser = new User("test@gmail.com", "first", "last", "012-345-6789");
        var data = JSON.stringify(testUser);
        var reconstruct = JSON.parse(data);
        assert.deepEqual(reconstruct, testUser);
    });

    it("adds and gets messages", function() {
        if (DBManager.isLoggedIn()) {
            return manager.getUser(userid).then(function(user) {
                return manager.getMessageIDs().then(function (oldMessageIDs) {
                    console.log('got ids')
                    var message = new Message(userid, aptid, new Date(), "test");
                    return manager.addMessage(message).then(function() {
                        manager.getMessageIDs().then(function (newMessageIDs) {
                            for (var i = 0; i < newMessageIDs.length; i++) {
                                manager.getMessage(newMessageIDs[i]).then(function (curMessage) {
                                    assert.isOkay(curMessage);
                                });
                            }
                            assert.isEqual(oldMessageIDs.length+1, newMessageIDs.length);
                        });
                    });
                });
            });
        }
    });

    it("adds and gets chores", function() {
        if (DBManager.isLoggedIn()) {
            return manager.getUser().then(function(user) {
                return manager.getChoreIDs().then(function (oldChoreIDs) {
                    var chore = new Chore(userid, aptid, "testCategory", new Date(), "testDetails", userid);
                    return manager.addChore(chore).then(function() {
                        return manager.getChoreIDs().then(function (newChoreIDs) {
                            for (var i = 0; i < newChoreIDs.length; i++) {
                                manager.getChore(newChoreIDs[i]).then(function (curChore) {
                                    assert.isOkay(curChore);
                                });
                            }
                            assert.isEqual(oldChoreIDs.length+1, newChoreIDs.length);
                        });
                    });
                });
            });            
        }
    });

    it("adds and gets payments", function() {
        if (DBManager.isLoggedIn()) {
            return manager.getUser().then(function(user) {
                return manager.getPaymentIDs().then(function (oldPaymentIDs) {
                    var payment = new Payment(5.00, userid, userid, new Date(), new Date(), new Date(), "testDescription", "testCategory", 3);
                    return manager.addPayment(payment).then(function() {
                        return manager.getPaymentIDs().then(function (newPaymentIDs) {
                            for (var i = 0; i < newPaymentIDs.length; i++) {
                                manager.getPayment(newPaymentIDs[i]).then(function (curPayment) {
                                    assert.isOkay(curPayment);
                                });
                            }
                            assert.isEqual(oldPaymentIDs.length+1, newPaymentIDs.length);
                        });
                    });
                });
            });
        }
    });

    it("gets and updates an apartment", function() {
        if (DBManager.isLoggedIn()) {
            return manager.getApartment().then(function(apartment) {
                var oldID = apartment.getAptID();
                apartment.setAptID('newID');
                return apartment.updateApartment(apartment).then(function() {
                    return manager.getApartment.then(function(newApartment) {
                        assert.equal(apartment.getAptID(), newApartment.getAptID());
                        assert.notEqual(oldID, newApartment.getAptID());
                    });
                });
            });
        }
    });

    it("updates messages", function() {
        // TODO: write test
    });
    
    it("updates chores", function() {
        // TODO: write test
    });

    it("updates payments", function() {
        // TODO: write test
    });
});
