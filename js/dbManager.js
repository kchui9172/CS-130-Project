import { ref, firebaseHandle } from './config/firebase.js'
var firebase = firebaseHandle;

import Message from './Message.js';
import User from './User.js';
import Chore from './Chore.js';
import Payment from './Payment.js';
import Apartment from './Apartment.js';

// Singleton Design Pattern... We only want one
// instance of DBManager
let dbm_instance = null;

/**
 * Represents a Database Manager.
 *
 * @class DBManager
 */
export default class DBManager {
    /**
     * Constructs a Database Manager.
     *
     * @method constructor
     * @constructor
     */
    constructor() {
        if(dbm_instance == null){
            dbm_instance = this;
            console.log('DBManager.onCreate: [new dbm_instance]');
        }
        return dbm_instance;
    }

    getAuthHandle() {
      return firebase.auth();
    }


    /**
     * Attempts to sign a user in.
     *
     * @method signIn
     * @param {string} email - The user's email
     * @param {string} password - The user's password
     * @param {function} onFailCallback - Asynchronous exception handler
     * @return {Promise} Promise of a non-null User object (newly signed in)
     * @throws {Error} - A possible authentication error
     */
    signIn(email, password, onFailCallback) {
        if(onFailCallback == null) {
          /* Default error handler */
          onFailCallback = function(error) {
            switch (error.code) {
                case 'auth/invalid-email':
                    alert("Invalid email.");
                    break;
                case 'auth/user-disabled':
                    alert("User account disabled.");
                    break;
                case 'auth/user-not-found':
                    alert("User not found.");
                    break;
                case 'auth/wrong-password':
                    alert("Wrong password");
                    break;
                default:
                    alert(error.message);
          }
         }
        }
        var signInPromise = firebase.auth().signInWithEmailAndPassword(email, password)
                            .then(function(signedInUser) {
                              var validSignIn = (null !== firebase.auth().currentUser) && (signedInUser === firebase.auth().currentUser);
                              console.log('db.signIn: firebaseCurrentUser: ', validSignIn);
                              return validSignIn;
                            }).catch(onFailCallback);
    }

    /**
     * Attempts to sign up a user.
     *
     * @method signUp
     * @param {string} email - The user's email
     * @param {string} password - The user's password
     * @param {function} onFailCallback - Asynchronous exception handler
     * @return {Promise} Promise of a nonNull Firebase user
     * @throws {Error} - A possible authentication error
     */
    signUp(email, password, firstname, lastname, onFailCallback) {
      if(onFailCallback == null) {
        /* Default error handler */
        onFailCallback = function(error) {
          switch (error.code) {
              case 'auth/email-already-in-use':
                  alert("Email is already in user.");
                  break;
              case 'auth/invalid-email':
                  alert("Email is invalid.");
                  break;
              default:
                  alert("Error signing up.");
          }
        }
       }

       var signUpPromise = firebase.auth().createUserWithEmailAndPassword(email, password)
                           .then(function(signedUpUser) {
                             console.log('signedUpUser:', signedUpUser.uid);
                             return signedUpUser;
                           }).catch(onFailCallback);
    }
    /**
     * Adds a user to the database.
     *
     * @method addUser
     * @param {User} - The User Object to be added
     * @return {string} - The User ID of the added user
     */
    addUser(user) {
        console.log('addUser:', user.getUserID(), user);
        return firebase.database().ref('users/' + user.getUserID()).set(JSON.stringify(user));
    }

    /**
     * Updates a user in the database.
     *
     * @method updateUser
     * @param {User} - The User Object to be updated
     */
    /*updateUser(user) {
        var messagesRef = firebase.database().ref("users/" + user.getUserID());
        messagesRef.set(JSON.stringify(user));
    }*/

