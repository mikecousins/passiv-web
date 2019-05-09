import React from 'react';
import { connect } from 'react-redux';
import { Button } from '../styled/Button';
import { injectStripe } from 'react-stripe-elements';
import { loadSubscription } from '../actions';
import { postData } from '../api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import styled from '@emotion/styled';
import { H2, P } from '../styled/GlobalElements';
import { Link } from 'react-router-dom';
import Card from '../styled/Card';

const InputStyle = styled.div``;

const ErrorContainer = styled.div``;

export class CheckoutForm extends React.Component {
  state = {
    error: null,
    loading: false,
  };

  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  async submit(event) {
    this.setState({ loading: true, error: null });
    this.props.startCreateSubscription();
    let { token } = await this.props.stripe.createToken({ name: 'Name' });
    postData(`/api/v1/subscriptions`, { token: token, period: 'annual' })
      .then(response => {
        console.log('success', response.data);
        this.setState({ loading: false });
        this.props.reloadSubscription();
        this.props.finishCreateSubscription();
      })
      .catch(error => {
        console.log('error', error.response.data);
        this.setState({ loading: false, error: error.response.data.detail });
        // this.props.reloadSubscription();
        this.props.finishCreateSubscriptionFail();
      });
  }

  render() {
    let error = null;
    if (this.state.error) {
      switch (this.state.error.code) {
        case '1015':
          error = (
            <ErrorContainer>
              <H2>Payment could not be processed</H2>
              <P>
                Check that you have entered your payment information correctly
                or <Link to="/app/help">contact support</Link> if that doesn't
                help.
              </P>
            </ErrorContainer>
          );
          break;
        case '0000':
          error = (
            <ErrorContainer>
              <H2>Payment could not be processed</H2>
              <P>
                Oops, you've encountered a bug! Please try again later or{' '}
                <Link to="/app/help">contact support</Link> if this persists.
              </P>
            </ErrorContainer>
          );
          break;
        default:
          error = (
            <ErrorContainer>
              <H2>Payment could not be processed</H2>
              <P>
                Oops, you've encountered a bug! Please try again later or{' '}
                <Link to="/app/help">contact support</Link> if this persists.
              </P>
            </ErrorContainer>
          );
          break;
      }
    }

    return (
      <InputStyle>
        <Card />
        {!this.state.loading && this.state.error && <div>{error}</div>}
        {this.props.loading ? (
          <div>
            Processing your payment... <FontAwesomeIcon icon={faSpinner} spin />
          </div>
        ) : (
          <Button onClick={this.submit}>Submit</Button>
        )}
      </InputStyle>
    );
  }
}

const actions = { reloadSubscription: loadSubscription };

export default connect(
  null,
  actions,
)(injectStripe(CheckoutForm));
