import React from 'react';
import ReactDOM from 'react-dom';

import Formsy from 'formsy-react';
import { FormsyToggle } from 'formsy-material-ui/lib';
/**
 * Represents a Chore Row
 *
 * @class React.Componet.ChoreRow
 * @extends React.Component
 */
export default class ChoreRow extends React.Component {
    /**
     * Constructs a Chore Row
     *
     * @method constructor
     * @constructor
     * @params {Object} props - Properties passed by parent
     */
    constructor(props) {
        super(props);

        this.handleToggle = this.handleToggle.bind(this);
    };

    /**
     * Handle toggle to complete chore
     *
     * @method handleToggle
     * @param {Event} e - Event fired when toggle
     * @param {boolean} value - Whether button is toggled or not
     */
    handleToggle(e, value) {
        if (value) {
            this.props.onCompletion();
        }
        else {
            this.props.onUncompletion();
        }
    }

    /**
     * Renders a Chore Row
     *
     * @method render
     */
    render() {
        var chore = this.props.chore;
        var checkbox = (
                <Formsy.Form>
                    <FormsyToggle
                        name="isCompleted"
                        label=""
                        defaultToggled={chore.getCompletionDate() ? true : false}
                        onChange={this.handleToggle}
                    />
                </Formsy.Form>
            );
        return (
            <tr>
                <td>{checkbox}</td>
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
}
