import React, {Component} from 'react';
import {Row, Column} from 'react-cellblock';

import ChoreCard from './HomePage/Cards/ChoreCard.js';

export default class ChoreCardRow extends React.Component {
    constructor(props) {
        super(props);
    }

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
    getDefaultToggle: React.PropTypes.func.isRequired
};
