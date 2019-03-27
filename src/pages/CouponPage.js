import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { putData } from '../api';
import { loadSettings, loadSubscriptions } from '../actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import ShadowBox from '../styled/ShadowBox';
import { H1,P } from '../styled/GlobalElements';
import { Step } from '../styled/SignupSteps';
import { selectSettings, selectSubscriptions } from '../selectors';
import styled from '@emotion/styled';

const BoldCode = styled.span`
  font-weight: 600;
  font-family: mono;
  font-display: block;
`;


class CouponPage extends Component {
  state = {
    loading: false,
    error: null,
    success: false,
  }

  finishAuthorization() {
    let urlParams = new URLSearchParams(window.location.search);
    let coupon = urlParams.get('code');

    let settings = Object.assign({}, this.props.settings);
    settings.coupon = coupon;
    this.setState({loading: true, code: coupon});

    putData('/api/v1/settings/', settings)
      .then(response => {
        this.setState({loading: false, success: true});
        this.props.refreshSettings();
        this.props.refreshSubscriptions();
      })
      .catch(error => {
        this.setState({loading: false, error: error.response.data});
        this.props.refreshSettings();
        this.props.refreshSubscriptions();
      });
  }

  componentDidMount() {
    this.finishAuthorization();
  }

  render() {
    let error = null;



    if (this.state.error) {
      console.log('error', this.state.error.code)
      switch (this.state.error.code) {
        case '1009':
          error = (
            <P>The coupon code <BoldCode>{ this.state.code }</BoldCode> is invalid or expired.</P>
          )
          break;
        default:
          error = (
            <P>We encountered an unexpected error while attempting to apply the coupon <BoldCode>{ this.state.code }</BoldCode> to your account. Please try again later or <Link to="/app/help">contact support</Link> if this persists.</P>
          )
          break;
      }
    }



    if (this.state.success) {
      return (
        <Redirect to='/app/settings' />
      )
    }
    else {
      return (
        <ShadowBox dark>
          <H1 color="white">Apply Coupon</H1>
          {
            this.state.loading ? (
                <React.Fragment>
                  <Step>Applying coupon <BoldCode>{ this.state.code }</BoldCode> to your account... <FontAwesomeIcon icon={faSpinner} spin /></Step>

                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Step>Failed to apply the coupon :(</Step>
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

const select = state => ({
  settings: selectSettings(state),
  subscriptions: selectSubscriptions(state),
});
const actions = {
  refreshSettings: loadSettings,
  refreshSubscriptions: loadSubscriptions,
};

export default connect(select, actions)(CouponPage);
