// Singleton Design Pattern... We only want one
// instance of DBManager
let dbm_instance = null;

// Global Data for User & Apartment
let user_cache = null; // User Object
let apt_cache = null;  // Apt Object

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
            //firebase.initializeApp(config);
        }
        return dbm_instance;
    }

    addMessage(message) { 
        //parse message and add to firebase
        return "added message"; //here add message to firebase
    }

    getMessages() {
        //get message from firebase and format into list?
        return [{text:"this", time: "10:15", user: "Kristen", key: 123},
                {text:"is", time: "10:14", user: "Torie", key: 40},
                {text:"a", time: "10:13", user: "Andrea", key: 41},
                {text:"test", time: "10:12", user: "Nancy", key: 42}];
    }
}


