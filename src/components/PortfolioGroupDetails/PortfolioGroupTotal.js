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
import { Title } from '../../styled/GlobalElements';
import ShadowBox from '../../styled/ShadowBox';
import Number from '../Number';

const Total = styled.div`
  text-align: center;
  color: #fff;
  background: #04a287;
`;

const Center = styled.div`
  text-align: center;
`;

class PortfolioGroupTotal extends Component {
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
    let equityValue = null;
    if (this.props.accounts === null) {
      equityValue = <Number value={0} currency />;
    } else {
      if (this.props.error) {
        equityValue = (
          <Center>
            <FontAwesomeIcon icon={faExclamationTriangle} />
          </Center>
        );
      } else {
        equityValue =
          this.props.equity !== null ? (
            <Number value={this.props.equity} currency />
          ) : (
            <FontAwesomeIcon icon={faSpinner} spin />
          );
      }
    }

    return (
      <ShadowBox background="#04a287">
        <Total>
          <Title>Total Value</Title>
          <b>{equityValue}</b>
        </Total>
      </ShadowBox>
    );
  }
}

PortfolioGroupTotal.propTypes = {
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
)(PortfolioGroupTotal);
