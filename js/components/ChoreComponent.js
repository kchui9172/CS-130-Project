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
     * @param {Object} props - Properties passed by parent
     */
    constructor(props) {
        super(props);
        
        this.state = { choresList: [] };

        this.componentDidMount = this.componentDidMount.bind(this);
        this.setChoresList = this.setChoresList.bind(this);
    };

    componentDidMount() {
        this.setChoresList();
    }

    setChoresList() {
        var manager = new DBManager();
        var myChoresList = [];
        manager.signIn("bob@gmail.com", "password").then(function () {
            manager.getChoreIDs().then(function (choreIDs) {
                choreIDs.forEach(function (choreID) {
                    manager.getChore(choreID).then(function (chore) {
                        myChoresList.push(chore);
                        this.setState({choresList: myChoresList});
                    }.bind(this))
                }.bind(this))
            }.bind(this))
        }.bind(this));
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
