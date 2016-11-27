import React from 'react';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/RaisedButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import FloatingCard from '../../primitives/FloatingCard.js';
import DBManager from '../../../dbManager.js';
import Chore from '../../../Chore.js';
import ToggleButton from '../../ToggleButton.js';

const style = {
  text: {
    textAlign:'justify',
    paddingLeft:'16px',
  },

  card: {
    width:256,
    height:384,
    textAlign:'center',
    borderRadius: '6px',
  },
}

/**
 * Represents a Chore Card.
 *
 * @class React.Component.ChoreCard
 * @extends React.Component
 */
export default class ChoreCard extends React.Component {
    /**
     * Constructs a Chore Card.
     *
     * @method constructor
     * @constructor
     * @param {Object} props - Properties passed by parent. See propTypes
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

    /**
     * Sets assigneeName in state.
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
     * Renders a Chore Card.
     *
     * @method render
     */
    render() {
        var chore = this.props.chore;
        if (chore) {
            return (
                <FloatingCard style={style.card}>
                    <CardTitle title="Chore"></CardTitle>
                    <CardText style={style.text}>
                        <ToggleButton
                            onCompletion={this.props.onCompletion}
                            onUncompletion={this.props.onUncompletion}
                            getDefaultToggle={this.props.getDefaultToggle}
                            toggleCallback={this.props.toggleCallback}
                            toggledObject={chore}
                            label="Completed? "
                        />
                        <p>Assignment: {this.state.assigneeName}</p>
                        <p>Deadline: {chore.getDeadline()}</p>
                        <p>Category: {chore.getCategory()}</p>
                        <p>Details: {chore.getCategory()}</p>
                    </CardText>
                </FloatingCard>
            );
        }
        else {
            return null;
        }
    }
};

ChoreCard.propTypes = {
    chore: React.PropTypes.object.isRequired,
    key: React.PropTypes.string.isRequired,
    onCompletion: React.PropTypes.func.isRequired,
    onUncompletion: React.PropTypes.func.isRequired,
    getDefaultToggle: React.PropTypes.func.isRequired,
    toggleCallback: React.PropTypes.func.isRequired
};
