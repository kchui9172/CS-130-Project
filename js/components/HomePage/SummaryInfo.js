import React from 'react';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/RaisedButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import FloatingCard from '../primitives/FloatingCard.js';

const style = {
  text: {
    textAlign:'justify',
    paddingLeft:'16px',
  },
}
const styleBig = {
    zDepth:1,
    padding: '0px',
    textAlign: 'center',
    width:300,
    height:160,
    borderRadius:'3px',
    overflowY:'scroll',
};

const styleSmall = {
    zDepth:2,
    padding: '18px',
    textAlign: 'center',
    borderRadius: '18px',
    minWidth:320,
    filter: 'invert(100%)',
    maxWidth:320,
};

const BigView = (
  <FloatingCard style={styleBig}>
    <CardTitle title="CardTitle"/>
    <CardText style={style.text}>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mattis pretium massa.
    </CardText>
  </FloatingCard>);

const SmallView = (
    <Card style={styleSmall} zDepth={styleSmall.zDepth}>
      <CardMedia>
        <img src='https://upload.wikimedia.org/wikipedia/en/4/4d/SpongeBob_SquarePants_characters_cast.png'/>
      </CardMedia>
    </Card>);

export default class SummaryInfo extends React.Component {
  static propTypes = {
    colWidth: React.PropTypes.number // How wide is this component in “grid units”?
  };

  render() {
  //  const view = (this.props.colWidth >= 0 ) ? (<div>{BigView}</div>) : (<div>{SmallView}</div>);
    return (<div>{BigView}</div>);//(view);
  }
};

//observeGrid
