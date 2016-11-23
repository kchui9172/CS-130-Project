import React from 'react';
import {List, ListItem} from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';

import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import Divider from 'material-ui/Divider';
import ActionInfo from 'material-ui/svg-icons/action/info';

import Exit from 'material-ui/svg-icons/action/exit-to-app';
import Settings from 'material-ui/svg-icons/action/settings';

const colors = {
  primary : 'rgba(101, 86, 177, 0.8)',
  primaryHover : 'rgba(151, 86, 177, 1)',
  listHover:'rgba(151, 86, 177, 0.3)',
}
const NavList = () => (
    <List>
      <ListItem primaryText="Inbox" leftIcon={<ContentInbox />} />
      <ListItem primaryText="Starred" leftIcon={<ActionGrade />} />
      <ListItem primaryText="Sent" leftIcon={<ContentSend />} />
      <ListItem primaryText="Drafts" leftIcon={<ContentDrafts />} />
    <Divider />
      <ListItem primaryText="Settings" leftIcon={<Settings color={colors.primary} hoverColor={colors.primaryHover}/>} />
      <ListItem primaryText="Logout" leftIcon={<Exit />} />
    </List>
);

export default NavList;
