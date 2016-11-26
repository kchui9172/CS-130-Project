import React from 'react';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/RaisedButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import FloatingCard from '../../primitives/FloatingCard.js';

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

export default class ChoresCard extends React.Component {

  render() {
    return (
        <FloatingCard style={style.card}>
          <CardTitle title="Chore"/>
          <CardText style={style.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </CardText>
        </FloatingCard>
  );
  }
};
