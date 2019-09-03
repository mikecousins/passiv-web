import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import { Title, Table } from '../styled/GlobalElements';
import Number from './Number';
import {
  selectCurrentAccountHoldings,
  selectGroupsLoading,
} from '../selectors/groups';
import ShadowBox from '../styled/ShadowBox';
import { Symbol } from '../styled/Group';

export const HoldingsTable = styled.table`
  width: 100%;
  text-align: center;
  margin: 0 0 20px 0;
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

const HoldingsBox = styled.div`
  margin-top: 20px;
`;

const NameBox = styled.div`
  font-size: 18px;
  font-weight: 600;
  padding-bottom: 10px;
`;

const SymbolNameBox = styled.span`
  padding-left: 10px;
`;

export const AccountHoldings = () => {
  const account = useSelector(selectCurrentAccountHoldings);
  const loading = useSelector(selectGroupsLoading);

  if (!account) {
    return <FontAwesomeIcon icon={faSpinner} spin />;
  }

  return (
    <ShadowBox>
      <HoldingsBox>
        <Table>
          <NameBox>
            {account.name} ({account.number}){' '}
            {loading && <FontAwesomeIcon icon={faSpinner} spin />}
          </NameBox>
        </Table>
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
