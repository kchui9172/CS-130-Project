import React, {Component} from 'react';
import {Row, Column} from 'react-cellblock';

//import ChoreCard from './HomePage/Cards/ChoreCard.js';
import RoommateCard from './RoommateCard.js';
/**
 * Represents a Roommate Card Row.
 *
 * @class React.Component.RoommateCardRow
 * @extends React.Component
 */
export default class RoommateCardRow extends React.Component {
    /**
     * Constructs a Roommate Card Row.
     *
     * @method constructor
     * @constructor
     * @param {Object} props - Properites passed by parent. See propTypes
     */
    constructor(props) {
        super(props);
    }

    /**
     * Renders a Roomate Card Row.
     *
     * @method render
     */
    render() {
        console.log("rowwing");
        console.log("props: ",this.props.roommate);
        if (this.props.roommate &&
            this.props.roommate.length > 0) {
            return (
                <div>
                    <Row>
                    {this.props.roommate.map(
                        function (name) {
                            return (
                                <Column width="1/4">
                                    <RoommateCard 
                                        name={name}
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
