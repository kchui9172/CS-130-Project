/**
 * Represents and contains information about an Apartment.
 *
 * @class Apartment
 */
export default class Apartment {
    /**
     * Constructs an Apartment.
     *
     * @method constructor
     * @param {string} address - Address of the Apartment
     * @constructor
     */
    constructor (address) {
        this._aptID = null;
        this._tenants = new Array(0);
        this._messages = new Array(0);
        this._chores = new Array(0);
        this._address = address;
    }

    /**
     * Creates an Apartment from input JSON.
     *
     * @method JSONtoApartment
     * @static
     * @param {string} - JSON representing an Apartment
     * @return {Apartment} - The Apartment represented by the JSON
     */
    static JSONtoApartment(data) {
        var apartment = new Apartment();
        var JSONObj = JSON.parse(data);
        apartment._aptID = JSONObj._aptID;
        apartment._tenants = JSONObj._tenants;
        apartment._messages = JSONObj._messages;
        apartment._chores = JSONObj._chores;
        apartment._address = JSONObj._address;
        return apartment;
    }

    /**
     * Gets the Apartment ID.
     *
     * @method getAptID
     * @return {string} - The Apartment ID
     */
    getAptID() {
        return this._aptID;
    }

    /**
     * Gets the address of the Apartment.
     *
     * @method getAddress
     * @return {string} - The Apartment address
     */
    getAddress() {
        return this._address;
    }

    /**
     * Gets the tenants of the Apartment.
     *
     * @method getTenantIDs
     * @return {Array{string}}
     */
    getTenantIDs() {
        return this._tenants;
    }

    /**
      * Gets the ids of all the messages sent in the Apartment.
      *
      * @method getMessageIDs
      * @return {Array{string}}
      */
    getMessageIDs() {
        return this._messages;
    }

    /**
      * Gets the ids of all the chores in the Apartment.
      *
      * @method getChoreIDs
      * @return {Array{string}}
      */
    getChoreIDs() {
        return this._chores;
    }

    /**
     * Sets the Apartment ID.
     *
     * @method setAptID
     * @param {string} aptID - The new Apartment ID
     */
    setAptID(aptID) {
        this._aptID = aptID;
    }

    /**
     * Adds a tenant to the Apartment.
     *
     * @method addTenant
     * @param {string} userID - The new tenant's ID
     */
    addTenant(userID) {
        this._tenants.push(userID);
    }

    /**
     * Adds a message to the Apartment.
     *
     * @method addMessage
     * @param {string} messageID - The new message ID
     */
    addMessage(messageID) {
        this._messages.push(messageID);
    }

    /**
     * Adds a chore to the Apartment.
     *
     * @method addChore
     * @param {string} choreID - The new chore ID
     */
    addChore(choreID) {
        this._chores.push(choreID);
    }
}
