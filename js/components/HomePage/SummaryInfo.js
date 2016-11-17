import React from 'react';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/RaisedButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import FloatingCard from '../primitives/FloatingCard.js';

const style = {
  text: {
    textAlign:'justify',
    padding:'20px',
  },
}
const styleBig = {
    zDepth:1,
    padding: '6px',
    textAlign: 'center',
    minWidth:320,
    height:'560px',
    maxWidth:'100%',
    borderRadius:'6px',
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
  <FloatingCard>
    <CardTitle title="Cool Facts about Rockmates" subtitle="Lorem Ipsum"/>
    <Divider/>
    <CardText style={style.text}>
    <p>  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
      Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
      Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.</p>

    <p>  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
      Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
      Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.</p>
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
