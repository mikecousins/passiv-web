import React from 'react';
import { connect } from 'react-redux';
import AuthorizationPicker from '../components/AuthorizationPicker';

import ShadowBox from '../styled/ShadowBox';
import { H3 } from '../styled/GlobalElements';

class ConnectionUpdate extends React.Component{
  state = {
    allowSelectType: this.props.type === undefined ? true : false,
    defaultType: this.props.type === undefined ? this.props.authorization.type : this.props.type,
  }

  render() {
    const { authorization } = this.props
    return(
      <ShadowBox>
        {!(this.props.hideTitle) && (<H3>Update/Refresh Connection</H3>)}

        <AuthorizationPicker
          allowSelectBrokerage={false}
          brokerage={authorization.brokerage.id}
          updateBrokerageAuthorizationId={authorization.id}
          allowSelectType={this.state.allowSelectType}
          type={this.state.defaultType}
        />
      </ShadowBox>
    )
  }
}

const select = state => ({});

const actions = {};

export default connect(select, actions)(ConnectionUpdate)
