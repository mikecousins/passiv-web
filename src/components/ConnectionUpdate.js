import React from 'react';
import { connect } from 'react-redux';
import AuthorizationPicker from '../components/AuthorizationPicker';

import ShadowBox from '../styled/ShadowBox';
import { H3 } from '../styled/GlobalElements';

class ConnectionUpdate extends React.Component{

  render() {
    const { authorization } = this.props
    return(
      <ShadowBox>
        <H3>Update/Refresh Connection</H3>
        <AuthorizationPicker
          allowSelectBrokerage={false}
          brokerage={authorization.brokerage.id}
          updateBrokerageAuthorizationId={authorization.id}
          type={authorization.type}
        />
      </ShadowBox>
    )
  }
}

const select = state => ({});

const actions = {};

export default connect(select, actions)(ConnectionUpdate)
