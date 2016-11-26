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
            return (
                <div>
                    <Grid breakpoints={[4]} flexible={true} columnWidth={280} gutterWidth={20} onChange={breakpoint => {}} >
                        <ChoreCardRow choreList={this.props.choreList.slice(0,4)} />
                        <ChoreCardRow choreList={this.props.choreList.slice(4,8)} />
                        <ChoreCardRow choreList={this.props.choreList.slice(8,12)} />
                    </Grid>
                </div>
            );
        }
        else {
            return null;
        }
    }
} 
