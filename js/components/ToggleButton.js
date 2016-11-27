import React from 'react';
import ReactDOM from 'react-dom';

import Formsy from 'formsy-react';
import { FormsyToggle } from 'formsy-material-ui/lib';

/**
 * Represents a Toggle Button.
 *
 * @class React.Component.ToggleButton
 * @extends React.Component
 */
export default class ToggleButton extends React.Component {
    /**
     * Constructs a Toggle Button.
     *
     * @method constructor
     * @constructor
     * @param {Object} props - Properties passed by parent. See propTypes
     */
    constructor(props) {
        super(props);

        this.handleToggle = this.handleToggle.bind(this);
    };

    /**
     * Handles toggle to complete chore.
     *
     * @method handleToggle
     * @param {Event} e - Event fired when toggle
     * @param {boolean} value - Whether button is toggled or not
     */
    handleToggle(e, value) {
        var toggledObject = this.props.toggledObject;
        if (value) {
            this.props.onCompletion(toggledObject);
        }
        else {
            this.props.onUncompletion(toggledObject);
        }
        this.props.toggleCallback();
    }

    /**
     * Renders a Toggle Button.
     *
     * @method render
     */
    render() {
        var toggledObject = this.props.toggledObject;
        return (   
            <Formsy.Form>
                <FormsyToggle
                    name="isCompleted"
                    label={this.props.label ? this.props.label : null}
                    defaultToggled={this.props.getDefaultToggle(toggledObject)}
                    onChange={this.handleToggle}
                />
            </Formsy.Form>
        );
    }
};

ToggleButton.propTypes = {
    onCompletion: React.PropTypes.func.isRequired,
    onUncompletion: React.PropTypes.func.isRequired,
    getDefaultToggle: React.PropTypes.func.isRequired,
    toggleCallback: React.PropTypes.func.isRequired,
    toggledObject: React.PropTypes.object.isRequired,
    label: React.PropTypes.string
};
