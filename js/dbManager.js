var firebase = require("firebase");
import React from 'react';

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
        }
        return dbm_instance;
    }

    // login_cred = [email, password, user_object]
    // return {exception_object}
    signIn(login_info) {}

    // registration = [first_name, last_name, email, password]
    // return {exception_object}
    signUp(registration) {}

    // user = [...] User Object defined
    // return {exception_object}
    createUser(user) {}

    // Default parameter ( user=user_cache.getID())
    // Otherwise look for new user
    // return user_object
    getUser(user=user_cache.getID()) {}

    // apartment = [...]
    // return {exception_object}
    createApt(apartment) {}

    // return apartment_object
    getApt() {}

    // chore = [...]
    // return {exception_object}
    createChore(chore) {}

    // return chore array
    getChores() {}

    // message = [...]
    // return {exception_object}
    createMessages(message) {}

    // return message array
    getMessages() {}

}
