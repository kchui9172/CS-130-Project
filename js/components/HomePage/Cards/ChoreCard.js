import React from 'react';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/RaisedButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import FloatingCard from '../../primitives/FloatingCard.js';

import Chore from '../../../Chore.js'

const style = {
  text: {
    textAlign:'justify',
    paddingLeft:'16px',
  },

  card: {
    width:256,
    height:256,
    textAlign:'center',
    borderRadius: '6px',
  },
}

export default class ChoreCard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var chore = this.props.chore;
        if (chore) {
            return (
                <FloatingCard style={style.card}>
                    <CardTitle title="Chore"/>
                    <CardText style={style.text}>
                        <p>Assignment: {chore.getAssignment()}</p>
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
