import React, {Component} from 'react';
import {Grid} from 'react-cellblock';

import ChoreCardRow from './ChoreCardRow.js';

export default class ChoreCardGrid extends React.Component {
    constructor(props) {
        super(props);
    }

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
    getDefaultToggle: React.PropTypes.func.isRequired
};
