import React, { Component } from 'react';
import { beginAuthorization } from '../actions';

class AuthorizationPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brokerage: '',
      type: '',
    };
    this.handleBrokerageChange = this.handleBrokerageChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
  }

  handleBrokerageChange(event) {
    this.setState({brokerage: event.target.value});
  }

  handleTypeChange(event) {
    this.setState({type: event.target.value});
  }

  selectBrokerageById(id) {
    return this.props.brokerages.find(x => x.id === id)
  }

  render() {
    let brokerages = null;
    if (this.props.brokerages) {
      brokerages = this.props.brokerages.map((brokerage, index) => {
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
          onClick={() => {beginAuthorization(this.state)}}
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
          onChange={this.handleBrokerageChange}
        >
          <option disabled value="">Choose your brokerage</option>
          {brokerages}
        </select>
        <select
          className="px-4 py-2 mx-2 rounded"
          value={this.state.type}
          onChange={this.handleTypeChange}
        >
          <option disabled value="">Select an access level</option>
          {types}
        </select>
        {submitButton}
      </div>
    )
  }
}

export default AuthorizationPicker;
