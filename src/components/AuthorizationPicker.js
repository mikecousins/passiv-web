import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectBrokerages } from '../selectors';
import { postData } from '../api';
import { Button } from '../styled/Button';
import { StepButton } from '../styled/SignupSteps';
import PlaidLink from 'react-plaid-link';

class AuthorizationPicker extends Component {
  state = {
    allowSelect:
      this.props.allowSelect === undefined ? true : this.props.allowSelect,
    allowSelectBrokerage:
      this.props.allowSelectBrokerage === undefined
        ? true
        : this.props.allowSelectBrokerage,
    allowSelectType:
      this.props.allowSelectType === undefined
        ? true
        : this.props.allowSelectType,
    updateBrokerageAuthorizationId:
      this.props.updateBrokerageAuthorizationId === undefined
        ? null
        : this.props.updateBrokerageAuthorizationId,
    brokerage: this.props.brokerage ? this.props.brokerage : '',
    type: this.props.type ? this.props.type : '',
    name: this.props.name ? this.props.name : 'Connect',
  };

  startAuthorization() {
    if (this.state.updateBrokerageAuthorizationId === null) {
      postData(`/api/v1/brokerages/${this.state.brokerage}/authorize/`, {
        type: this.state.type,
      }).then(response => {
        window.location = response.data.url;
      });
    } else {
      postData(
        `/api/v1/brokerages/${this.state.brokerage}/authorize/${this.state.updateBrokerageAuthorizationId}`,
        { type: this.state.type },
      ).then(response => {
        window.location = response.data.url;
      });
    }
  }

  handleOnClick() {
    postData(`/api/v1/brokerages/${this.state.brokerage.id}/authorize/`, {
      type: 'read',
    });
  }
  handleOnSuccess() {}
  handleOnExit() {}

  render() {
    const { brokerages, publicToken } = this.props;

    let brokerageOptions = null;
    if (brokerages) {
      brokerageOptions = brokerages.map((brokerage, index) => {
        return (
          <option key={brokerage.id} value={brokerage.id}>
            {brokerage.name}
          </option>
        );
      });
    }

    let types = null;
    if (this.state.brokerage) {
      types = brokerages
        .find(x => x.id === this.state.brokerage)
        .authorization_types.map((type, index) => {
          return (
            <option key={type.type} value={type.type}>
              {type.type}
            </option>
          );
        });
    }

    let submitButton = <Button disabled>Connect</Button>;
    if (this.state.brokerage && this.state.type) {
      if (this.props.publicToken) {
        submitButton = (
          <div onClick={() => this.handleOnClick()}>
            <PlaidLink
              clientName="Test App"
              env="sandbox"
              product={['investments']}
              publicKey="db7797dd137d1d2d7b519e5fdc998e"
              token={publicToken}
              onExit={() => this.handleOnExit}
              onSuccess={() => this.handleOnSuccess}
            >
              Connect With Plaid
            </PlaidLink>
          </div>
        );
      } else if (this.state.allowSelect) {
        submitButton = (
          <Button
            onClick={() => {
              this.startAuthorization();
            }}
          >
            {this.state.name}
          </Button>
        );
      } else {
        submitButton = (
          <StepButton
            onClick={() => {
              this.startAuthorization();
            }}
          >
            {this.state.name}
          </StepButton>
        );
      }
    }

    return (
      <React.Fragment>
        {this.state.allowSelect && (
          <div>
            {this.state.allowSelectBrokerage && (
              <select
                value={this.state.brokerage}
                onChange={event => {
                  this.setState({ brokerage: event.target.value });
                }}
              >
                <option disabled value="">
                  Choose your brokerage
                </option>
                {brokerageOptions}
              </select>
            )}
            {this.state.allowSelectType && (
              <select
                value={this.state.type}
                onChange={event => {
                  this.setState({ type: event.target.value });
                }}
              >
                <option disabled value="">
                  Select an access level
                </option>
                {types}
              </select>
            )}
          </div>
        )}

        {submitButton}
      </React.Fragment>
    );
  }
}

const select = state => ({
  brokerages: selectBrokerages(state),
});

export default connect(select)(AuthorizationPicker);
