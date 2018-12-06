import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectBrokerages } from '../selectors';
import { postData } from '../api';
import { baseUrl } from '../actions';

class AuthorizationPicker extends Component {
  state = {
    brokerage: '',
    type: '',
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
      types = this.props.brokerages.find(x => x.id === this.state.brokerage).authorization_types.map((type, index) => {
        return <option key={type.type} value={type.type}>{type.type}</option>
      })
    }

    let submitButton = (
      <button
        type="button"
        className="bg-grey text-white font-bold py-2 px-4 mx-2 rounded focus:outline-none focus:shadow-outline"
        disabled
      >
        Connect
      </button>
    )
    if (this.state.brokerage && this.state.type) {
      submitButton = (
          <button
          type="button"
          onClick={() => {this.startAuthorization()}}
          className="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 mx-2 rounded focus:outline-none focus:shadow-outline"
          >
            Connect
          </button>
      )
    }

    return (
      <div className="my-2">
        <select
          className="px-4 py-2 mx-2 rounded"
          value={this.state.brokerage}
          onChange={(event) => {this.setState({brokerage: event.target.value})}}
        >
          <option disabled value="">Choose your brokerage</option>
          {brokerageOptions}
        </select>
        <select
          className="px-4 py-2 mx-2 rounded"
          value={this.state.type}
          onChange={(event) => {this.setState({type: event.target.value})}}
        >
          <option disabled value="">Select an access level</option>
          {types}
        </select>
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
