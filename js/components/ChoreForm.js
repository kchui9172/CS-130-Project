import React from 'react';
import ReactDOM from 'react-dom';

import DBManager from '../dbManager.js';

import User from '../User.js';
import Chore from '../Chore.js';

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
        // TODO: replace the userid and aptid appropriately
        var newChore = new Chore("Zach", "Zach_Apt", choreName, dueDate, details);
        newChore.setAssignment(assignee);
        
        // TODO: actually add the chore to DB
        var manager = new DBManager();
        manager.signIn("bob@gmail.com", "password").then(function () {
            console.log("signed in");
            manager.addChore(newChore);
        });
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

        this.addChore(data.choreName, data.choreFirstDueDate, data.choreDetails,
                data.choreAssignee);
        var assignedDate = data.choreFirstDueDate;
        for(var i = 2; i <= parseInt(data.choreNumberOccurrences); i++) {
            assignedDate.setDate(assignedDate.getDate() + parseInt(data.choreRepeatFrequency));
            this.addChore(data.choreName, assignedDate, data.choreDetails,
                    data.choreAssignee);
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
                        required={true} />
                    <br />
                    Assignee: <FormsyText
                        name="choreAssignee"
                        required={true} />
                    <br />
                    First Due Date: <FormsyDate
                        name="choreFirstDueDate"
                        required={true} />
                    <br />
                    Number of Occurrences: <FormsyText
                        name="choreNumberOccurrences"
                        required={true} />
                    <br />
                    Repeat Frequency (in Days): <FormsyText
                        name="choreRepeatFrequency"
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
