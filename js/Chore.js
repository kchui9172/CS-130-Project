export default class Chore {
    // cateogry, details: string
    // createdBy: (UserID) string
    // deadline: date obj?
    constructor(category, deadline, details) {
        this._choreID = null;
        this._cateogry = cateogry;
        this._createdBy = getUser().getUserID();
        this._deadline = deadline;
        this._details = details;
        this._assignedTo = null;
        this._createdOn = getDate();
        this.finishedBy = null;
        this.AptID = getUser().getAptID();
    }

    // userID: string
    addAssignment(userID) { this._assignedTo = userID; }

    // Called when chore is completed
    complete() { this._finishedBy = getDate(); }

    // return string
    getCategory() { return this._cateogry; }

    // return string (userID)
    getCreator() { return this._createdBy; }

    // return date obj?
    getDeadline() { return this._deadline; }

    // return string (details)
    getDetails() { return this._details; }

    // return string (userID)
    getAssignment() { return this._assignedTo; }

    // return date obj?
    getCreationDate() { return this._createdOn; }

    // return date obj?
    getCompletionDate() { return this._finishedBy; }
}
