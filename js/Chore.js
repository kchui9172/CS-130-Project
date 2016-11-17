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
     * @param {string} category - The category of the Chore.
     * @param {Date} deadline - The deadline of the Chore.
     * @param {string} details - Additional details of the Chore.
     */
    constructor(category, deadline, details) {
        this._choreID = null;
        this._category = category;
        this._createdBy = getUser().getUserID();
        this._deadline = deadline;
        this._details = details;
        this._assignedTo = null;
        this._createdOn = getDate();
        this.finishedBy = null;
        this.AptID = getUser().getAptID();
    }

    /**
     * Sets a user assignment to the Chore.
     *
     * @method setAssignment
     * @param {string} userID - The User ID of the assignee of the Chore.
     */
    setAssignment(userID) { this._assignedTo = userID; }

    /**
     * Sets the deadline for the chore.
     *
     * @method setDeadline
     * @param {Date} deadline - The deadline of the Chore.
     */
    setDeadline(deadline) { this._deadline = deadline; }

    /**
     * Sets the details for the chore.
     *
     * @method setDetails
     * @param {string} details - The details of the Chore.
     */
    setDetails(detail) { this._details = details; }

    /** 
     * Sets the completion date of the finished Chore.
     *
     * @method complete
     */
    complete() { this._finishedBy = getDate(); }

    /**
     * Gets the category of the Chore.
     *
     * @method getCategory
     * @return {string} - The category of the Chore
     */
    getCategory() { return this._cateogry; }

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
