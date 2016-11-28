import React from 'react';
import Divider from 'material-ui/Divider';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import FloatingCard from './primitives/FloatingCard.js';
import Time from 'react-time';
import Chip from 'material-ui/Chip';
import {colors} from '../config/MUI.js';

import Avatar from 'material-ui/Avatar';
import AccountCircle from 'material-ui/svg-icons/action/account-circle';

const style = {
  text: {
    textAlign:'justify',
    paddingLeft:'16px',
  },
  image: {
    filter:'opacity(75%) saturate(70%) hue-rotate(3530deg)',
    boxShadow:'0 1px 2px rgba(0,0,0,0.25)',
  },
  title:{
    textAlign: 'left',
  },
  subtitle:{
  },
  header:{
    paddingBottom:'0px',
  },
  card: {
    width:256,
    minHeight:200,
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
 * Represents a Roommate Card.
 *
 * @class React.Component.RoommateCard
 * @extends React.Component
 */
export default class RoommateCard extends React.Component {
    /**
     * Constructs a Roommate Card.
     *
     * @method constructor
     * @constructor
     * @param {Object} props - Properties passed by parent. See propTypes
     */
    constructor(props) {
        super(props);

        //this.state = {
        //    name:"",
            //loading: true,
        //};

        //this.setAssigneeName = this.setAssigneeName.bind(this);
    }

    /**
     * Function called when component mounts.
     *
     * @method componentDidMount
     */
    /*componentDidMount() {
        this.populateLabels();
    }

    populateLabels() {
      var name = this.props.roommate;
      this.setState({
        name:_name,
      });
    }*/


    /**
     * Renders a Roommate Card.
     *
     * @method render
     */
    render() {
            /*var contents = (!this.state.loading) ? (
                            <div><CardHeader style={style.header}/>}></CardHeader>
                            <CardTitle style={style.title} title={this.state.name} />
                              <CardText style={style.text}>
                              <p style={style.messagebody}>Info here</p>
                              </CardText></div>) : (<Loading />);*/
            /*return (
                <FloatingCard style={style.card}>
                  "woot"
                </FloatingCard>
            );*/

            var contents = <div>
                              <CardHeader
                                titleStyle={style.title}
                                title={this.props.name}
                                subtitle={"userl2@mcil.com"}
                                subtitleStyle={style.subtitle}
                                showExpandableButton={true}
                                expandable={true}
                                avatar={<Avatar color={null} backgroundColor={colors.profile} icon={<AccountCircle />} />}
                              />
                            <Divider />
                            <CardText style={style.text} >
                            </CardText>
                          </div>;
            return(
              <FloatingCard style={style.card}>
                {contents}
              </FloatingCard>
            )
    }
};
// closeIcon={<Avatar color={null} backgroundColor={colors.profile} icon={<AccountCircle />} />}
// openIcon={<Avatar color={null} backgroundColor={colors.profile} icon={<AccountCircle />} />}
// <CardTitle  style={style.text} title={"Details"} />
