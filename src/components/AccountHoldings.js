import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import {H2,Title} from '../styled/GlobalElements';
import styled from '@emotion/styled';

import ShadowBox from '../styled/ShadowBox';

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

const AccountHoldings = (props) => (
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
        </tr>
      </thead>
      <tbody>
        {!props.positions && <tr><td colSpan="4"><FontAwesomeIcon icon={faSpinner} spin /></td></tr>}
        {props.positions
          && props.positions.map(position => (
            <tr key={position.symbol.id}>
              <td>
                <span title={position.symbol.description}>{position.symbol.symbol}</span>
              </td>
              <td>
                {position.units}
              </td>
              <td>
                {new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(position.price)}
              </td>
              <td>
                {new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(position.price * position.units)}
              </td>
            </tr>
          ))
        }
      </tbody>
    </HoldingsTable>
  </ShadowBox>
);

export default AccountHoldings;
