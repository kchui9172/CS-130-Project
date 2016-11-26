import React from 'react';
import ReactDOM from 'react-dom';
import ChoreForm from './ChoreForm.js';
import ChoreTable from './ChoreTable.js';
import DBManager from '../dbManager.js';

/**
 * Represents the Chores page.
 *
 * @class React.Component.Chores
 * @extends React.Component
 */
export default class Chores extends React.Component {
    /**
     * Constructs the Chores page.
     *
     * @method constructor
     * @constructor
     */
    constructor() {
        super();
        this.state = { choresList: [] };
        this.setChoresList = this.setChoresList.bind(this);
    };

    setChoresList() {
        var manager = new DBManager();
        var choresList = [];
        manager.getChoreIDs().then(function (choreIDs) {
            choreIDs.forEach(function (choreID) {
                manager.getChore(choreID).then(function (chore) {
                    choresList.push(chore);
                    console.log('pushing chore :', chore);
                })
            })
        });
        this.setState({choresList: choresList});
    }

    componentDidMount() {
      this.setChoresList();
    }

    /**
     * Renders the Chores page.
     *
     * @method render
     */
    render() {
        return (
            <div>
                <h1>Chores</h1>
                <ChoreForm />
                <ChoreTable choreList={this.state.choresList} />
            </div>
        );
    }
}
