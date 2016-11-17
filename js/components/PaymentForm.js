import React from 'react';
import ReactDOM from 'react-dom';
import DBManager from '../dbManager.js';
import User from '../User.js';
import Payment from '../Payment.js';

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

       	this.addPayment = this.addPayment.bind(this);
    };

    /**
     * Generates a Date.
     *
     * @method generateDate
     * @return {string} - The generated date
     */
    generateDate() {
        var date = new Date();
    	var year = date.getUTCFullYear();
    	var month = date.getUTCMonth();
    	var day = date.getUTCDate();
    	//month 2 digits
    	month = ("0" + (month + 1)).slice(-2);

	   //year 2 digits
        year = year.toString().substr(2,2);

    	var formattedDate = month + '/' + day + "/" + year;
    	return formattedDate;
    }

//need function to check validity of due date 

    addPayment(e){
        var description = this._description.value;
        var category = this._category.value;
        var loaner = this._loaner.value;
        var loanee = this._loanee.value;
        var amount = parseFloat(this._amount.value);
        var dueDate = this._dueDate.value;
        var recurring = this._recurring.value;

        //console.log(amount);
        /*var regex  = /^\d+(?:\.\d{0,2})$/;
        console.log(regex.test(amount));
        var n = +amount;
        console.log(isNaN(n));
        console.log(parseFloat(amount));*/

        var today = new Date().toJSON().slice(0,10);
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
        e.preventDefault();
    }

    /**
     * Renders a Balance between two users.
     *
     * @method render
     */
    render() {
        return (
            <div>
                <form onSubmit={this.addPayment}>
                    <div>
                        <label> Payment Description </label>
                        <input ref={(a) => this._description = a} placeholder = "I.e. Ralphs"></input>
                    </div>
                    <div>
                        <label> Payment Category </label>
                        <input ref={(b) => this._category = b} placeholder ="I.e. groceries"></input>
                    </div>

                    <div>
                        <label> Loaner </label>
                        <select ref={(c) => this._loaner = c} name="cars">
                            <option value="Roommate 1">Roommate 1</option>
                            <option value="Roommate 2">Roommate 2</option>
                            <option value="Roommate 3">Roommate 3</option>
                            <option value="Roommate 4">Roommate 4</option>
                        </select>
                    </div>

                    <div>
                        <label> Loanee </label>
                        <select ref={(d) => this._loanee = d} name="cars">
                            <option value="Roommate 1">Roommate 1</option>
                            <option value="Roommate 2">Roommate 2</option>
                            <option value="Roommate 3">Roommate 3</option>
                            <option value="Roommate 4">Roommate 4</option>
                        </select>
                    </div>

                    <div>
                        <label> Amount </label>
                        <input ref={(m) => this._amount = m} type="text" min="0.01" max="100000"/>
                    </div>

                    <div>
                        <label> Due Date (leave empty if no date specified) </label>
                        <input ref={(f) => this._dueDate = f} type="date"/>
                    </div>

                    <div>
                        <label> Recurring Payment </label>
                        <select ref={(e) => this._recurring = e} name="recurring">
                            <option value="once">Once</option>
                            <option value="weekly">Weekly</option>
                            <option value="biweekly">Biweekly</option>
                            <option value="monthly">Monthly</option>
                        </select>
                    </div>

                    <button type="submit"> Submit </button>
                </form>
            </div>
        );
    }
}


/*
Things to change/check:
- put restriction of choosing due date after present time
*/



