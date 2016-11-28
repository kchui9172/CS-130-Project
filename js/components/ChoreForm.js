import React from 'react';
import User from '../User.js';
import Chore from '../Chore.js';
import ReactDOM from 'react-dom';
import Formsy from 'formsy-react';
import Apartment from '../Apartment.js';
import DBManager from '../dbManager.js';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import {FormsyText, FormsyDate} from 'formsy-material-ui/lib';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';



const style = {
  chorebox: {
    width:256,
    minHeight:384,
    textAlign:'center',
    padding:'12px',
  },
  messagebody: {
    minHeight:'80px',
    borderRadius: '6px',
    padding:'6px',
    backgroundColor:'rgba(135,125,102,0.1)',
    border:'2px solid rgba(224, 224, 224,0.8)',
  },
};
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
     * @param {Object} props - Properties passed by parent. See propTypes
     */
    constructor(props) {
        super(props);

        this.errorMessages = {
            wordsError: "Please only use letters",
            numericError: "Please provide a number"
        };

        this.state = {
            tenants: []
        };

        this.setTenantsList = this.setTenantsList.bind(this);
        this.enableSubmit = this.enableSubmit.bind(this);
        this.disableSubmit = this.disableSubmit.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInvalidSubmit = this.handleInvalidSubmit.bind(this);
        this.loopAddChores = this.loopAddChores.bind(this);
        this.addChore = this.addChore.bind(this);

        this.choreIterator = 0;
    }

    /**
     * Function called when component mounts.
     *
     * @method componentDidMount
     */
    componentDidMount() {
        this.setTenantsList();
    }

    /**
     * Sets the tenants list in state.
     *
     * @method setTenantsList
     */
    setTenantsList() {
        var manager = new DBManager();
        var tenants = [];
        manager.getApartment().then(function(apartment) {
            var tenantIDs = apartment.getTenantIDs();
            tenantIDs.forEach(function(tenantID) {
                manager.getUser(tenantID).then(function(user) {
                    tenants.push(user);
                    this.setState({tenants: tenants});
                }.bind(this));
            }.bind(this));
        }.bind(this));
    }

    /**
     * Enables form submission.
     *
     * @method enableSubmit
     */
    enableSubmit() {
        this.setState({
            canSubmit: true
        });
    }

    /**
     * Disables form submission.
     *
     * @method disableSubmit
     */
    disableSubmit() {
        this.setState({
            canSubmit: false
        });
    }

    /**
     * Validates data submitted through the form.
     *
     * @method validateData
     * @param {Obj} data - The form data
     * @return {boolean} - Whether form is valid or not
     */
    validateData(data) {
        console.log("data: ",data);
        var yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        if (yesterday >= data.choreFirstDueDate) {
            console.log('Cannot assign chores due in the past');
            return false;
        }
        var repeatFrequency = parseInt(data.choreRepeatFreqency);
        if (repeatFrequency < 1 || repeatFrequency > 365) {
            console.log('Repeat frequency must be between 1 and 365, inclusive');
            return false;
        }
        var numberOccurrences = parseInt(data.choreNumberOccurrences);
        if (numberOccurrences < 1 || numberOccurrences > 100) {
            console.log('Number of occurrences must be between 1 and 100, inclusive');
            return false;
        }
        return true;
    }

    /**
     * Loops through chores and adds them to database.
     * Uses callbacks to avoid using stale caches.
     *
     * @method loopAddChores
     * @param {Array[Chore]} chores - Chores to be added
     */
    loopAddChores(chores) {
        this.addChore(chores[this.choreIterator], function() {
            this.choreIterator += 1;

            if (this.choreIterator < chores.length) {
                this.loopAddChores(chores);
            }
        }.bind(this));
    }

    /**
     * Adds a chore to the database and calls the callback
     * function after successfully adding it.
     *
     * @method addChore
     * @param {Chore} newChore - The chore to be added
     * @param {function} callback - The callback function
     */
    addChore(newChore, callback) {
        var manager = new DBManager();
        manager.addChore(newChore, callback);
    }

    /**
     * Handles when Chore Form is submitted by pushing the
     * desired Chore(s) to the database.
     *
     * @method handleSubmit
     * @param {Object} data - Chore data to be added to database
     */
    handleSubmit(data) {
        this.choreIterator = 0;

        if (this.validateData(data)) {
            console.log("submitting chore");
            console.log(data);

            var name = data.choreName;
            var assignee = data.choreAssignee;
            var firstDueDate = data.choreFirstDueDate;
            var numberOccurrences = parseInt(data.choreNumberOccurrences);
            var repeatFrequency = parseInt(data.choreRepeatFrequency);
            var details = data.choreDetails;

            var manager = new DBManager();
            var aptID = manager.getApartment().then(function (apt) {
                return apt.getAptID();
            });
            var UID = manager.getUser().then(function (user) {
                return user.getUserID()
            });
            Promise.all([UID, aptID]).then(values => {
                var newChores = [];
                do {
                    var assignedDueDate = new Date();
                    assignedDueDate.setFullYear(firstDueDate.getFullYear());
                    assignedDueDate.setMonth(firstDueDate.getMonth());
                    assignedDueDate.setDate(firstDueDate.getDate() + (newChores.length * repeatFrequency));
                    var newChore = new Chore(values[0], values[1], name, assignedDueDate, details, assignee);
                    newChores.push(newChore);
                    console.log(newChore);
                } while (newChores.length < numberOccurrences);
                this.loopAddChores(newChores);
            });
        }
    }

    /**
     * Handles invalid form submission.
     *
     * @method handleInvalidSubmit
     * @param {Object} data - The invalid data submitted
     */
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
              <div style={style.chorebox}>
              <CardTitle title="Assign a Chore" />
              <Divider />
                  <Formsy.Form ref="addChores"
                      onValid={this.enableSubmit}
                      onInvalid={this.disableSubmit}
                      onValidSubmit={this.handleSubmit}
                      onInvalidSubmit={this.handleInvalidSubmit} >
                      <FormsyText
                          name="choreName"
                          floatingLabelText="Chore Name"
                          fullWidth={true}
                          validations="isWords"
                          validationError={this.errorMessages.wordsError}
                          required={true} />
                      <FormsyText
                          name="choreAssignee"
                          floatingLabelText="Assignee"
                          fullWidth={true}
                          validations="isWords"
                          validationError={this.errorMessages.wordsError}
                          required={true} />
                      <FormsyDate
                          name="choreFirstDueDate"
                          floatingLabelText="Due Date"
                          required={true} />
                      <FormsyText
                          name="choreNumberOccurrences"
                          floatingLabelText="Number of Occurrences"
                          validations="isNumeric"
                          fullWidth={true}
                          validationError={this.errorMessages.numericError}
                          required={true} />
                      <FormsyText
                          name="choreRepeatFrequency"
                          validations="isNumeric"
                          floatingLabelText="Repeat Frequency (in Days)"
                          fullWidth={true}
                          validationError={this.errorMessages.numericError}
                          required={true} />
                      <FormsyText
                          hintText="Additional Details"
                          multiLine={true}
                          fullWidth={true}
                          rows={1}
                          textareaStyle={style.messagebody}
                          name="choreDetails" />
                    <CardActions>
                      <RaisedButton fullWidth={true}
                          type="submit"
                          label="Send chores"
                          primary={false}
                          secondary={true} />
                    </CardActions>
                  </Formsy.Form>
              </div>
          );
    }
}

          // var _label = this.state.sending ? "Sending..." : this.state.sent ? "Sent!" : "Send Message";
          // <Formsy.Form ref="addMessage" onValidSubmit={this.addItem} >
          //   <CardText>
          //     <FormsyText required={true} fullWidth={true} name="messageText" hintText={"Type message here"} multiLine={true} rows={1} textareaStyle={style.messagebody} underlineDisabledStyle={null} errorText="Message Field cannot be empty"/>
          //   </CardText>
          //   <CardActions>
          //   <RaisedButton fullWidth={true} type="submit" label={_label} primary={false} secondary={true} disabled={this.state.sent}/>
          //   </CardActions>
          // </Formsy.Form>
