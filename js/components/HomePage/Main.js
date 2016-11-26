import React, {Component, PropTypes} from 'react';
import FlatButton from 'material-ui/RaisedButton';
import SwipeableViews from 'react-swipeable-views';

import FAB from '../primitives/FAB.js';
import NavDrawer from '../primitives/NavDrawer.js';
import AddAptDialog from './AddAptDialog.js';

import ChoresView from './Views/ChoresView.js';
import MessagesView from './Views/MessagesView.js';

import MessageEditor from './Cards/MessageEditor.js';

import {List, ListItem, makeSelectable} from 'material-ui/List';
import Badge from 'material-ui/Badge';
import Email from 'material-ui/svg-icons/communication/email';
import Payment from 'material-ui/svg-icons/action/payment';
import EventNote from 'material-ui/svg-icons/notification/event-note';
import Divider from 'material-ui/Divider';
import Exit from 'material-ui/svg-icons/action/exit-to-app';
import Settings from 'material-ui/svg-icons/action/settings';

import DBManager from '../../dbManager.js';

const style = {
  mainview: {
    marginLeft:56,
  },
  firstItem: {
    marginTop:48,
  },
};

const colors = {
  primary : 'rgba(101, 86, 177, 0.8)',
  primaryHover : 'rgba(151, 86, 177, 1)',
  listHover:'rgba(151, 86, 177, 0.3)',
  red:'rgb(216, 15, 4)',
  messageBlue:'rgb(56, 158, 255)',
  choreOrange:'rgb(60, 179, 113)',
  paymentGray:'#607D8B',
};

function wrapState(ComposedComponent) {
  return class SelectableList extends Component {
    static propTypes = {
      children: PropTypes.node.isRequired,
      defaultValue: PropTypes.number.isRequired,
    };

    componentWillMount() {
      this.setState({
        selectedIndex: this.props.defaultValue,
      });
    }

    handleRequestChange = (event, index) => {
      this.setState({
        selectedIndex: index,
      });
    };

    render() {
      return (
        <ComposedComponent
          value={this.state.selectedIndex}
          onChange={this.handleRequestChange}
        >
          {this.props.children}
        </ComposedComponent>
      );
    }
  };
};

let SelectableList = wrapState(makeSelectable(List));

export default class HomePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      openEditor: false,
      mainView:null,
    };
  };

  handleDrawerToggle = () => {
      this.setState({openEditor: true});
      console.log('FAB : ', true);
  };

  render() {
    return (
      <div>
        <NavDrawer>
        <SelectableList ref="navigation" defaultValue={0} >
          <ListItem onTouchTap={function(){this.setState({mainView: <MessagesView />})}.bind(this)} value={1} primaryText="Messages" leftIcon={<Email     color={colors.messageBlue} />} style={style.firstItem} />
          <ListItem onTouchTap={function(){this.setState({mainView: <ChoresView   />})}.bind(this)} value={2} primaryText="Chores"   leftIcon={<EventNote color={colors.choreOrange} />} />
          <ListItem onTouchTap={function(){this.setState({mainView: <PaymentsView />})}.bind(this)} value={3} primaryText="Payments" leftIcon={<Payment   color={colors.paymentGray} />}  />
        <Divider />
          <ListItem onTouchTap={function(){this.setState({mainView: <SettingsView />})}.bind(this)} value={4} primaryText="Settings" leftIcon={<Settings  color={colors.primary}     />} />
          <ListItem onTouchTap={function(){DBManager.LogOut()}}                                     value={5} primaryText="Logout"   leftIcon={<Exit      color={colors.red}         />} />
        </SelectableList>
        </NavDrawer>
        <FAB/>
        <div>{this.state.openEditor ? <MessageEditor/> : null}</div>
        <div style={style.mainview}>{this.state.mainView}</div>
      </div>
    );
  }
}

//<AddAptDialog/>
