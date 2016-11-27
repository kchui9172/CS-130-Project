import React from 'react';
import ReactDOM from 'react-dom';

import Formsy from 'formsy-react';
import { FormsyToggle } from 'formsy-material-ui/lib';

import DBManager from '../dbManager.js';
import ToggleButton from './ToggleButton.js';

/**
 * Represents a Chore Row.
 *
 * @class React.Component.ChoreRow
 * @extends React.Component
 */
export default class ChoreRow extends React.Component {
    /**
     * Constructs a Chore Row.
     *
     * @method constructor
     * @constructor
     * @param {Object} props - Properties passed by parent
     */
    constructor(props) {
        super(props);

        this.state = {
            assigneeName: ""   
        };

        this.setAssigneeName = this.setAssigneeName.bind(this);
    }

    /**
     * Function called when component mounts.
     *
     * @method componentDidMount
     */
    componentDidMount() {
        this.setAssigneeName();
    }

    setAssigneeName() {
        var manager = new DBManager();
        manager.getUser(this.props.chore.getAssignment()).then(function(user) {
            this.setState({assigneeName: user.getName()});
        }.bind(this));
    }

    /**
     * Renders a Chore Row.
     *
     * @method render
     */
    render() {
        var chore = this.props.chore;
        return (
            <tr>
                <td>
                    <ToggleButton 
                        onCompletion={this.props.onCompletion}
                        onUncompletion={this.props.onUncompletion}
                        getDefaultToggle={this.props.getDefaultToggle}
                        toggleCallback={this.props.toggleCallback}
                        toggledObject={chore}
                    />
                </td>
                <td>{chore.getChoreID()}</td>
                <td>{chore.getCategory()}</td>
                <td>{chore.getCreator()}</td>
                <td>{chore.getDeadline()}</td>
                <td>{chore.getDetails()}</td>
                <td>{chore.getAssignment()}</td>
                <td>{chore.getCreationDate()}</td>
                <td>{chore.getCompletionDate()}</td>
            </tr>
        );
    }
};

ChoreRow.propTypes = {
    chore: React.PropTypes.object.isRequired,
    onCompletion: React.PropTypes.func.isRequired,
    onUncompletion: React.PropTypes.func.isRequired,
    getDefaultToggle: React.PropTypes.func.isRequired,
    toggleCallback: React.PropTypes.func.isRequired
};
