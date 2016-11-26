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
const PaymentForm = React.createClass({
    /**
     * Constructs a Payment Form.
     *
     * @method constructor
     * @constructor
     */
    /*constructor() {
        super();

       	this.addPayment = this.addPayment.bind(this);
    };*/


    addPayment(e){
        var manager = new DBManager();
        //manager.signIn("bob@gmail.com","password").then(function(){
            var payment = new Payment(e.paymentAmount,e.loaner,e.loanee, new Date(), null, e.dueDate, e.paymentDescription,e.paymentCategory,e.recurringPeriod);
            manager.addPayment(payment);
            console.log("added payment");
        //}.bind(this));

       
        /*var regex  = /^\d+(?:\.\d{0,2})$/;
        console.log(regex.test(amount));
        var n = +amount;
        console.log(isNaN(n));
        console.log(parseFloat(amount));*/

        /*var today = new Date().toJSON().slice(0,10);
        console.log(today);

        if (isNaN(amount)){
            console.log("invalid amount entered");
        }

        //check that due date is not before today's date 
        else if (dueDate == "" || today <= dueDate){
            //add payment
            var db = new DBManager();
            var p = new Payment(amount,loaner,loanee,today,null,dueDate,description,category,recurring);
            console.log("payment added!");
        //IS DB OR USER IN CHARGE OF KEEPING TRACK OF PAYMENTS?
        }
        else{
            console.log("Can't set due date in past");           
        }
        //reset form
        this._description.value="";
        this._category.value="";
        this._loaner.value="";
        this._loanee.value="";
        this._amount.value="";
        this._dueDate.value="";
        this._recurring.value="";
        e.preventDefault();*/
    },

    getInitialState(){
      return{
        validateAmount: true,
      };
    },

    enableAmountValidation(){
      this.setState({
        validateAmount: true,
      });
    },

    disableAmountValidation(){
      this.setState({
        validateAmount: false,
      });
    },


    GetTenants(){
        console.log("hello");
        var manager = new DBManager();
        manager.signIn("bob@gmail.com","password").then(function(){
            console.log("in");
            manager.getApartment().then(function (apt){
                console.log("what");
                var tenants = apt.getTenantIDs();
                console.log(tenants);
                //If this actually worked, then would render form here and generate loaners/loanee dropdown here?
                //have a separate function so that when get to loaner/loanee renders dropdown options using for loop?
            })
        });
    },

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
                  <MenuItem value={'roommate1Loanee'} primaryText="Roommate 1" />
                  <MenuItem value={'roommate2Loanee'} primaryText="Roommate 2" />
                  <MenuItem value={'roommate3Loanee'} primaryText="Roommate 3" />
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

            <button onClick={this.GetTenants.bind(this)}>Test Getting Apartment Mates</button>
            </div>
        );
    },
});

export default PaymentForm;




