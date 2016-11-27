import React from 'react';
import ReactDOM from 'react-dom';
import DBManager from '../dbManager.js';
import User from '../User.js';
import Chore from '../Chore.js';
import ChoreRow from './ChoreRow.js'

/**
 * Represents a Chore Table.
 *
 * @class React.Component.ChoreTable
 * @extends React.Component
 */
export default class ChoreTable extends React.Component {
    /**
     * Constructs a Chore Table.
     *
     * @method constructor
     * @constructor
     */
    constructor(props) {
        super(props);
    }

    /**
     * Renders a Chore Table
     *
     * @method render
     */
    render() {
        return (
            <table className="choreTable">
                <thead>
                    <tr>
                        <th>Mark Completed?</th>
                        <th>Chore ID</th>
                        <th>Category</th>
                        <th>Creator</th>
                        <th>Deadline</th>
                        <th>Details</th>
                        <th>Assignee</th>
                        <th>Creation Date</th>
                        <th>Completion Date</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.choreList.map(
                        function(chore) {
                            return (<ChoreRow chore={chore} 
                                        key={chore.getChoreID()} 
                                        onCompletion={this.props.onCompletion} 
                                        onUncompletion={this.props.onUncompletion}
                                        getDefaultToggle={this.props.getDefaultToggle}
                                        toggleCallback={this.props.toggleCallback}
                                    />);
                        }.bind(this))
                    }
                </tbody>
            </table>
        );
    }
};

ChoreTable.propTypes = {
    choreList: React.PropTypes.array.isRequired,
    onCompletion: React.PropTypes.func.isRequired,
    onUncompletion: React.PropTypes.func.isRequired,
    getDefaultToggle: React.PropTypes.func.isRequired,
    toggleCallback: React.PropTypes.func.isRequired
};
