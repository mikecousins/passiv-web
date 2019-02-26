import React from 'react';
import { connect } from 'react-redux';
import { Button } from '../styled/Button';
// import { Elements } from 'react-stripe-elements';
import {CardElement, injectStripe} from 'react-stripe-elements';
import { loadSubscriptions } from '../actions';
import { postData } from '../api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import styled from '@emotion/styled';

const InputStyle = styled.div`
  input {
  }
`;


export class CheckoutForm extends React.Component {
  state = {
    error: null,
    loading: false,
  }

  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  async submit(event) {
    this.setState({loading: true, error: null});
    this.props.startCreateSubscription();
    let {token} = await this.props.stripe.createToken({name: "Name"});
    postData(`/api/v1/subscriptions`, {token: token, period: 'annual'})
      .then(response => {
        console.log('success', response.data);
        this.setState({loading: false});
        this.props.reloadSubscriptions();
        this.props.finishCreateSubscription();
      })
      .catch(error => {
        console.log('error', error.response.data);
        this.setState({loading: false, error: error.response.data.detail});
        this.props.finishCreateSubscriptionFail();
      });
  }
  render() {
    return (
      <InputStyle>
        <CardElement />
        {
          !this.state.loading && this.state.error && (
            <div>
              {this.state.error}
            </div>
          )
        }
        {
          this.props.loading ? (
              <div>
                Processing your payment... <FontAwesomeIcon icon={faSpinner} spin />
              </div>
            ) : (
              <Button onClick={this.submit}>Submit</Button>
            )
        }
      </InputStyle>
    )
  }
}

const select = state => ({});
const actions = {reloadSubscriptions: loadSubscriptions};

export default connect(select, actions)(injectStripe(CheckoutForm));
