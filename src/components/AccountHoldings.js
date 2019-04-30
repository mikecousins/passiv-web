import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSpinner,
  faSortUp,
  faSortDown,
} from '@fortawesome/free-solid-svg-icons';
import { Title, Table, A } from '../styled/GlobalElements';
import styled from '@emotion/styled';
import Number from './Number';

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

const DetailBox = styled.div``;

export const AccountHoldings = ({ account, error }) => {
  const [viewDetail, setViewDetail] = useState(false);

  return (
    <HoldingsBox>
      <Table>
        <NameBox>
          {account.name} ({account.number}){' '}
          {account.loading && <FontAwesomeIcon icon={faSpinner} spin />}
        </NameBox>
        <DetailBox>
          <A>
            <FontAwesomeIcon
              icon={viewDetail ? faSortUp : faSortDown}
              onClick={() => setViewDetail(!viewDetail)}
            />
          </A>
        </DetailBox>
      </Table>

      {viewDetail ? (
        <React.Fragment>
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
                  <th>
                    <Title>Exclude</Title>
                  </th>
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
                      <Number
                        value={position.price * position.units}
                        currency
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </HoldingsTable>
        </React.Fragment>
      ) : (
        <React.Fragment />
      )}
    </HoldingsBox>
  );
};

export default AccountHoldings;
