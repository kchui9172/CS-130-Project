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
                                    <ChoreCard chore={chore}
                                        key={chore.getChoreID()} />
                                </Column>
                            );
                        })
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
}
