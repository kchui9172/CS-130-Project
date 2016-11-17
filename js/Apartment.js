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
        // Parse address
        this._address = address;
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
     * Sets the Apartment ID.
     *
     * @method setAptID
     * @param {string} aptId - The new Apartment ID
     */ 
    setAptID(aptID) {
        this._aptID = aptID;
    }

    /** 
     * Adds a tenant to the Apartment.
     *
     * @method addTenant
     * @param {string} tenant - The new tenant's ID
     */
    addTenant(tenant) {
        this._tenants.push(tenant);
    }
}
