import React from 'react';
import styled from '@emotion/styled';
import { postData } from '../api';
import AuthorizationPicker from '../components/AuthorizationPicker';
import { H3 } from '../styled/GlobalElements';

export const Order = styled.div`
  text-align: center;
  select {
    padding: 10px;
    margin: 12px 0;
  }
`;

export const LeftOrder = styled(Order)`
  text-align: left;
`;

class ConnectionUpdate extends React.Component {
  state = {
    allowSelectType: this.props.type === undefined ? true : false,
    defaultType:
      this.props.type === undefined
        ? this.props.authorization.type
        : this.props.type,
    publicToken: undefined,
  };

  getPublicToken() {
    postData(
      `/api/v1/brokerages/${this.props.authorization.brokerage.id}/authorize/${this.props.authorization.id}`,
      { type: 'read' },
    ).then(response => {
      this.setState({ publicToken: response.data.public_token });
    });
  }

  render() {
    const { authorization } = this.props;

    if (authorization.brokerage.name === 'Plaid') {
      if (!this.state.publicToken) {
        this.getPublicToken();
      }
    }

    const picker = (
      <React.Fragment>
        {!this.props.hideTitle && <H3>Update/Refresh Connection</H3>}
        <AuthorizationPicker
          allowSelectBrokerage={false}
          brokerage={authorization.brokerage.id}
          updateBrokerageAuthorizationId={authorization.id}
          allowSelectType={this.state.allowSelectType}
          type={this.state.defaultType}
          name={this.props.name}
          publicToken={this.state.publicToken}
          isDemo={this.props.isDemo}
        />
      </React.Fragment>
    );
    if (this.props.align && this.props.align === 'left') {
      return <LeftOrder>{picker}</LeftOrder>;
    } else {
      return <Order>{picker}</Order>;
    }
  }
}

export default ConnectionUpdate;
