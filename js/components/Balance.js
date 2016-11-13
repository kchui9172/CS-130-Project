import React from 'react';
import ReactDOM from 'react-dom';
import DBManager from '../dbManager.js';
import User from '../User.js';
import Payment from '../Payment.js';

/**
 * Represents a Balance.
 *
 * @class React.Component.Balance
 * @extends React.Component
 */
export default class Balance extends React.Component {
    /**
     * Constructs a Balance.
     *
     * @method constructor
     * @constructor
     */
    constructor() {
        super();

      	this.state = {
            items: []
        }

       	this.addItem = this.addItem.bind(this);
    };

    addItem(e) {

    }


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


    /**
     * Renders a Balance between two users.
     *
     * @method render
     */
    render() {
    	return (
    	    <div>
                Balances
    	    </div>
    	);
    }
}