    /**
     * Gets the user.
     *
     * @method getUser
     * @param {string} [userID=user_cache.getID()] - The user ID
     * @return {User} - The corresponding User
     */
    getUser(userID) {
        var ID = (userID!=null) ? userID : DBManager.isLoggedIn();

        console.log('db.getUser: firebaseCurrentUser: ', (null !== firebase.auth().currentUser));

        if(ID) {
          console.log('db.getUser', ID);
          return firebase.database().ref('/users/' + ID).once('value').then(function(snapshot) {
              return User.JSONtoUser(snapshot.val());
            });
        } else {
          console.log('getUser','Not Logged In');
          return null;
        }
    }

    /**
    * Checks current auth state
    * @method isLoggedIn
    * @return {uid} - current user id
    */
    static isLoggedIn() {
      return (null !== firebase.auth().currentUser) ? firebase.auth().currentUser.uid : null;
    }

    /**
    * Checks current auth state
    * @method isLoggedIn
    * @return {uid} - current user id
    */
    static currentUser() {
      return firebase.auth().currentUser;
    }

    /**
    * Logs the current user out, if logged in
    * @method LogOut
    * @return {Promise} - LogOut promise
    */
    static LogOut() {
      return (this.isLoggedIn()) ? firebase.auth().signOut() : null;
    }

    /**
     * Adds an apartment.
     *
     * @method addApartment
     * @param {Apartment} apartment - The apartment to be added
     * @return {string} - The apartment ID of the added apartment
     */
    addApartment(apartment) {
        var apartmentsRef = firebase.database().ref('apartments');
        var newApartmentRef = apartmentsRef.push();
        apartment.setAptID(newApartmentRef.getKey());
        newApartmentRef.set(JSON.stringify(apartment));
        return newApartmentRef.getKey();
    }

    /**
     * Updates an apartment.
     *
     * @method updateApartment
     * @param {Apartment} apartment - Apartment
     * @throws {error} - Possible failure to update Apartment
     */
    updateApartment(apartment) {
        var apartmentRef = firebase.database().ref("apartments/" + apartment.getAptID());
        apartmentRef.set(JSON.stringify(apartment));
    }

    /**
     * Gets an apartment.
     *
     * @method getApartment
     * @param {string} aptID - The apartment ID
     * @return {Apartment} - The corresponding Apartment
     */
    getApartment(aptID=null) {
        // Get User->Get-Apt-ID->Get Apartment
        if (!aptID) {
            return this.getUser().then(function (user) {
                return firebase.database().ref('/apartments/' + user.getAptID()).once('value').then(function(snapshot) {
                    return Apartment.JSONtoApartment(snapshot.val());
                });
            });
        } else {
            return firebase.database().ref('/apartments/' + aptID).once('value').then(function(snapshot) {
                return Apartment.JSONtoApartment(snapshot.val());
            });
        }
    }

    /**
     * Adds a chore.
     *
     * @method addChore
     * @param {Chore} chore - The chore to be added.
     * @param {function} callback - The optional callback function
     * @throws {Error} - Possible failure to add Chore
     */
    addChore(chore, callback=null) {
        console.log("Adding Chore");
        var choresRef = firebase.database().ref('chores');
        var newChoreRef = choresRef.push();
        chore.setChoreID(newChoreRef.getKey());
        newChoreRef.set(JSON.stringify(chore));
        // Add the Chore to Apartment
        this.getApartment().then(function (apt) {
            apt.addChore(newChoreRef.getKey());
            this.updateApartment(apt);
            if (callback) {
                callback();
            }
        }.bind(this));
    }

    /**
     * Updates a user in the database.
     *
     * @method updateUser
     * @param {User} - The User Object to be updated
     */
    updateUser(user) {
        var messagesRef = firebase.database().ref("users/" + user.getUserID());
        messagesRef.set(JSON.stringify(user));
    }

    /**
     * Gets all chore ids.
     *
     * @method getChoreIDs
     * @returns {Array{ChoreIDs}}
     */
    getChoreIDs() {
        return this.getApartment().then(function (apt) {
            return apt.getChoreIDs();
        });
    }

    /**
     * Gets a chore.
     *
     * @method getChore
     * @param {string} choreID - The id of the chore to get.
     * @returns {Chore}
     */
    getChore(choreID) {
        return firebase.database().ref('/chores/' + choreID).once('value').then(function(snapshot) {
            return Chore.JSONtoChore(snapshot.val());
        });
    }

