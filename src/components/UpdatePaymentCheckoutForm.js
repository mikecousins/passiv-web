import React from 'react';
import { connect } from 'react-redux';
import { Button } from '../styled/Button';
import { CardElement, injectStripe } from 'react-stripe-elements';
import { loadSubscriptions } from '../actions';
import { patchData } from '../api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';


export class UpdatePaymentCheckoutForm extends React.Component {
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
    this.props.startUpdatePayment();
    let {token} = await this.props.stripe.createToken({name: "Name"});
    patchData('/api/v1/subscriptions', {token: token})
      .then(response => {
        console.log('success', response);
        this.setState({loading: false});
        this.props.reloadSubscriptions();
        this.props.finishUpdatePayment();
      })
      .catch(error => {
        console.log('error', error);
        this.setState({loading: false, error: error.detail});
        this.props.finishUpdatePaymentFail();
      });
  }
  render() {
    return (
      <div>
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
                Updating your card... <FontAwesomeIcon icon={faSpinner} spin />
              </div>
            ) : (
              <Button onClick={this.submit}>Submit</Button>
            )
        }
      </div>
    )
  }
}

const select = state => ({});
const actions = {reloadSubscriptions: loadSubscriptions};

export default connect(select, actions)(injectStripe(UpdatePaymentCheckoutForm));
