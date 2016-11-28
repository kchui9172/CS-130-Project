import React from 'react';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/RaisedButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import Avatar from 'material-ui/Avatar';
import AccountCircle from 'material-ui/svg-icons/action/account-circle';
import Event from 'material-ui/svg-icons/action/event';
import FloatingCard from '../../primitives/FloatingCard.js';
import DBManager from '../../../dbManager.js';
import Chore from '../../../Chore.js';
import ToggleButton from '../../ToggleButton.js';
import Loading from '../../primitives/Loading.js';
import Time from 'react-time';
import Chip from 'material-ui/Chip';
import {colors} from '../../../config/MUI.js';

const style = {
  text: {
    textAlign:'justify',
    paddingLeft:'16px',
  },
  title:{
    overflowWrap:'break-word',
    paddingTop:'0px',
    paddingBottom:'0px',
  },
  header:{
    paddingBottom:'0px',
  },
  card: {
    width:256,
    minHeight:384,
    textAlign:'center',
    borderRadius: '6px',
  },

  messagebody: {
    minHeight:'80px',
    borderRadius: '6px',
    padding:'6px',
    backgroundColor:'rgba(135,125,102,0.1)',
    border:'2px solid rgba(224, 224, 224,0.8)',
  },

  chip:{
    margin:'1px',
  },

  chip2:{
    margin:'6px',
  },
  chips:{
    display: 'flex',
   overflowX: 'scroll',
  },
}


/**
 * Represents a Chore Card.
 *
 * @class React.Component.ChoreCard
 * @extends React.Component
 */
export default class ChoreCard extends React.Component {
    /**
     * Constructs a Chore Card.
     *
     * @method constructor
     * @constructor
     * @param {Object} props - Properties passed by parent. See propTypes
     */
    constructor(props) {
        super(props);

        this.state = {
            assigneeName: "",
            name:"",
            deadline:"",
            overdue:"",
            assignment:"",
            deadlineLabel:"",
            details:[],
            categoryLabels:[],
            loading: true,
        };

        this.setAssigneeName = this.setAssigneeName.bind(this);
    }

    /**
     * Function called when component mounts.
     *
     * @method componentDidMount
     */
    componentDidMount() {
        this.setAssigneeName();
        this.populateLabels();
    }

    populateLabels() {
      var chore = this.props.chore;
      var now = new Date();
      var _date = new Date(chore.getDeadline());
      var _assignment = chore.getAssignment();
      var _details = chore.getDetails();
      var _name = chore.getName();
      var _chips = [];
      var categoryTokens = (chore.getCategory()).split(" ").forEach(function(category){_chips.unshift(<Chip style={style.chip}>{category}</Chip>);});
      var _chipColor = (now > _date) ? colors.timestampOverdue : colors.timestampFuture;
      var _dueText = (now > _date) ? "Overdue" : null;
      this.setState({
        name:_name,
        deadline:_date,
        overdue:_dueText,
        deadlineLabel:_chipColor,
        assignment:_assignment,
        details:_details,
        categoryLabels:_chips,
      });
    }
    /**
     * Sets assigneeName in state.
     *
     * @method setAssigneeName
     */
    setAssigneeName() {
        var manager = new DBManager();
        manager.getUser(this.props.chore.getAssignment()).then(function(user) {
            this.setState({assigneeName: user.getName(),loading:false})}.bind(this), function(err) {console.log('error on evaluating name for assigner', err);this.setState({assigneeName: "",loading:false});}.bind(this));
    }

    /**
     * Gets Date from DateTime string.
     *
     * @method getDateOnly
     * @param {string} dateTime - The DateTime to extract from
     */
    getDateOnly(dateTime) {
        return dateTime.split('T')[0];
    }

    /**
     * Renders a Chore Card.
     *
     * @method render
     */
    render() {
            var contents = (!this.state.loading) ? (
                            <div><CardHeader style={style.header} avatar={<ToggleButton
                                  onCompletion={this.props.onCompletion}
                                  onUncompletion={this.props.onUncompletion}
                                  getDefaultToggle={this.props.getDefaultToggle}
                                  toggleCallback={this.props.toggleCallback}
                                  toggledObject={this.props.chore}
                              />}></CardHeader><CardTitle style={style.title} title={this.state.name} />
                              <CardText style={style.text}>
                              <div>
                                <Chip style={style.chip2} ><Avatar backgroundColor={colors.profile} icon={<AccountCircle />} />{this.state.assigneeName}</Chip>
                                <Chip style={style.chip2} backgroundColor={this.state.deadlineLabel} ><Avatar backgroundColor={colors.chore} icon={<Event />} /><Time value={this.state.deadline} format="YYYY/MM/DD hh:mm a"/></Chip>
                              </div>
                              <p style={style.messagebody}>{this.state.details}</p>
                              <div style={style.chips}>{this.state.categoryLabels}</div>
                              </CardText></div>) : (<Loading />);
            return (
                <FloatingCard style={style.card}>
                  {contents}
                </FloatingCard>
            );
    }
};

ChoreCard.propTypes = {
    chore: React.PropTypes.object.isRequired,
    key: React.PropTypes.string.isRequired,
    onCompletion: React.PropTypes.func.isRequired,
    onUncompletion: React.PropTypes.func.isRequired,
    getDefaultToggle: React.PropTypes.func.isRequired,
    toggleCallback: React.PropTypes.func.isRequired
};
