import DBManager from './dbManager.js';
/**
 * Represents a Chore.
 *
 * @class Chore
 */
export default class Chore {
    /**
     * Constructs a Chore.
     *
     * @constructor
     * @method constructor
     * @param {string} userID - The ID of the user
     * @param {string} aptID - The ID of the apartment
     * @param {string} name - The name of the Chore
     * @param {string} category - The category of the Chore
     * @param {Date} deadline - The deadline of the Chore
     * @param {string} details - Additional details of the Chore
     * @param {string} assignee - The assignee of the Chore
     */
     constructor(userID, aptID, name, category, deadline, details, assignee) {
        this._name = name;
        this._choreID = null;
        this._category = category;
        this._createdBy = userID;
        this._aptID = aptID;
        this._deadline = deadline;
        this._details = details;
        this._assignedTo = assignee;
        this._createdOn = new Date();
        this._finishedBy = null;
    }

    /**
     * Creates a Chore from input JSON.
     *
     * @method JSONtoChore
     * @static
     * @param {string} - JSON representing a Chore
     * @return {Chore} - The Chore represented by the JSON
     */
    static JSONtoChore(data) {
        var chore = new Chore();
        var JSONObj = JSON.parse(data);
        chore._name = JSONObj._name;
        chore._choreID = JSONObj._choreID;
        chore._category = JSONObj._category;
        chore._createdBy = JSONObj._createdBy;
        chore._deadline = JSONObj._deadline;
        chore._details = JSONObj._details;
        chore._assignedTo = JSONObj._assignedTo;
        chore._createdOn = JSONObj._createdOn;
        chore._finishedBy = JSONObj._finishedBy;
        chore._aptID = JSONObj._aptID;
        return chore;
    }

    /**
     * Sets a user assignment to the Chore.
     *
     * @method setAssignment
     * @param {string} choreID - The Chore ID
     */
    setChoreID(choreID) { this._choreID = choreID; }

    /**
     * Sets a user assignment to the Chore.
     *
     * @method setAssignment
     * @param {string} userID - The User ID of the assignee of the Chore
     */
    setAssignment(userID) { this._assignedTo = userID; }

    /**
     * Sets the deadline for the chore.
     *
     * @method setDeadline
     * @param {Date} deadline - The deadline of the Chore
     */
    setDeadline(deadline) { this._deadline = deadline; }

    /**
     * Sets the details for the chore.
     *
     * @method setDetails
     * @param {string} details - The details of the Chore
     */
    setDetails(detail) { this._details = details; }

    /**
     * Sets the completion date of the finished Chore
     *
     * @method complete
     */
    complete() { this._finishedBy = new Date(); }

    /**
     * Sets the completion date of the Chore to null.
     *
     * @method uncomplete
     */
    uncomplete() { this._finishedBy = null; }

    /**
     * Gets the Chore ID.
     *
     * @method getChoreID
     * @return {string} - The Chore ID
     */
    getChoreID() { return this._choreID; }

    /** Gets the Chore Name.
     *
     * @method getName
     * @return {string} - The Chore Name
     */
    getName() { return this._name; }

    /**
     * Gets the Apartment ID of the chore.
     *
     * @method getAptID
     * @return {string} - The Apt ID
     */
    getAptID() { return this._aptID; }

    /**
     * Gets the category of the Chore.
     *
     * @method getCategory
     * @return {string} - The category of the Chore
     */
    getCategory() { return this._category; }

    /**
     * Gets the User ID of the creator of the Chore.
     *
     * @method getCreator
     * @return {string} - The creator of the Chore
     */
    getCreator() { return this._createdBy; }

    /**
     * Gets the deadline of the Chore.
     *
     * @method getDeadline
     * @return {Date} - The deadline of the Chore
     */
    getDeadline() { return this._deadline; }

    /**
     * Gets the additional details of the Chore.
     *
     * @method getDetails
     * @return {string} - The details of the Chore
     */
    getDetails() { return this._details; }

    /**
     * Gets the User ID of the assignee of the Chore.
     *
     * @method getAssignment
     * @return {string} - The assignee of the Chore
     */
    getAssignment() { return this._assignedTo; }

    /**
     * Gets the creation date of the Chore.
     *
     * @method getCreationDate
     * @return {Date} - The creation date of the Chore
     */
    getCreationDate() { return this._createdOn; }

    /**
     * Gets the completion date of the Chore.
     *
     * @method getCompletionDate
     * @return {Date} - The completion date of the Chore
     */
    getCompletionDate() { return this._finishedBy; }
}
