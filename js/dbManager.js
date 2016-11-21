import Message from './Message.js';
import User from './User.js';
import Chore from './Chore.js';
import Payment from './Payment.js';
import Apartment from './Apartment.js';
var firebase = require("firebase");

// Firebase API Credentials
var config = {
  apiKey: "AIzaSyCAFUnm_bsnpiRyziqTB41QZoLW3-OYp20",
  authDomain: "rockmates-d8edb.firebaseapp.com",
  databaseURL: "https://rockmates-d8edb.firebaseio.com",
  storageBucket: "rockmates-d8edb.appspot.com",
  messagingSenderId: "370968243217"
};
firebase.initializeApp(config);

// Singleton Design Pattern... We only want one
// instance of DBManager
let dbm_instance = null;

// Global Data for User & Apartment
let user_cache = null; // User Object
let apt_cache = null;  // Apt Object

// Firebase Realtime checks before using cached version
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
        console.log('dbManager.constructor :' );
        console.log('DBManager.getInstance: (old dbm_instance :', (dbm_instance != null))
        if(dbm_instance == null){
            dbm_instance = this;
            console.log('DBManager.onCreate: [new dbm_instance]');
        }
        console.log('DBManager.getInstance: (new dbm_instance :', (dbm_instance != null))
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
        var signInPromise = firebase.auth().signInWithEmailAndPassword(email, password).catch(onFailCallback);

        return signInPromise.then(function(signedInUser)
        { user_cache=true;
          console.log('db.signIn: firebaseCurrentUser: ', (null !== firebase.auth().currentUser));return true;/*DBManager.getUser(signedInUser.uid)*/});
        // TODO : should return promise of User object (but it should never be none, or if its, the other side should handle that case)
        // TODO : Also, don't forget about firebase.auth().onAuthStateChanged(function(user) {
        //   if (user) {
        //     // User is signed in.
        //   } else {
        //     // No user is signed in.
        //   }
        // });
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
    signUp(email, password, onFailCallback) {
        return firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
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
        });
    }

    /**
     * Adds a user to the database.
     *
     * @method addUser
     * @param {User} - The User Object to be added
     * @return {string} - The User ID of the added user
     */
    addUser(user) {
        this.user_cache = user;
        firebase.database().ref('users/' + user.getUserID()).set(JSON.stringify(user));
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
        var ID = (userID!=null) ? userID : (null !== firebase.auth().currentUser) ? firebase.auth().currentUser.uid : null;
        console.log('db.getUser: firebaseCurrentUser: ', (null !== firebase.auth().currentUser))
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
     * @throws {Error} - Possible failure to add Chore
     */
    addChore(chore) {
        console.log("Adding Chore");
        var choresRef = firebase.database().ref('chores');
        var newChoreRef = choresRef.push();
        chore.setChoreID(newChoreRef.getKey());
        newChoreRef.set(JSON.stringify(chore));
        // Add to Chore to Apartment
        this.getApartment().then(function (apt) {
            apt.addChore(newChoreRef.getKey());
            this.updateApartment(apt);
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
     * Gets all chores.
     *
     * @method getChores
     * @returns {Array{Chores}}
     */
    getChores() {}

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
     * @method getMessages
     * @returns {Array{MessageIDs}}
     */
    getMessages() {
        return this.getApartment().then(function (apt) {
            return apt.getMessages();
        });
    }

    /**
     * Gets a message by its id.
     *
     * @method getMessage
     * @returns {Message}
     */
    getMessage(id) {
        return firebase.database().ref('/messages/' + id).once('value').then(function(snapshot) {
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
            payment.setLoanerID(payment.getLoanee);
            payment.setLoaneeID(loanerID);
            this.getUser(payment.getLoaner()).then(function (user2) {
                user2.addPayment(payment);
                context.updateUser(user2);
            });
        }.bind(this));
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
}
