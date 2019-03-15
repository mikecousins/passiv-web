import React from 'react'
import { connect } from 'react-redux'

import ShadowBox from '../styled/ShadowBox';
import { selectAuthorizations, selectAccounts } from '../selectors';


class ConnectionAccounts extends React.Component{
  selectAccountsByAuthorizationId = (authorizationId) => {
    let selectedAccounts = []

    this.props.accounts.map(account => {
      if (account.brokerage_authorization === authorizationId){
        selectedAccounts.push(account)
      }
    })

    return selectedAccounts
  }

  render() {
    const {authorizationId} = this.props

    return(
      <ShadowBox>
        <div> This connection contains the following accounts: </div>
        <div>
          {this.selectAccountsByAuthorizationId(authorizationId).map(account => (
                <div key={account.id}>
                  {account.name} ({account.number})
                </div>
              )
            )
          }
        </div>
      </ShadowBox>
    )
  }
}

const select = state => ({
  accounts: selectAccounts(state),
});
const actions = {};

export default connect(select,actions)(ConnectionAccounts)
