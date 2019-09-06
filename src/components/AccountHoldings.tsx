import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import { Title } from '../styled/GlobalElements';
import Number from './Number';
import { selectCurrentAccountHoldings } from '../selectors/groups';
import ShadowBox from '../styled/ShadowBox';
import { Symbol } from '../styled/Group';

export const HoldingsTable = styled.table`
  width: 100%;
  text-align: center;
  margin: 0 0 20px 0;
  th {
    text-align: center;
    border-bottom: 1px solid #e5e5e5;
    padding: 15px 12px 5px;
  }
  th:first-of-type {
    border-bottom: none;
  }
  tr th,
  tr td {
    width: 14%;
  }
  tr th:first-of-type,
  tr td:first-of-type {
    text-align: left;
    width: 58%;
  }
  tr td:first-of-type {
    font-weight: 700;
  }
  tr th:last-of-type,
  tr td:last-of-type {
    text-align: right;
  }
  td {
    padding: 15px 12px;
  }
  tbody tr:nth-oftype(even) {
    background: #f4f4f4;
  }
`;

const HoldingsBox = styled.div`
  margin-top: 20px;
`;

const SymbolNameBox = styled.span`
  padding-left: 10px;
`;

export const AccountHoldings = () => {
  const account = useSelector(selectCurrentAccountHoldings);

  if (!account) {
    return <FontAwesomeIcon icon={faSpinner} spin />;
  }

  return (
    <ShadowBox>
      <HoldingsBox>
        <HoldingsTable>
          <thead>
            <tr>
              <th></th>
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
            {account.positions &&
              account.positions.map((position: any) => (
                <tr key={position.symbol.id}>
                  <td>
                    <span>
                      <Symbol>{position.symbol.symbol.symbol}</Symbol>
                    </span>
                    <SymbolNameBox>{position.symbol.symbol.name}</SymbolNameBox>
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
      </HoldingsBox>
    </ShadowBox>
  );
};

export default AccountHoldings;
