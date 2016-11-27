import React, {Component} from 'react';
import {Row, Column} from 'react-cellblock';

import ChoreCard from './HomePage/Cards/ChoreCard.js';

/**
 * Represents a Chore Card Row.
 *
 * @class React.Component.ChoreCardRow
 * @extends React.Component
 */
export default class ChoreCardRow extends React.Component {
    /**
     * Constructs a Chore Card Row.
     *
     * @method constructor
     * @constructor
     * @param {Object} props - Properites passed by parent. See propTypes
     */
    constructor(props) {
        super(props);
    }

    /**
     * Renders a Chore Card Row.
     *
     * @method render
     */
    render() {
        if (this.props.choreList &&
            this.props.choreList.length > 0) {
            return (
                <div>
                    <Row>
                    {this.props.choreList.map(
                        function (chore) {
                            return (
                                <Column width="1/4">
                                    <ChoreCard 
                                        chore={chore}
                                        key={chore.getChoreID()}
                                        onCompletion={this.props.onCompletion}
                                        onUncompletion={this.props.onUncompletion}
                                        getDefaultToggle={this.props.getDefaultToggle}
                                        toggleCallback={this.props.toggleCallback}
                                    />
                                </Column>
                            );
                        }.bind(this))
                    } 
                    </Row>
                    <br/>
                    <br/>
                </div>
            )
        }
        else {
            return null;
        }
    }
};

ChoreCardRow.propTypes = {
    choreList: React.PropTypes.array.isRequired,
    onCompletion: React.PropTypes.func.isRequired,
    onUncompletion: React.PropTypes.func.isRequired,
    getDefaultToggle: React.PropTypes.func.isRequired,
    toggleCallback: React.PropTypes.func.isRequired
};
