import React, {Component} from 'react';
import {Grid, Row, Column} from 'react-cellblock';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FloatingCard from '../../primitives/FloatingCard.js';
import ActionHome from 'material-ui/svg-icons/action/home';
import {colors} from '../../../config/MUI.js';
import Email from 'material-ui/svg-icons/communication/email';
import Payment from 'material-ui/svg-icons/action/payment';
import EventNote from 'material-ui/svg-icons/notification/event-note';
import DBManager from '../../../dbManager.js';
import Divider from 'material-ui/Divider';
import Apartment from '../../../Apartment.js';
import User from '../../../User.js';
import Chip from 'material-ui/Chip';
import RoommateCardRow from '../../RoommateCardRow.js';
import RoommateCard from '../../RoommateCard.js';
//import NavBar from '../../NavBar.js';

const style={
  title: {
    overflowWrap:'break-word',
    textAlign: 'center',
  },
  text:{
    textAlign:'center',
    paddingLeft:'16px',
  },
  chip2:{
    margin:'6px',
  },
  messages:{
    backgroundColor:colors.message,
  },
  heading:{
    textAlign: 'center',
    padding: '16px',
  }
};
/**
 * Represents a Payments View.
 *
 * @class React.Component.PaymentsView
 * @extends React.Component
 */
export default class HomeView extends React.Component {
  /**
   * Constructs a Home View.
   *
   * @method constructor
   * @constructor
   * @param {Object} props - Properties passed by parent
   * @param {Object} context - Context passed by parent
   */
  constructor(props, context) {
      super(props, context);
      this.state = {
        userName: "",
        address: "715 Gayley Ave. Los Angeles",
        tenants: [],
      };
  }


  /**
   * Function called when the component mounts.
   *
   * @method componentDidMount
   */
  componentDidMount(){
      var roomies = [];
      var manager = new DBManager();
      manager.getUser().then(function(user) {
          this.setState({userName: user.getName()});
          manager.getApartment().then(function(apt) {
              this.setState({address: apt.getAddress()});
              apt.getTenantIDs().forEach(function (value) {
                  manager.getUser(value).then(function (usr) {
                      roomies.push(usr.getName());
                      this.setState({tenants: roomies});
                  }.bind(this));
              }.bind(this));
          }.bind(this));
      }.bind(this));
  }

  /**
   * Renders a Payments View.
   *
   * @method render
   */

  /*render() {
      var name = this.state.userName;
      var title = "Welcome " + name +"!";
      var i = this.state.tenants.indexOf(name);
      if (i > -1) this.state.tenants.splice(i, 1);
      var _chips = [];
      var tenants = this.state.tenants.forEach(function(tenant){_chips.unshift(<Chip style={style.chip2}>{tenant}</Chip>);});

  return(
    <Grid breakpoints={[1]} flexible={true} columnWidth={960} gutterWidth={20} onChange={breakpoint => {}} >
          <Row>
            <Column>
              <Card>
                <CardTitle style={style.title} title={title}
                    subtitle={this.state.address}
                />
                <Divider />
                <CardText style = {style.text}>
                <div>
                  <h1> Roommates </h1>
                    {_chips}
                </div>
                </CardText>
                </Card>
            </Column>
          </Row>
        </Grid>
    );
  }*/

  render() {
      var name = this.state.userName;
      var title = "Welcome " + name +"!";
      var i = this.state.tenants.indexOf(name);
      if (i > -1) this.state.tenants.splice(i, 1);
      var _chips = [];
      var tenants = this.state.tenants.forEach(function(tenant){_chips.unshift(<Chip style={style.chip2}>{tenant}</Chip>);});
      var list = [];
      list.push(this.state.tenants);
    

      if (list && list.length > 0){
        return(
          <div>
            <Grid breakpoints={[1]} flexible={true} columnWidth={960} gutterWidth={20} onChange={breakpoint => {}} >
                <Row>
                  <Column>
                    <Card>
                      <CardTitle style={style.title} title={title}
                          subtitle={this.state.address}
                      />
                      </Card>
                  </Column>
                </Row>
            </Grid>
            <h1 style={style.heading}> Roommates </h1>
            <Grid breakpoints={[4]} flexible={true} columnWidth={280} gutterWidth={20} onChange={breakpoint => {}} >
              {list.map(
                  function (roommate) {
                    return(
                      <RoommateCardRow
                        roommate={roommate}
                      />
                    );
                  }.bind(this))
              }
            </Grid>
          </div>
          );
      }else{
        return null;
      }
  }
};


// <br/>
// <Row>
// <Column width="1/3">
//   <FloatingCard>
//     <CardMedia>
//     <Email className='frosted button-card' style={style.messages}/>
//     </CardMedia>
//   </FloatingCard>
// </Column>
// <Column width="1/3">
//   <FloatingCard>
//     <CardMedia>
//     <EventNote className='frosted button-card' style={style.messages}/>
//     </CardMedia>
//   </FloatingCard>
// </Column>
// <Column width="1/3">
//   <FloatingCard>
//     <CardMedia>
//     <Payment className='frosted button-card' style={style.messages}/>
//     </CardMedia>
//   </FloatingCard>
// </Column>
// </Row>
// <br/>
