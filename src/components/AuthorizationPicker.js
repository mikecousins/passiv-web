import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectBrokerages } from '../selectors';
import { postData } from '../api';
import { baseUrl } from '../actions';
import { Button } from '../styled/Button';
import { DisabledButton } from '../styled/DisabledButton';

class AuthorizationPicker extends Component {
  state = {
    allowSelect: this.props.allowSelect === undefined ? true : this.props.allowSelect,
    brokerage: this.props.brokerage ? this.props.brokerage : '',
    type: this.props.type ? this.props.type : '',
  }

  startAuthorization() {
    postData(`${baseUrl}/api/v1/brokerages/${this.state.brokerage}/authorize/`, {type: this.state.type})
      .then(response => {
        console.log('success', response);
        window.location = response.url;
      })
      .catch(error => {console.log('error', error)});
  }

  render() {
    const { brokerages } = this.props;

    let brokerageOptions = null;
    if (brokerages) {
      brokerageOptions = brokerages.map((brokerage, index) => {
        return <option key={brokerage.id} value={brokerage.id}>{brokerage.name}</option>
      })
    }

    let types = null;
    if (this.state.brokerage) {
      types = brokerages.find(x => x.id === this.state.brokerage).authorization_types.map((type, index) => {
        return <option key={type.type} value={type.type}>{type.type}</option>
      })
    }

    let submitButton = (
      <DisabledButton disabled>
        Connect
      </DisabledButton>
    )
    if (this.state.brokerage && this.state.type) {
      submitButton = (
          <Button onClick={() => {this.startAuthorization()}}>
            Connect
          </Button>
      )
    }

    return (
      <div>
        {this.state.allowSelect ? (
          <div>
            <select
              value={this.state.brokerage}
              onChange={(event) => {this.setState({brokerage: event.target.value})}}
            >
              <option disabled value="">Choose your brokerage</option>
              {brokerageOptions}
            </select>
            <select
              value={this.state.type}
              onChange={(event) => {this.setState({type: event.target.value})}}
            >
              <option disabled value="">Select an access level</option>
              {types}
            </select>
          </div>
        ) : (
          <div>Connect {this.props.brokerages.find(x => x.id === this.state.brokerage).name} to Passiv</div>
        )}

        {submitButton}
      </div>
    )
  }
}

const actions = {};

const select = state => ({
  brokerages: selectBrokerages(state),
});

export default connect(select, actions)(AuthorizationPicker);
