import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSpinner,
  faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons';
import { loadGroupsList } from '../../actions';
import { selectCurrentGroup } from '../../selectors/groups';
import styled from '@emotion/styled';
import { Table, Title } from '../../styled/GlobalElements';
import ShadowBox from '../../styled/ShadowBox';
import Number from '../Number';

const CashBalance = styled.div`
  text-align: center;
`;

const Cash = styled.div`
  text-align: center;
`;

const CashType = styled.div`
  margin-bottom: 8px;
  span {
    font-weight: 600;
  }
`;

class PortfolioGroupCash extends Component {
  state = {
    loading: false,
  };

  firstAccount() {
    if (this.props.accounts.length > 0) {
      return this.props.accounts[0];
    } else {
      return null;
    }
  }

  render() {
    let cashValue = null;
    if (this.props.accounts === null) {
      cashValue = <Number value={0} currency />;
    } else {
      if (this.props.error) {
        cashValue = <FontAwesomeIcon icon={faExclamationTriangle} />;
      } else {
        cashValue =
          this.props.cash !== null ? (
            <Number value={this.props.cash} currency />
          ) : (
            <FontAwesomeIcon icon={faSpinner} spin />
          );
      }
    }

    let cashBalance = null;
    if (this.props.accounts !== null) {
      cashBalance = (
        <React.Fragment>
          {this.props.balances &&
            this.props.balances.map(balance => (
              <Table key={balance.currency.id}>
                <CashType>
                  <span title={balance.currency.name}>
                    {balance.currency.code}
                  </span>
                </CashType>
                <CashType>
                  <Number value={balance.cash} currency />
                </CashType>
              </Table>
            ))}
        </React.Fragment>
      );
    }

    return (
      <ShadowBox background="#BEE0DB">
        <CashBalance>{cashBalance}</CashBalance>
        <Cash>
          <Title>Cash</Title>
          {cashValue}
        </Cash>
      </ShadowBox>
    );
  }
}

PortfolioGroupCash.propTypes = {
  number: PropTypes.string,
  cash: PropTypes.number,
  equity: PropTypes.number,
};

const select = state => ({
  group: selectCurrentGroup(state),
});
const actions = {
  refreshGroups: loadGroupsList,
};

export default connect(
  select,
  actions,
)(PortfolioGroupCash);
