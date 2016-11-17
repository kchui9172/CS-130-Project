import User from './User.js';
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
var dbm_instance = null;
// Global Data for User & Apartment
var user_cache = false; // User Object
var apt_cache = null;  // Apt Object

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

    //
    // componentWillMount: function() {
    //         firebase.auth().onAuthStateChanged(firebaseUser => {
    //             if (firebaseUser) {
    //                 console.log("Logged IN", firebaseUser);
    //             } else {
    //                 console.log('Not logged in');
    //             }
    //         });
    //     },
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
        var data = JSON.stringify(user);
        firebase.database().ref('users/' + user.getUserID()).set(data);
    }

    /**
     * Gets the user.
     *
     * @method getUser
     * @param {string} [userID=user_cache.getID()] - The user ID
     * @return {User} - The corresponding User
     */
    // getUser(userID=user_cache.getID()) {
    //     return firebase.database().ref('/users/' + userID).once('value').then(function(snapshot) {
    //         return User.JSONtoUser(snapshot.val());
    //     });
    // }

    getUser(userID) {
        userID = (userID!=null) ? userID : (null !== firebase.auth().currentUser) ? firebase.auth().currentUser.uid : null;
        console.log('db.getUser: firebaseCurrentUser: ', (null !== firebase.auth().currentUser))
        if(userID) {
          console.log('db.getUser', userID);
          return firebase.database().ref('/users/' + userID).once('value').then(function(snapshot) {
              return User.JSONtoUser(snapshot.val());
            });
        } else {
          console.log('db.getUser', 'null');
          return null;
        }
    }

    /**
     * Adds an apartment.
     *
     * @method addApartment
     * @param {Apartment} apartment - The apartment to be added
     * @throws {Error} - Possible failure to add Apartment
     */
    addApartment(apartment) {}

    /**
     * Gets an apartment.
     *
     * @method getApt
     * @param {string} apartment - The apartment ID
     * @return {Apartment} - The corresponding Apartment
     */
    getApt(apartment) {}

    /**
     * Adds a chore.
     *
     * @method addChore
     * @param {Chore} chore - The chore to be added.
     * @throws {Error} - Possible failure to add Chore
     */
    addChore(chore) {}

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
        var messagesRef = firebase.database().ref('messages');
        var newMessageRef = messagesRef.push();
        newMessageRef.set(JSON.stringify(message));
        // Add to User Message list
        this.user_cache.addMessage(newMessageRef.getKey());
        this.updateUser(this.user_cache);
    }

    /**
     * Gets all message ids.
     *
     * @method getMessages
     * @returns {Array{MessageIDs}}
     */
    getMessages() {
        return this.user_cache.getMessageIDs();
    }


    /**
     * Gets a message by its id.
     *
     * @method getMessage
     * @returns {Message}
    */
    getMessage(id) {
        var messages = [];
        return firebase.database().ref('/messages/' + id).once('value').then(function(snapshot) {
            return Message.JSONtoMessage(snapshot.val());
        });
      }

    /**
     * Adds a payment.
     *
     *@method addPayment
     *@param {Payment} payment - The payment to be added
     *@throws {Exception} - Possible failure to add Payment 
    */
    addPayment(payment){
        var paymentsRef = firebase.database().ref('payments');
        var newPaymentRef = paymentsRef.push();
        newPaymentRef.set(JSON.stringify(payment));
        //Add to User Payments list
        this.user_cache.addPayment(newPaymentRef.getKey());
        this.updateUser(this.user_cache);
    }
}
