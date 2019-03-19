import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { postData } from '../api';
import { initialLoad } from '../actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import ShadowBox from '../styled/ShadowBox';
import { H1, P } from '../styled/GlobalElements';
import { Step } from '../styled/SignupSteps';

class QuestradeOauthPage extends Component {
  state = {
    started: false,
    loading: false,
    error: null,
    success: false,
    token: '',
  }

  finishAuthorization() {
    let urlParams = new URLSearchParams(window.location.search);
    let token = urlParams.get('code');

    if (token === null) {
      this.setState({loading: false, error: {
        code: '0000',
      }});
    }
    else {
      if (!this.state.started) {
        this.setState({started: true, loading: true});
        postData('/api/v1/brokerages/authComplete/', { token: token })
          .then(response => {
            console.log('success', response.data);
            this.props.reloadAllState();
            setTimeout(() => {
              this.setState({loading: false, success: true});
            }, 1000);
          })
          .catch(error => {
            this.setState({loading: false, error: error.response.data});
            console.log('error', error.response.data);
          });
      }
    }
  }

  componentDidMount() {
    this.finishAuthorization();
  }

  render() {
    let error = null;
    if (this.state.error) {
      switch (this.state.error.code) {
        case '1006':
          error = (
            <P>This connection code is invalid, please try again.</P>
          );
          break;
        case '1007':
          error = (
            <P>This connection code has expired, please try again.</P>
          );
          break;
        case '0000':
          error = (
            <P>No access code was provided by Questrade. Did you approve the connection request?</P>
          );
          break;
        default:
          error = (
            <P>We encountered an unexpected error while attempting to establish a connection. Please try again later or <Link to="/app/help">contact support</Link> if this persists.</P>
          );
          break;
      }
    }

    if (this.state.success) {
      return (
        <Redirect to='/app/dashboard' />
      )
    }
    else {
      return (
        <ShadowBox dark>
          <H1 color="white">SETUP</H1>

          {
            this.state.loading ? (
                <React.Fragment>
                  <Step>Establishing connection to Questrade... <FontAwesomeIcon icon={faSpinner} spin /></Step>

                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Step>Failed to establish connection :(</Step>
                  <ShadowBox>
                    { error }
                  </ShadowBox>
                </React.Fragment>
              )
          }
        </ShadowBox>
      )
    }
  };
}

const select = state => ({});
const actions = {
  reloadAllState: initialLoad,
};

export default connect(select, actions)(QuestradeOauthPage);
