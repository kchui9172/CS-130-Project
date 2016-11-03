var firebase = require("firebase");

// Firebase API Credentials
var config = {
  apiKey: "AIzaSyCAFUnm_bsnpiRyziqTB41QZoLW3-OYp20",
  authDomain: "rockmates-d8edb.firebaseapp.com",
  databaseURL: "https://rockmates-d8edb.firebaseio.com",
  storageBucket: "rockmates-d8edb.appspot.com",
  messagingSenderId: "370968243217"
};

// Singleton Design Patter...We only want one
// instance of DBManager
let dbm_instance = null;

// Global Data for User & Apartment
let user_cache = null; // User Object
let apt_cache = null;  // Apt Object


// Firebase Realtime checks before using cached version
export default class DBManager {
    constructor() {
        if(!dbm_instance){
            dbm_instance = this;
            firebase.initializeApp(config);
            this._database = firebase.database();
        }
        return dbm_instance;
    }

    // email, password: string
    // return {exception_object}
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

    // email, password: string
    // return {exception_object}
    signUp(email, password) {
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
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

    // user = [...] User Object defined
    // return {exception_object}
    addUser(user) {}

    // Default parameter ( user=user_cache.getID())
    // Otherwise look for new user
    // return user_object
    getUser(user=user_cache.getID()) {}

    // apartment = [...]
    // return {exception_object}
    addApartment(apartment) {}

    // return apartment_object
    getApt() {}

    // chore = [...]
    // return {exception_object}
    addChore(chore) {}

    // return chore array
    getChores() {}

    // message = [...]
    // return {exception_object}
    addMessage(message) {}

    // return message array
    getMessages() {}
}
