import React from 'react';
import { connect } from 'react-redux';
import { Button } from '../styled/Button';
// import { Elements } from 'react-stripe-elements';
import {CardElement, injectStripe} from 'react-stripe-elements';
import { baseUrl, loadSubscriptions } from '../actions';
import { postData } from '../api';



export class CheckoutForm extends React.Component {
  state = {
  }

  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  async submit(event) {
    console.log(event);
    let {token} = await this.props.stripe.createToken({name: "Name"});
    console.log('token', JSON.stringify(token));
    postData(`${baseUrl}/api/v1/subscriptions`, {token: token, period: 'annual'})
      .then(response => {
        console.log('success', response);
        this.props.reloadSubscriptions();
        this.props.finishCreateSubscription();
      })
      .catch(error => {
        console.log('error', error);
        this.props.reloadSubscriptions();
        this.props.finishCreateSubscription();
      });
  }
  //<CardElement />
  render() {
    return (
      <div className="checkout">
        <CardElement />
        <Button onClick={this.submit}>Submit</Button>
      </div>
    )
  }
}

const select = state => ({});
const actions = {reloadSubscriptions: loadSubscriptions};

export default connect(select, actions)(injectStripe(CheckoutForm));
