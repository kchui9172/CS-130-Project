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

const style={
  messages:{
    backgroundColor:colors.message,
  },
};
/**
 * Represents a Payments View.
 *
 * @class React.Component.PaymentsView
 * @extends React.Component
 */
export default class HomeView extends React.Component {
  /**
   * Constructs a Payments View.
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
        address: "715 Gayle Ave. Los Angeles",
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
  render() {
      var name = this.state.userName;
      var title = "Welcome " + name +"!";
      var i = this.state.tenants.indexOf(name);
      if (i > -1) this.state.tenants.splice(i, 1);
      var _chips = [];
      var tenants = this.state.tenants.forEach(function(tenant){_chips.unshift(<Chip>{tenant}</Chip>);});

  return(
    <Grid breakpoints={[1]} flexible={true} columnWidth={960} gutterWidth={20} onChange={breakpoint => {}} >
          <Row>
            <Column>
              <Card>
                <CardTitle title={title}
                    subtitle={this.state.address}
                />
                <Divider />
                <h2> Roommmates </h2>
                {_chips}
                </Card>
            </Column>
          </Row>
        </Grid>
    );
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
