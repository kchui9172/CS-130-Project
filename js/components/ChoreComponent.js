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
    };

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
                <ChoreTable choreList={this.props.choreList} />
            </div>
        );
    }
}
