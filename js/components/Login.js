import React, {Component} from 'react';
import {Grid, Row, Column} from 'react-cellblock';
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import {Tabs, Tab} from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/RaisedButton';
import SwipeableViews from 'react-swipeable-views';
import {deepOrange500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import ActionFlightTakeoff from 'material-ui/svg-icons/action/flight-takeoff';

/** Use factory method to generate the correct type of login card **/

const cardTypes = ['LoginCard', 'SignupCard'];

const Text = [
    {
        title: 'Hello Again!',
        subtitle: 'Login to your account',
        email: 'spongebob@bikinibottom.com',
        password : 'theSecretFormula',
        button: 'Login',
    },
    {
        title: 'Welcome to Rockmates!',
        subtitle: 'Create a new account',
        name: 'Sponge Bob',
        email: 'squarepants@bikinibottom.com',
        password : 'theSecretFormula',
        phone: 'XXX-XXX-XXXX',
        button: 'Sign Up',
    },
];

const Theme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

const style = {
    zDepth:5,
    container: {

         maxWidth: 320,
    },
    contents: {
        textAlign: 'center',
    },

    tabs:{

    },
    raisedBox: {
        border: '1px solid #77aaff',
        boxShadow:  '-1px 1px #77aaff,-2px 2px #77aaff,-3px 3px #77aaff,-4px 4px #77aaff,-5px 5px #77aaff',
    },
    slide: {
        padding: 10,
    },
};


export default class Login extends React.Component {

    constructor(props, context) {
        super(props, context);

        document.body.style.backgroundColor = '#f5efe6';//'#48466D';//'#cfd8dc';
        this.state = {
            slideIndex: 0,
            username: null,
            password: null,
            fullname: null,
            phone: null,
        };
      }

    handleChange = (value) => {
      this.setState({
        slideIndex: value,
      });
    };

    // handleLogin() {
    //     this.setState({ cardType: (this.state.cardType == cardTypes[0]) ? cardTypes[1] : cardTypes[0]});
    // }
    //
    // handleSignUp() {
    //     this.setState({ cardType: (this.state.cardType == cardTypes[0]) ? cardTypes[1] : cardTypes[0]});
    // }

    render() {

      var TypeID = this.state.slideIndex;
      var classes = [{TypeID}];

      const CredentialCard = (
        <Card className={classes} style={Object.assign(style.container)} zDepth={style.zDepth}>
          <div>
            <Tabs onChange={this.handleChange} value={this.state.slideIndex}>
                <Tab label={Text[0].button} value={0} />
                <Tab label={Text[1].button} value={1} />
            </Tabs>
            <SwipeableViews index={this.state.slideIndex} onChangeIndex={this.handleChange}>
                    <div style={style.contents}>
                        <form>
                        <CardTitle title = {Text[0].title} subtitle = {Text[0].subtitle}/>
                        <TextField floatingLabelText="Username" errorText="This field is required"/>
                        <TextField floatingLabelText="Password" errorText="This field is required" type="password"/>
                        <CardActions>
                            <FlatButton type="submit" label={Text[0].button} secondary={true} fullWidth={true} onTouchTap={this.handleLogin}/>
                        </CardActions>
                        </form>
                    </div>
                    <div style={style.contents} >
                        <CardTitle title = {Text[1].title} subtitle = {Text[1].subtitle} />
                        <TextField floatingLabelText="Full Name"/>
                        <TextField floatingLabelText="Username"/>
                        <TextField floatingLabelText="Password" type="password"/>
                        <CardActions>
                            <FlatButton type="submit" label={Text[1].button} secondary={true} fullWidth={true} onTouchTap={this.handleSignUp}/>
                        </CardActions>
                    </div>
            </SwipeableViews>
          </div>
        </Card>
    );

    const Layout =  (
  <Grid breakpoints={[1,3]} flexible={true} gutterWidth={0} columnWidth={style.container.maxWidth} onChange={breakpoint => {}} >
    <Row>
      <Column width="1/3" offset="1/3">
        {CredentialCard}
      </Column>
    </Row>
  </Grid>
);
    //return CredentialCard;
    return Layout;
  }
}
