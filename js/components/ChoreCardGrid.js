import React, {Component} from 'react';
import {Grid} from 'react-cellblock';

import ChoreCardRow from './ChoreCardRow.js';

/**
 * Represents a Chore Card Grid.
 *
 * @class React.Component.ChoreCardGrid
 * @extends React.Component
 */
export default class ChoreCardGrid extends React.Component {
    /**
     * Constructs a Chore Card Grid.
     *
     * @method constructor
     * @constructor
     * @param {Object} props - Properties passed by parent. See propTypes
     */
    constructor(props) {
        super(props);
    }

    /**
     * Renders a Chore Card Grid.
     *
     * @method render
     */
    render() {
        if (this.props.choreList && 
            this.props.choreList.length > 0) {
            var lists = [];
            lists.push(this.props.choreList.slice(0,4));
            lists.push(this.props.choreList.slice(4,8));
            lists.push(this.props.choreList.slice(8,12));
            return (
                <div>
                    <Grid breakpoints={[4]} flexible={true} columnWidth={280} gutterWidth={20} onChange={breakpoint => {}} >
                        {lists.map(
                            function(choreList) {
                                return (
                                    <ChoreCardRow
                                        choreList={choreList}
                                        onCompletion={this.props.onCompletion}
                                        onUncompletion={this.props.onUncompletion}
                                        getDefaultToggle={this.props.getDefaultToggle}
                                        toggleCallback={this.props.toggleCallback}
                                    />
                                );
                            }.bind(this))
                        }
                    </Grid>
                </div>
            );
        }
        else {
            return null;
        }
    }
};

ChoreCardGrid.propTypes = {
    choreList: React.PropTypes.array.isRequired,
    onCompletion: React.PropTypes.func.isRequired,
    onUncompletion: React.PropTypes.func.isRequired,
    getDefaultToggle: React.PropTypes.func.isRequired,
    toggleCallback: React.PropTypes.func.isRequired
};
