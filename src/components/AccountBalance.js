import React from 'react';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ShadowBox from '../styled/ShadowBox';

const AccountBalance = (props) => {
  let content = (
    <div>
      <h3>Balances</h3>
      <br />
      <table>
        <thead>
          <tr>
            <th>Currency</th>
            <th>Cash</th>
          </tr>
        </thead>
        <tbody>
          {!props.balances && <tr><td colSpan="4"><FontAwesomeIcon icon={faSpinner} spin /></td></tr>}
          {props.balances
            && props.balances.map(balance => (
              <tr key={balance.currency.id}>
                <td>
                  <span title={balance.currency.name}>{balance.currency.code}</span>
                </td>
                <td>
                  {new Intl.NumberFormat('en-CA', { style: 'currency', currency: balance.currency.code }).format(balance.cash)}
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )

  return (
    <ShadowBox>
      {content}
    </ShadowBox>
  )
};

export default AccountBalance;
