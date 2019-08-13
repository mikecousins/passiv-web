import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSpinner,
  faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons';
import { loadGroupsList } from '../actions';
import { selectCurrentGroup } from '../selectors/groups';
import styled from '@emotion/styled';
import { Table, Title } from '../styled/GlobalElements';
import ShadowBox from '../styled/ShadowBox';
import Number from './Number';

const MetaHorizontal = styled.div`
  text-align: left;
  @media (max-width: 900px) {
    margin-bottom: 10px;
  }
  span {
    font-weight: 600;
    margin-bottom: 8px;
    display: inline-block;
    margin-right: 6px;
    text-align: left;
  }
`;

class PortfolioGroupMetadata extends Component {
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
    let accountDetails = null;
    accountDetails = (
      <React.Fragment>
        <div>
          <span>Account #: </span>
          {this.firstAccount().number ? (
            this.firstAccount().number
          ) : (
            <FontAwesomeIcon icon={faSpinner} spin />
          )}
        </div>
        <div>
          <span>Type: </span>
          {this.firstAccount().type ? (
            this.firstAccount().type
          ) : (
            <FontAwesomeIcon icon={faSpinner} spin />
          )}
        </div>
      </React.Fragment>
    );

    return (
      <ShadowBox>
        <MetaHorizontal>{accountDetails}</MetaHorizontal>
      </ShadowBox>
    );
  }
}

const select = state => ({
  group: selectCurrentGroup(state),
});
const actions = {
  refreshGroups: loadGroupsList,
};

export default connect(
  select,
  actions,
)(PortfolioGroupMetadata);