    /**
     * Adds a message.
     *
     * @method addMessage
     * @param {Message} message - The message to be added.
     * @throws {Exception} - Possible failure to add Message
     */
    addMessage(message) {
        console.log("Adding Message");
        var messagesRef = firebase.database().ref('messages');
        var newMessageRef = messagesRef.push();
        message.setMessageID(newMessageRef.getKey());
        newMessageRef.set(JSON.stringify(message));
        this.getApartment().then(function (apt) {
            apt.addMessage(newMessageRef.getKey());
            this.updateApartment(apt);
        }.bind(this));
    }

    /**
     * Gets all message ids.
     *
     * @method getMessageIDs
     * @returns {Array{MessageIDs}}
     */
    getMessageIDs() {
        return this.getApartment().then(function (apt) {
            return apt.getMessageIDs();
        });
    }

    /**
     * Gets a message by its id.
     *
     * @method getMessage
     * @param {string} messageID - The id of the message to get.
     * @returns {Message}
     */
    getMessage(messageID) {
        return firebase.database().ref('/messages/' + messageID).once('value').then(function(snapshot) {
            return Message.JSONtoMessage(snapshot.val());
        });
    }

    /**
     * Adds a payment.
     *
     * @method addPayment
     * @param {Payment} payment - The payment to be added
     * @throws {Exception} - Possible failure to add Payment
     */
    addPayment(payment){
        console.log("in db manager add payment");
        var paymentsRef = firebase.database().ref('payments');
        var newPaymentRef = paymentsRef.push();
        newPaymentRef.set(JSON.stringify(payment));
        this.getUser().then(function (user) {
            var context = this;
            var pay1 = payment;
            user.addPayment(payment);
            this.updateUser(user);
            // Switch loaner and loanee and save to other user
            var loanerID = payment.getLoaner();
            payment.setLoanerID(payment.getLoanee());
            payment.setLoaneeID(loanerID);
            console.log("loaner: ", payment.getLoaner());
            console.log("loanee: ", payment.getLoanee());
            this.getUser(payment.getLoaner()).then(function (user2) {
                user2.addPayment(payment);
                context.updateUser(user2);
            });
        }.bind(this));
    }

    /**
     * Gets all the payment IDs
     *
     * @method getPaymentIDs
     * @returns {array{PaymentIDs}}
     */
    getPaymentIDs() {
        return this.getUser().then(function (user) {
            return user.getPaymentIDs();
        })
    }

    /**
     * Gets the payment with the speicifed ID
     *
     * @method getPayment
     * @param paymentID - Payment ID to find payment
     * @return {Payment}
     */
    getPayment(paymentID) {
         return firebase.database().ref('/payments/' + paymentID).once('value').then(function(snapshot) {
             return Payment.JSONtoPayment(snapshot.val());
         });
     }

    /**
     *
     * Bind Apartment and User
     * @param {string} aptID - The apartment to bind
     * @throws {Exception} - Possible failure to bind Apartment
     */
     bindApartment(aptID) {
         return this.getUser().then(function (user) {
             var context = this;
             console.log("FIRST CONTEXT: ", this);
             user.setAptID(aptID);
             this.updateUser(user);
             this.getApartment(aptID).then(function(apt) {
                 apt.addTenant(user.getUserID());
                 context.updateApartment(apt);
                 return apt;
             });
         }.bind(this));
     }

    listenForMessages(onChangeCallBack){
        var aptIDPromise = this.getApartment().then(function(apt) {return apt.getAptID()});
        aptIDPromise.then(function(aptID) {
            console.log('listenForMessages(aptID):', aptID);
             var reference = firebase.database().ref('/apartments/' + aptID + '/messages/');
             console.log('listenForMessages(reference):', reference);
             reference.on('child_changed', alert('New Message!')).then(onChangeCallBack);
             console.log('listenForMessages(out)');
        });
     }
}
