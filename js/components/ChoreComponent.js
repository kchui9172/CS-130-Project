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
     * @param {Object} props - Properties passed by parent. See propTypes
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
                <ChoreTable
                    choreList={this.props.choreList}
                    onCompletion={this.props.onCompletion}
                    onUncompletion={this.props.onUncompletion}
                    getDefaultToggle={this.props.getDefaultToggle}
                    toggleCallback={this.props.toggleCallback}
                />
            </div>
        );
    }
};

Chores.propTypes = {
    choreList: React.PropTypes.array.isRequired,
    onCompletion: React.PropTypes.func.isRequired,
    onUncompletion: React.PropTypes.func.isRequired,
    getDefaultToggle: React.PropTypes.func.isRequired,
    toggleCallback: React.PropTypes.func.isRequired
};
