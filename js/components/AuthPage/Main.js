import React, {Component} from 'react';
import {Grid, Row, Column} from 'react-cellblock';
import SummaryInfo from './SummaryInfo.js';
import CredentialsCard from './CredentialsCard.js';

const style = {
  drawer: {
    zIndex: '998',
    position: 'absolute',
  },
  content: {
    position:'absolute',
    paddingTop:'156px',
  },
};

const ResponsiveSummary = (SummaryInfo);

/** 
 * Represents an Authentication Page.
 *
 * @class React.Component.AuthPage
 * @extends React.Component
 */
export default class AuthPage extends React.Component {
  /**
   * Constructs an Authentication Page.
   *
   * @method constructor
   * @constructor
   * @param {Object} props - Properties passed by parent
   */  
  constructor(props) {
    super(props);
    this.state = {
    };
  };

  /**
   * Renders an Authenticatio Page.
   *
   * @method render
   */
  render() {
    return (
        <div style={style.contents} >
          <Grid  breakpoints={[3]}  columnWidth={280} gutterWidth={48} onChange={breakpoint => {}} >
            <Row>
              <Column width="2/3"> <ResponsiveSummary /> <br/>
              </Column>
              <Column width="1/3"> <CredentialsCard /> </Column>
            </Row>
          </Grid>
        </div>
    );
  }
}
