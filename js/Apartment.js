export default class Apartment {

    /**
    * Represents an aparment
    * @param {string} address - address of aparment
    * @constructor
    */
    constructor (address) {
        this._aptID = null;
        this._tenants = new Array(0);
        // Parse address
        this._address = address;
    }

    /**
    * Returns apartment id in string form
    */
    getAptID() {
        return this._aptID;
    }

    /**
    * Returns apartment's address in string form
    */
    getAddress() {
        return this._address;
    }

    /**
    * Return arrays of tenants' ids
    */
    getTenantIDs() {
        return this._tenants;
    }

    /**
    * Sets apartment's id
    * @param {string} aptId 
    */ 
    setAptID(aptID) {
        this._aptID = aptID;
    }

    /** 
    * Adds tenant to apartment
    * @param {string} tenant
    */
    addTenant(tenant) {
        this._tenants.push(tenant);
    }
}
