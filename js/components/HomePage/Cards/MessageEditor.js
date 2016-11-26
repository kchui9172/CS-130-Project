import React from 'react';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/RaisedButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import MessageForm from '../../MessageForm.js';
import FloatingCard from '../../primitives/FloatingCard.js';

import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

const style = {
  card: {
    width: '640px',
    position: 'fixed',
    right:'200px',
    bottom:'0px',
    margin:'30px',
  },
};

/**
 * Represents the Messages page.
 *
 * @class React.Component.Messages
 * @extends React.Component
 */
export default class MessageEditor extends React.Component {

  constructor(props, context) {
      super(props, context);
  }

  render() {
  return(
    <div style={style.card}>
    <Toolbar>
        <ToolbarGroup firstChild={true}>
          <DropDownMenu value={1} onChange={this.handleChange}>
            <MenuItem value={1} primaryText="All Broadcasts" />
            <MenuItem value={2} primaryText="All Voice" />
            <MenuItem value={3} primaryText="All Text" />
            <MenuItem value={4} primaryText="Complete Voice" />
            <MenuItem value={5} primaryText="Complete Text" />
            <MenuItem value={6} primaryText="Active Voice" />
            <MenuItem value={7} primaryText="Active Text" />
          </DropDownMenu>
        </ToolbarGroup>
        <ToolbarGroup>
          <ToolbarTitle text="Options" />
          <FontIcon className="muidocs-icon-custom-sort" />
          <ToolbarSeparator />
          <RaisedButton label="Create Broadcast" primary={true} />
          <IconMenu
            iconButtonElement={
              <IconButton touch={true}>
                <NavigationExpandMoreIcon />
              </IconButton>
            }
          >
            <MenuItem primaryText="Download" />
            <MenuItem primaryText="More Info" />
          </IconMenu>
        </ToolbarGroup>
      </Toolbar>
      <FloatingCard zDepth={5}>
      <CardTitle title="Add a new Message" subtitle="asmdk" />
        <CardText>
          <MessageForm />
        </CardText>
    </FloatingCard>
    </div>
    );
  }
};