import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import DBManager from '../dbManager.js';
import User from '../User.js';
import Payment from '../Payment.js';

import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import {FormsyText, FormsyRadio,FormsyRadioGroup,FormsySelect,FormsyDate} from 'formsy-material-ui/lib';

import Formsy from 'formsy-react';

/*import FloatingCard from './primitives/FloatingCard.js';
import { CardActions, CardTitle, CardText} from 'material-ui/Card';*/

/**
 * Represents a PaymentForm.
 *
 * @class React.Component.PaymentForm
 * @extends React.Component
 */

export default class PaymentForm extends React.Component {
    /**
     * Constructs a Payment Form.
     *
     * @method constructor
     * @constructor
     */
    constructor() {
        super();

        this.state = { items: [] };

        this.componentDidMount = this.componentDidMount.bind(this);
        this.setTenantsList = this.setTenantsList.bind(this);
    };

    /**
     * Adds a Payment to the database.
     *
     * @method addPayment
     * @param {Object} e - The data sent on form submission
     */
    addPayment(e){
        var manager = new DBManager();
        if (e.userPos == "loaner"){
          console.log("user is loaner");
          manager.getUser().then(function(user){
            var uid = user.getUserID();
            console.log("uid: ",uid);
            var payment = new Payment(e.paymentAmount,uid,e.otherPos, new Date(),null,e.dueDate,e.paymentDescription,e.paymentCategory,e.recurringPeriod);
            manager.addPayment(payment);
          });
        }
        else{
          console.log("user is loanee");
          manager.getUser().then(function(user){
            var uid = user.getUserID();
            var payment = new Payment(e.paymentAmount, e.otherPos, uid, new Date(),null,e.dueDate,e.paymentDescription,e.paymentCategory,e.recurringPeriod);
            manager.addPayment(payment);
          });
        }
        //var payment = new Payment(e.paymentAmount,e.loaner,e.loanee, new Date(), null, e.dueDate, e.paymentDescription,e.paymentCategory,e.recurringPeriod);
        //manager.addPayment(payment);
        console.log("added payment");
        //}.bind(this));
    }

    /**
     * Gets the initial state.
     *
     * @method getInitialState
     */
    getInitialState(){
      return{
        validateAmount: true,
      };
    }

    /**
     * Enables amount validation.
     *
     * @method enableAmountValidation
     */
    enableAmountValidation(){
      this.setState({
        validateAmount: true,
      });
    }

    /**
     * Disables amount validation.
     *
     * @method disableAmountValidation
     */
    disableAmountValidation(){
      this.setState({
        validateAmount: false,
      });
    }

    /**
     * Sets tenant list in state.
     *
     * @method setTenantsList
     */
    setTenantsList() {
      var db = new DBManager();
      var tenants = [];
      db.getApartment().then(function(apt) {
        var tenantIDs = apt.getTenantIDs();
        console.log(tenantIDs);
        tenantIDs.forEach(function (tenantID) {
            db.getUser(tenantID).then(function (user) {
                db.getUser().then(function (curUser) {
                  if(curUser.getUserID() != user.getUserID()) {
                    tenants.push(user);
                    this.setState({items:tenants});
                  }
                }.bind(this))
            }.bind(this))
        }.bind(this))
      }.bind(this));
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
     * Renders a Balance between two users.
     *
     * @method render
     */
    render() {
        return (
            <div>
            <Formsy.Form ref="addPayment" onValidSubmit={this.addPayment} >
                <h3> Payment Description</h3>
                <FormsyText required={true}  name="paymentDescription" floatingLabelText={'Enter description'} multiLine={true} rows={2}/>

                <h3> Payment Category</h3>
                <FormsyRadioGroup name="paymentCategory" defaultSelected="groceries">
                  <FormsyRadio
                    value="groceries"
                    label="Groceries"
                  />
                  <FormsyRadio
                    value="meals"
                    label="Meals"
                  />
                  <FormsyRadio
                    value="rent"
                    label="Rent or Utilities"
                  />
                  <FormsyRadio
                    value="misc"
                    label="Misc"
                  />
                </FormsyRadioGroup>

                <h3>Are you the loaner or loanee?</h3>
                <FormsySelect
                  name="userPos"
                  required
                  floatingLabelText="Choose an option"
                >
                  <MenuItem value={'loaner'} primaryText="Loaner" />
                  <MenuItem value={'loanee'} primaryText="Loanee" />
                </FormsySelect>

                <h3> Other person involved in transaction</h3>
                <FormsySelect
                  name="otherPos"
                  required
                  floatingLabelText="Choose an option"
                >
                  {this.state.items.map(
                    function(tenant) {
                      return (<MenuItem value={tenant.getUserID()} primaryText={tenant.getName()}/>);
                    }
                  )}
                </FormsySelect>

                <h3>Amount</h3>
                <FormsyText required={true}  
                  name="paymentAmount" 
                  onBlur={this.enableAmountValidation}
                  onFocus={this.disableAmountValidation}
                  validations={this.state.validateAmount ? {isFloat:true} : {isExisty:true}}
                  validationError="Please provide a valid number" 
                  floatingLabelText={'Enter amount'}
                />

                <h3>Due date </h3>
                <FormsyDate
                  name="dueDate"
                  required
                  validations={{
                    checkDate: function(values,chosenDate){
                      if (chosenDate != null){
                        var date = (new Date(chosenDate.toDateString()+" 12:00:00 +0000")).toISOString().substring(0,10);  
                        var curDate = new Date().toISOString().substring(0,10);
                        return curDate <= date ? true : 'Invalid date: cannot choose date from past';
                      }
                    }
                  }}
                  floatingLabelText="Due Date"
                />

                <h3>Recurring Period </h3>
                <FormsySelect
                  name="recurringPeriod"
                  required
                  floatingLabelText="Select recurring period"
                >
                  <MenuItem value={'once'} primaryText="Once" />
                  <MenuItem value={'weekly'} primaryText="Weekly" />
                  <MenuItem value={'biweekly'} primaryText="Biweekly" />
                  <MenuItem value={'monthly'} primaryText="Monthly" />
                </FormsySelect>

                <RaisedButton fullWidth={false} type="submit" label="Add Payment" primary={false} secondary={true} />
            </Formsy.Form>

            </div>
        );
    }
}




