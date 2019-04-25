import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { H2, H3, Title } from '../styled/GlobalElements';
import styled from '@emotion/styled';
import ShadowBox from '../styled/ShadowBox';
import Number from './Number';

export const HoldingsTable = styled.table`
  width: 100%;
  text-align: center;
  margin: 20px 0;
  th {
    text-align: center;
  }
  tr th:first-of-type,
  tr td:first-of-type {
    text-align: left;
  }
  tr th:last-of-type,
  tr td:last-of-type {
    text-align: right;
  }
  td {
    padding: 7px 0;
  }
`;

export const NoHoldingsMessage = styled.table`
  width: 100%;
  text-align: left;
  margin: 20px 0;
`;

export const AccountHoldings = ({ account }) => (
  <ShadowBox>
    {account.positions == null ? (
      <React.Fragment>
        <H2>
          {account.name}
          &nbsp;-&nbsp;
          {account.number}
          &nbsp;-&nbsp;
          {account.type}
        </H2>
        <FontAwesomeIcon icon={faSpinner} spin />
      </React.Fragment>
    ) : account.positions.length === 0 ? (
      <React.Fragment>
        <H2>
          {account.name}
          &nbsp;-&nbsp;
          {account.number}
          &nbsp;-&nbsp;
          {account.type}
          &nbsp;
          {account.loading && <FontAwesomeIcon icon={faSpinner} spin />}
        </H2>
        <NoHoldingsMessage>
          <H3>You do not have any holdings in this portfolio.</H3>
        </NoHoldingsMessage>
      </React.Fragment>
    ) : (
      <React.Fragment>
        <H2>
          {account.name}
          &nbsp;-&nbsp;
          {account.number}
          &nbsp;-&nbsp;
          {account.type}
          &nbsp;
          {account.loading && <FontAwesomeIcon icon={faSpinner} spin />}
        </H2>
        <br />
        <HoldingsTable>
          <thead>
            <tr>
              <th>
                <Title>Symbol</Title>
              </th>
              <th>
                <Title>Units</Title>
              </th>
              <th>
                <Title>Price</Title>
              </th>
              <th>
                <Title>Value</Title>
              </th>
            </tr>
          </thead>
          <tbody>
            {!account.positions && (
              <tr>
                <td colSpan="4">
                  <FontAwesomeIcon icon={faSpinner} spin />
                </td>
              </tr>
            )}
            {account.positions &&
              account.positions.map(position => (
                <tr key={position.symbol.id}>
                  <td>
                    <span title={position.symbol.description}>
                      {position.symbol.symbol.symbol}
                    </span>
                  </td>
                  <td>{position.units}</td>
                  <td>
                    <Number value={position.price} currency />
                  </td>
                  <td>
                    <Number value={position.price * position.units} currency />
                  </td>
                </tr>
              ))}
          </tbody>
        </HoldingsTable>
      </React.Fragment>
    )}
  </ShadowBox>
);

export default AccountHoldings;
