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
            assigneeName: "",
            creatorName: ""
        };

        this.setAssigneeName = this.setAssigneeName.bind(this);
        this.setCreatorName = this.setCreatorName.bind(this);
    }

    /**
     * Function called when component mounts.
     *
     * @method componentDidMount
     */
    componentDidMount() {
        this.setAssigneeName();
        this.setCreatorName();
    }

    /**
     * Sets the assignee name in state.
     *
     * @method setAssigneeName
     */
    setAssigneeName() {
        var manager = new DBManager();
        manager.getUser(this.props.chore.getAssignment()).then(function(user) {
            this.setState({assigneeName: user.getName()});
        }.bind(this));
    }

    /**
     * Sets the creator name in state.
     *
     * @method setCreatorName
     */
    setCreatorName() {
        var manager = new DBManager();
        manager.getUser(this.props.chore.getCreator()).then(function(user) {
            this.setState({creatorName: user.getName()});
        }.bind(this));
    }

    /**
     * Gets Date from DateTime string.
     *
     * @method getDateOnly
     * @param {string} dateTime - The DateTime to extract from
     */
    getDateOnly(dateTime) {
        if(dateTime == null)
          return null;
        return dateTime.split('T')[0];
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
                <td>{this.state.creatorName}</td>
                <td>{this.getDateOnly(chore.getDeadline())}</td>
                <td>{chore.getDetails()}</td>
                <td>{this.state.assigneeName}</td>
                <td>{this.getDateOnly(chore.getCreationDate())}</td>
                <td>{this.getDateOnly(chore.getCompletionDate())}</td>
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
