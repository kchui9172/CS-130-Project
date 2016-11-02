export default class Apartment {
    // Address: string
    constructor (address) {
        this._aptID = null;
        this._tenants = new Array(0);
        // Parse address
        this._address = address;
    }

    // return string
    getAptID() {
        return this._aptID;
    }

    // return string
    getAddress() {
        return this._address;
    }

    // return array{Tenant IDs}
    getTenantIDs() {
        return this._tenants;
    }

    // aptID: string
    setAptID(aptID) {
        this._aptID = aptID;
    }

    // tenant: string - UserID
    addTenant(tenant) {
        this._tenants.push(tenant);
    }
}
