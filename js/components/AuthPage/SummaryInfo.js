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
    <CardTitle title="Cool Facts about Rockmates"/>
    <Divider/>
    <CardText style={style.text}>
    <p> Living with roommates in an apartment for the first time can be a daunting task.
    Keeping track of rent and utilities, making sure everyone is on top of their chores, and keeping everyone on the same page in terms of apartment news
    can be a hassle. Rockmates is the perfect tool to help organize your apartment! </p>
    <p>Cool features include: </p>
    <li> Message board for all apartment related news</li>
    <li> Clearly listed chores with functionality of marking as complete</li>
    <li> Tracking payments within the apartment </li>
    <br/>
    <p> Sign up to try Rockmates out! </p>
    </CardText>
  </FloatingCard>);

const SmallView = (
    <Card style={styleSmall} zDepth={styleSmall.zDepth}>
      <CardMedia>
        <img src='https://upload.wikimedia.org/wikipedia/en/4/4d/SpongeBob_SquarePants_characters_cast.png'/>
      </CardMedia>
    </Card>);

/**
 * Represents Summary Information
 *
 * @class React.Component.SummaryInfo
 * @extends React.Component
 */
export default class SummaryInfo extends React.Component {
  static propTypes = {
    colWidth: React.PropTypes.number // How wide is this component in “grid units”?
  };

  /**
   * Renders Summary Information
   *
   * @method render
   */
  render() {
  //  const view = (this.props.colWidth >= 0 ) ? (<div>{BigView}</div>) : (<div>{SmallView}</div>);
    return (<div>{BigView}</div>);//(view);
  }
};

//observeGrid
