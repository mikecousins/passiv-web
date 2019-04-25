import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSpinner,
  faPen,
  faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons';
import { loadGroupsList } from '../actions';
import { patchData } from '../api';
import { selectCurrentGroup } from '../selectors';
import styled from '@emotion/styled';
import { Table, Edit, Title } from '../styled/GlobalElements';
import { InputNonFormik } from '../styled/Form';
import ShadowBox from '../styled/ShadowBox';
import { Button } from '../styled/Button';
import Number from './Number';

const MetaContainer = styled.div`
  text-align: right;
`;
const CashBalance = styled.div`
  text-align: center;
  @media (max-width: 900px) {
    width: 66%;
    display: inline-block;
    text-align: left;
    > div {
      display: inline-block;
      width: 50%;
    }
  }
`;
const Total = styled.div`
  text-align: right;
  padding: 13px 20px 0 20px;
  margin: -20px -20px 12px 0px;
  border-radius: 0 4px;
  color: #fff;
  background: #04a287;
  @media (max-width: 900px) {
    border-radius: 4px;
    margin: 0 0 17px;
    padding: 15px;
    text-align: center;
  }
`;

const Cash = styled.div`
  text-align: right;
  @media (max-width: 900px) {
    display: inline-block;
    width: 33%;
  }
`;

const Center = styled.div`
  text-align: center;
`;

const CashType = styled.div`
  margin-bottom: 8px;
  span {
    font-weight: 600;
  }
`;

const NameContainer = styled.div`
  padding-bottom: 0px;
  font-size: 40px;
  text-align: left;
  margin-bottom: 30px;
  position: relative;
  @media (max-width: 900px) {
    font-size: 24px;
    margin-bottom: 10px;
  }
  input {
    font-size: 30px;
    border-top: none;
    border-right: none;
    border-left: none;
    padding-left: 0;
    margin-bottom: 0;
  }
  button {
    font-size: 18px;
    margin: 0 5px;
    min-width: 70px;
    @media (min-width: 900px) {
      top: 0;
    }
  }
`;
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
    name: this.props.name,
    editingName: false,
    loading: false,
  };

  onEnter = e => {
    if (e.key === 'Enter') {
      this.finishEditingName();
    }
  };

  componentWillReceiveProps(nextProps) {
    this.setState({ name: nextProps.name, editingName: false, loading: false });
  }

  startEditingName() {
    this.setState({ editingName: true });
  }

  finishEditingName() {
    if (this.state.name !== this.props.group.name) {
      this.setState({ loading: true });
      let group = Object.assign({}, this.props.group);
      group.name = this.state.name;
      patchData(`/api/v1/portfolioGroups/${this.props.group.id}/`, group)
        .then(response => {
          console.log('success', response.data);
          this.setState({ loading: false });
          this.props.refreshGroups();
        })
        .catch(error => {
          console.log('error', error.response.data);
          this.setState({ loading: false });
        });
    }
    this.setState({ editingName: false });
  }

  render() {
    let equityValue = null;
    let cashValue = null;
    if (this.props.error) {
      equityValue = (
        <Center>
          <FontAwesomeIcon icon={faExclamationTriangle} />
        </Center>
      );
      cashValue = <FontAwesomeIcon icon={faExclamationTriangle} />;
    } else {
      equityValue =
        this.props.equity !== null ? (
          <Number value={this.props.equity} currency />
        ) : (
          <FontAwesomeIcon icon={faSpinner} spin />
        );
      cashValue =
        this.props.cash !== null ? (
          <Number value={this.props.cash} currency />
        ) : (
          <FontAwesomeIcon icon={faSpinner} spin />
        );
    }
    return (
      <ShadowBox>
        <MetaContainer>
          <Table>
            {this.state.editingName ? (
              <NameContainer>
                <InputNonFormik
                  value={this.state.name}
                  onChange={event => {
                    this.setState({ name: event.target.value });
                  }}
                  onKeyPress={this.onEnter}
                />
                <Button onClick={() => this.finishEditingName()}>Done</Button>
              </NameContainer>
            ) : (
              <NameContainer>
                {this.props.name ? (
                  this.props.name
                ) : (
                  <FontAwesomeIcon icon={faSpinner} spin />
                )}
                <Edit onClick={() => this.startEditingName()}>
                  <FontAwesomeIcon icon={faPen} />
                  Edit
                </Edit>
              </NameContainer>
            )}
            <Total>
              <Title>Total Value</Title>
              <b>{equityValue}</b>
            </Total>
          </Table>
          <Table>
            <MetaHorizontal />
            <CashBalance>
              {!this.props.balances && (
                <div>
                  <FontAwesomeIcon icon={faSpinner} spin />
                </div>
              )}
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
            </CashBalance>
            <Cash>
              <Title>Cash</Title>
              {cashValue}
            </Cash>
          </Table>
        </MetaContainer>
      </ShadowBox>
    );
  }
}

PortfolioGroupMetadata.propTypes = {
  number: PropTypes.string,
  accuracy: PropTypes.number,
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
)(PortfolioGroupMetadata);
