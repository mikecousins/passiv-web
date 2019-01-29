import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import {H2,Title} from '../styled/GlobalElements';
import styled from '@emotion/styled';
import ExcludedAssetToggle from './ExcludedAssetToggle';
import ShadowBox from '../styled/ShadowBox';
import Number from './Number';

export const HoldingsTable = styled.table`
  width: 100%;
  max-width: 900px;
  text-align: center;
  margin: 20px 0;
  th {
    text-align: center;
  }
  tr th:first-of-type,
  tr td:first-of-type {
    text-align: left;
  }
  td {
    padding: 7px 0;
  }
`;

class AccountHoldings extends Component {

  render() {
    return (
      <ShadowBox>
        <H2>Current Portfolio</H2>
        <br />
        <HoldingsTable>
          <thead>
            <tr>
              <th><Title>Symbol</Title></th>
              <th><Title>Units</Title></th>
              <th><Title>Price</Title></th>
              <th><Title>Value</Title></th>
              <th><Title>Exclude</Title></th>
            </tr>
          </thead>
          <tbody>
            {!this.props.positions && <tr><td colSpan="4"><FontAwesomeIcon icon={faSpinner} spin /></td></tr>}
            {this.props.positions
              && this.props.positions.map(position => (
                <tr key={position.symbol.id}>
                  <td>
                    <span title={position.symbol.description}>{position.symbol.symbol}</span>
                  </td>
                  <td>
                    {position.units}
                  </td>
                  <td>
                    <Number value={position.price} currency />
                  </td>
                  <td>
                    <Number value={position.price * position.units} currency />
                  </td>
                  <td>
                    <ExcludedAssetToggle symbolId={position.symbol.id} />
                  </td>
                </tr>
              ))
            }
          </tbody>
        </HoldingsTable>
      </ShadowBox>
    );
  }
}

const actions = {};
const select = state => ({});

export default connect(select, actions)(AccountHoldings);
