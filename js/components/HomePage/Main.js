import React, {Component, PropTypes} from 'react';
import FlatButton from 'material-ui/RaisedButton';

import FAB from '../primitives/FAB.js';
import Loading from '../primitives/Loading.js';
import NavDrawer from '../primitives/NavDrawer.js';

import AddAptDialog from './AddAptDialog.js';

import HomeView from './Views/HomeView.js';
import ChoresView from './Views/ChoresView.js';
import MessagesView from './Views/MessagesView.js';
import PaymentsView from './Views/PaymentsView.js';
import SettingsView from './Views/SettingsView.js';
import MessageEditor from './Cards/MessageEditor.js';

import {List, ListItem, makeSelectable} from 'material-ui/List';
import Badge from 'material-ui/Badge';
import Email from 'material-ui/svg-icons/communication/email';
import Payment from 'material-ui/svg-icons/action/payment';
import EventNote from 'material-ui/svg-icons/notification/event-note';
import Divider from 'material-ui/Divider';
import Exit from 'material-ui/svg-icons/action/exit-to-app';
import Settings from 'material-ui/svg-icons/action/settings';

import {colors} from '../../config/MUI.js';
import DBManager from '../../dbManager.js';

const style = {
  mainview: {
    marginLeft:56,
  },
  firstItem: {
    marginTop:48,
  },
  loading:{
      textAlign:'center',
      padding:'512px',
  },
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

/**
 * Represents a Home Page.
 *
 * @class React.Component.HomePage
 * @extends React.Component
 */
export default class HomePage extends React.Component {
  /**
   * Constructs a Home Page.
   *
   * @method constructor
   * @constructor
   * @param {Object} props - Properties passed by parent
   */
  constructor(props) {
    super(props);
    this.state = {
      loading:  true,
      aptModal: false,
      menuFAB:  false,
      editorView: null,
      viewIndex:0,
    };
  };

  /**
   * Function called when component mounts.
   *
   * @method componentDidMount
   */
  componentDidMount () {
    this.setState({
          loading: false,
    });
  }

  /**
   * Handles drawer toggle.
   *
   * @method handleDrawerToggle
   */
  handleDrawerToggle = () => {
      this.setState({menuFAB: true});
      console.log('FAB : ', true);
  };

  /**
   * Renders a Home Page.
   *
   * @method render
   */
  render() {
    var currentView = null;
    if (this.state.viewIndex == 0)
      currentView = <HomeView />;
    else if (this.state.viewIndex == 1)
      currentView = <MessagesView />;
    else if (this.state.viewIndex == 2)
      currentView = <ChoresView />;
    else if (this.state.viewIndex == 3)
      currentView = <PaymentsView />;
    else if (this.state.viewIndex == 4)
      currentView = <SettingsView />;

    return ((this.state.loading) ? <Loading style={style.loading}/> :
    (
      <div>
        <AddAptDialog/>
        <NavDrawer>
        <SelectableList ref="navigation" defaultValue={0} >
          <ListItem onTouchTap={function(){this.setState({viewIndex: 1})}.bind(this)} value={1} primaryText="Messages" leftIcon={<Email     color={colors.message} />} style={style.firstItem} />
          <ListItem onTouchTap={function(){this.setState({viewIndex: 2})}.bind(this)} value={2} primaryText="Chores"   leftIcon={<EventNote color={colors.chore}   />}  />
          <ListItem onTouchTap={function(){this.setState({viewIndex: 3})}.bind(this)} value={3} primaryText="Payments" leftIcon={<Payment   color={colors.payment} />}  />
        <Divider />
          <ListItem onTouchTap={function(){this.setState({viewIndex: 4})}.bind(this)} value={4} primaryText="Settings" leftIcon={<Settings  color={colors.primary}     />} />
          <ListItem onTouchTap={function(){DBManager.LogOut()}}                       value={5} primaryText="Logout"   leftIcon={<Exit      color={colors.red}         />} />
        </SelectableList>
        </NavDrawer>
        <FAB view={this.state.viewIndex}/>
        <div style={style.mainview}>{currentView}</div>
        <div ref="snacker"></div>
      </div>
    )
    );
  }
}

//this.setState({mainView: <MessagesView />})
