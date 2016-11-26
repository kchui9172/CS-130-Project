import React, {Component} from 'react';
import {Grid, Row, Column} from 'react-cellblock';

import Chore from '../../../Chore.js'
import ChoreComponent from '../../ChoreComponent.js';
import ChoreCardGrid from '../../ChoreCardGrid.js';
import DBManager from '../../../dbManager.js';

export default class ChoresView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            incompleteChoresList: [],
            completeChoresList: [],
            allChoresList: []
        }

        this.findInsertionIndex = this.findInsertionIndex.bind(this);
        this.insertChoreSorted = this.insertChoreSorted.bind(this);
        this.setChoresLists = this.setChoresLists.bind(this);
    }

    findInsertionIndex(choreList, chore) {
        var index = 0;
        while (index < choreList.length) {
            if (chore.getDeadline() < choreList[index].getDeadline()) {
                break;
            }
            index += 1;
        }
        return index;
    }

    insertChoreSorted(choreList, chore) {
        var insertionIndex = this.findInsertionIndex(choreList, chore);
        choreList.splice(insertionIndex, 0, chore);
        return choreList;
    }

    setChoresLists() {
        var manager = new DBManager();
        var incompleteChoresList = [];
        var completeChoresList = [];
        manager.getChoreIDs().then(function (choreIDs) {
            choreIDs.forEach(function (choreID) {
                manager.getChore(choreID).then(function (chore) {
                    if (chore.getCompletionDate()) {
                        completeChoresList = this.insertChoreSorted(completeChoresList, chore);
                    }
                    else {
                        incompleteChoresList = this.insertChoreSorted(incompleteChoresList, chore);
                    }
                    this.setState({
                        incompleteChoresList: incompleteChoresList,
                        completeChoresList: completeChoresList,
                        allChoresList: incompleteChoresList.concat(completeChoresList)
                    });
                }.bind(this))
            }.bind(this))
        }.bind(this));
    }

    componentDidMount() {
        this.setChoresLists();
    }


    render() {
        if (this.state.allChoresList &&
            this.state.allChoresList.length > 0)
            return (
                <div>
                    <ChoreCardGrid choreList={this.state.incompleteChoresList} />
                    <Grid breakpoints={[1]} flexible={true} columnWidth={960} gutterWidth={20} onChange={breakpoint => {}} >
                        <Row>
                            <Column offset="1/16" width="7/8">
                                <ChoreComponent choreList={this.state.allChoresList} />
                            </Column>
                        </Row>
                    </Grid>
                </div>
            );
        else {
            return null;
        }
    }
};
// <Grid breakpoints={[4]} flexible={true} columnWidth={280} gutterWidth={20} onChange={breakpoint => {}} >
//   <Row>
//     <Column width="1/4"> <ChoresCard /> </Column>
//     <Column width="1/4"> <ChoresCard /> </Column>
//     <Column width="1/4"> <ChoresCard /> </Column>
//     <Column width="1/4"> <ChoresCard /> </Column>
//   </Row>
//   <br/>
//   <Row>
//     <Column width="1/4"> <ChoresCard /> </Column>
//     <Column width="1/4"> <ChoresCard /> </Column>
//     <Column width="1/4"> <ChoresCard /> </Column>
//     <Column width="1/4"> <ChoresCard /> </Column>
//   </Row>
//   <br/>
//   <Row>
//     <Column width="1/4"> <ChoresCard /> </Column>
//     <Column width="1/4"> <ChoresCard /> </Column>
//   </Row>
// </Grid>
