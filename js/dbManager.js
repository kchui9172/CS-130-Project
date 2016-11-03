var firebase = require("firebase");

// Firebase API Credentials
var config = {
  apiKey: "AIzaSyCAFUnm_bsnpiRyziqTB41QZoLW3-OYp20",
  authDomain: "rockmates-d8edb.firebaseapp.com",
  databaseURL: "https://rockmates-d8edb.firebaseio.com",
  storageBucket: "rockmates-d8edb.appspot.com",
  messagingSenderId: "370968243217"
};

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
        if(!dbm_instance){
            dbm_instance = this;
            firebase.initializeApp(config);
        }
        return dbm_instance;
    }

    /**
     * Attempts to sign a user in.
     *
     * @method signIn
     * @param {string} email - The user's email
     * @param {string} password - The user's password
     * @throws {Error} - A possible authentication error
     */
    signIn(email, password) {
        firebase.auth().signInWithEmailAndPassword(email, password)
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
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
                    alert("Error signing in.");
            }
        });
    }

    /**
     * Attempts to sign up a user.
     *
     * @method signUp
     * @param {string} email - The user's email
     * @param {string} password - The user's password
     * @throws {Error} - A possible authentication error
     */
    signUp(email, password) {
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
     * @param {string} [user=user_cache.getID()] - The user ID
     * @return {User} - The corresponding User
     */
    getUser(user=user_cache.getID()) {}

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
    addMessage(message) {}

    /**
     * Gets all messages.
     *
     * @method getMessages
     * @returns {Array{Message}}
     */
    getMessages() {}
}
