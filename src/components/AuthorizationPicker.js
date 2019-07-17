import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectBrokerages } from '../selectors';
import { postData } from '../api';
import { Button } from '../styled/Button';
import { DisabledButton } from '../styled/DisabledButton';
import { StepButton } from '../styled/SignupSteps';
import { push } from 'connected-react-router';

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

  receiveMessage(e) {
    var data = JSON.parse(e.data);
    var oAuthVerifier = data.oAuthVerifier;
    console.log('data', data);
    // push(`/app/oauth/tradeit?code=${oAuthVerifier}`);

    window.location = `/app/oauth/tradeit?code=${oAuthVerifier}`;
    console.log('hello?');
    // getTradeItTokens(oAuthVerifier)
  }

  handleRedirect(url) {
    let selectedBrokerage = this.props.brokerages.find(
      b => b.id === this.state.brokerage,
    );
    console.log('brokerage', selectedBrokerage);
    switch (selectedBrokerage.name) {
      case 'TradeItDummy':
        console.log('new window!');
        let newWindow = window.open(
          url,
          `Passiv: Connect ${selectedBrokerage.name}`,
          'height=480,width=640',
        );

        if (window.focus) {
          newWindow.focus();
        }

        if (window.addEventListener) {
          window.addEventListener('message', this.receiveMessage, false);
        } else {
          window.attachEvent('onmessage', this.receiveMessage);
        }
        break;
      case 'Questrade':
        window.location = url;
        break;
      default:
        break;
    }
  }

  startAuthorization() {
    if (this.state.updateBrokerageAuthorizationId === null) {
      postData(`/api/v1/brokerages/${this.state.brokerage}/authorize/`, {
        type: this.state.type,
      }).then(response => {
        console.log('success', response.data);
        this.handleRedirect(response.data.url);
        // window.location = response.data.url;
      });
    } else {
      postData(
        `/api/v1/brokerages/${this.state.brokerage}/authorize/${this.state.updateBrokerageAuthorizationId}`,
        { type: this.state.type },
      ).then(response => {
        console.log('success', response.data);
        this.handleRedirect(response.data.url);
        // window.location = response.data.url;
      });
    }
  }

  render() {
    const { brokerages } = this.props;

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

    let submitButton = <DisabledButton disabled>Connect</DisabledButton>;
    if (this.state.brokerage && this.state.type) {
      if (this.state.allowSelect) {
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

const actions = {
  push: push,
};

export default connect(select)(AuthorizationPicker);
