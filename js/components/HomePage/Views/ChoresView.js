import React, {Component} from 'react';
import {Grid, Row, Column} from 'react-cellblock';

import Chore from '../../../Chore.js'
import ChoreComponent from '../../ChoreComponent.js';
import ChoreCardGrid from '../../ChoreCardGrid.js';
import DBManager from '../../../dbManager.js';

/**
 * Represents a Chores View.
 *
 * @class React.Component.ChoresView
 * @extends React.Component
 */
export default class ChoresView extends React.Component {
    /**
     * Constructs a Chores View.
     *
     * @method constructor
     * @constructor
     * @param {Object} props - Properties passed by parent
     */
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

    /**
     * Function called when chore is completed.
     *
     * @method onCompletion
     * @param {Chore} chore - The completed chore
     */
    onCompletion(chore) {
        chore.complete();
        var manager = new DBManager();
        manager.updateChore(chore);
    }

    /**
     * Function called when chore is marked not complete.
     * 
     * @method onUncompletion
     * @param {Chore} chore - The incomplete chore
     */
    onUncompletion(chore) {
        chore.uncomplete();
        var manager = new DBManager();
        manager.updateChore(chore);
    }

    /**
     * Function called to see if button should be toggled on/off.
     *
     * @method getDefaultToggle
     * @param {Chore} chore - The chore corresponding to the toggle
     */
    getDefaultToggle(chore) {
        return chore.getCompletionDate() ? true : false;
    }

    /**
     * Finds where a chore should be inserted based on soonest deadline.
     *
     * @method findInsertionIndex
     * @param {array{Chore}} choreList - The list of chores to be inserted into
     * @param {Chore} chore - The chore to insert
     * @return {int} - The index where the chore should be inserted
     */
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

    /**
     * Inserts the chore into a list based on soonest deadline.
     *
     * @method insertChoreSorted
     * @param {array{Chore}} choreList - The list of chores to be inserted into
     * @param {Chore} chore - The chore to insert
     * @return {array{Chore}} - The list of chores with the new chore inserted
     */
    insertChoreSorted(choreList, chore) {
        var insertionIndex = this.findInsertionIndex(choreList, chore);
        choreList.splice(insertionIndex, 0, chore);
        return choreList;
    }

    /**
     * Fetches chores from the database and sets
     * the ChoresLists.
     *
     * @method setChoresLists
     */
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

    /**
     * Function called when component mounts.
     *
     * @method componentDidMount
     */
    componentDidMount() {
        this.setChoresLists();
    }

    /**
     * Renders a Chores View.
     *
     * @method render
     */
    render() {
        var allChoresList = this.state.allChoresList;
        var completeChoresList = this.state.completeChoresList;
        var incompleteChoresList = this.state.incompleteChoresList;
        
        if (this.state.allChoresList &&
            this.state.allChoresList.length > 0)
            return (
                <div>
                    <ChoreCardGrid 
                        choreList={incompleteChoresList} 
                        onCompletion={this.onCompletion}
                        onUncompletion={this.onUncompletion}
                        getDefaultToggle={this.getDefaultToggle}
                        toggleCallback={this.setChoresLists}
                    />
                    <Grid breakpoints={[1]} flexible={true} columnWidth={960} gutterWidth={20} onChange={breakpoint => {}} >
                        <Row>
                            <Column offset="1/16" width="7/8">
                                <ChoreComponent 
                                    choreList={(incompleteChoresList.slice(12)).concat(completeChoresList)} 
                                    onCompletion={this.onCompletion}
                                    onUncompletion={this.onUncompletion}
                                    getDefaultToggle={this.getDefaultToggle}
                                    toggleCallback={this.setChoresLists}
                                />
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
