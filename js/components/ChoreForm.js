import React from 'react';
import ReactDOM from 'react-dom';

import DBManager from '../dbManager.js';

import User from '../User.js';
import Chore from '../Chore.js';
import Apartment from '../Apartment.js';

import RaisedButton from 'material-ui/RaisedButton';
import {FormsyText, FormsyDate} from 'formsy-material-ui/lib';
import Formsy from 'formsy-react';

/**
 * Represents a Chore Form.
 *
 * @class React.Component.ChoreForm
 * @extends React.Component
 */
export default class ChoreForm extends React.Component {
    /**
     * Constructs a Chore Form.
     *
     * @method constructor
     * @constructor
     */
    constructor() {
        super();

        this.errorMessages = {
            wordsError: "Please only use letters",
            numericError: "Please provide a number"
        };

        this.enableSubmit = this.enableSubmit.bind(this);
        this.disableSubmit = this.disableSubmit.bind(this);
        this.addChore = this.addChore.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInvalidSubmit = this.handleInvalidSubmit.bind(this);
    }


    /**
     * Enables form submission
     *
     * @method enableSubmit
     */
    enableSubmit() {
        this.setState({
            canSubmit: true
        });
    }

    /**
     * Disables form submission
     *
     * @method disableSubmit
     */
    disableSubmit() {
        this.setState({
            canSubmit: false
        });
    }

    /**
     * Create a new Chore and set fields as needed
     * and then add the chore to the database
     *
     * @method createChore
     * @param {dbManager} manager - The database manager
     * @param {string} choreName - The name of the chore
     * @param {Date} dueDate - The due date of the chore
     * @param {string} details - Additional details of the chore
     * @param {string} assignee - The assignee of the chore
     */
    addChore(choreName, dueDate, details, assignee) {
        console.log("adding a chore");
        console.log("Category: ", choreName);
        console.log("Due date: ", dueDate);
        console.log("Details: ", details);
        console.log("Assignee: ", assignee);

        var manager = new DBManager();
        var aptID = manager.getApartment().then(function(apt){return apt.getAptID()});
        var UID = manager.getUser().then(function(user){return user.getUserID()});
        Promise.all([UID, aptID]).then(values => {
          var newChore = new Chore(values[0], values[1], choreName, dueDate, details);
          newChore.setAssignment(assignee);
          console.log('evaluating chore for:',values[0], values[1]);
          manager.addChore(newChore);
        });
    }

    /**
     * Validates data submitted through the form
     *
     * @method validateData
     * @param {Obj} data - The form data
     */
    validateData(data) {
        var yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        if (yesterday >= data.choreFirstDueDate) {
            console.error('Cannot assign chores due in the past');
            return false;
        }
        if (data.choreRepeatFrequency < 1 || data.choreRepeatFrequency > 365) {
            console.error('Repeat frequency must be between 1 and 365, inclusive');
            return false;
        }
        if (data.choreNumberOccurrences < 1 || data.choreNumberOccurrences > 100) {
            console.error('Number of occurrences must be between 1 and 100, inclusive');
            return false;
        }
        return true;
    }

    /**
     * Handles when Chore Form is submitted by pushing the
     * desired Chore(s) to the database
     *
     * @method handleSubmit
     * @param {Event} e - Event triggered by adding chore
     */
    handleSubmit(data) {
        console.log("submitting chore");
        console.log(data);

        if (this.validateData(data)) {
            this.addChore(data.choreName, data.choreFirstDueDate, data.choreDetails,
                    data.choreAssignee);
            var assignedDate = data.choreFirstDueDate;
            for (var i = 2; i <= parseInt(data.choreNumberOccurrences); i++) {
                assignedDate.setDate(assignedDate.getDate() + parseInt(data.choreRepeatFrequency));
                this.addChore(data.choreName, assignedDate, data.choreDetails,
                        data.choreAssignee);
            }
        }
    }

    handleInvalidSubmit(data) {
        console.error("Received invalid submit: ", data);
    }

    /**
     * Renders a Chore Form.
     *
     * @method render
     */
    render() {
        return (
            <div>
                <Formsy.Form ref="addChores"
                    onValid={this.enableSubmit}
                    onInvalid={this.disableSubmit}
                    onValidSubmit={this.handleSubmit}
                    onInvalidSubmit={this.handleInvalidSubmit} >
                    Chore Name: <FormsyText
                        name="choreName"
                        validations="isWords"
                        validationError={this.errorMessages.wordsError}
                        required={true} />
                    <br />
                    Assignee: <FormsyText
                        name="choreAssignee"
                        validations="isWords"
                        validationError={this.errorMessages.wordsError}
                        required={true} />
                    <br />
                    First Due Date: <FormsyDate
                        name="choreFirstDueDate"
                        required={true} />
                    <br />
                    Number of Occurrences: <FormsyText
                        name="choreNumberOccurrences"
                        validations="isNumeric"
                        validationError={this.errorMessages.numericError}
                        required={true} />
                    <br />
                    Repeat Frequency (in Days): <FormsyText
                        name="choreRepeatFrequency"
                        validations="isNumeric"
                        validationError={this.errorMessages.numericError}
                        required={true} />
                    <br />
                    Additional Details: <FormsyText
                        multiline={true}
                        rows={3}
                        cols={50}
                        name="choreDetails" />
                    <br />
                    <RaisedButton fullWidth={false}
                        type="submit"
                        label="Send chores"
                        primary={false}
                        secondary={true} />
                </Formsy.Form>
            </div>
        );
    }
}
