import React from 'react';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AccountBalance = (props) => {
  let content = (
    <div>
      <h3>Balances</h3>
      <br />
      <table className="w-full text-left">
        <thead>
          <tr>
            <th>Currency</th>
            <th>Cash</th>
          </tr>
        </thead>
        <tbody>
          {!props.balances && <tr><td colSpan="4" className="text-center py-4"><FontAwesomeIcon icon={faSpinner} spin /></td></tr>}
          {props.balances
            && props.balances.map(balance => (
              <tr key={balance.currency.id}>
                <td className="p-2 border-t border-grey-lighter">
                  <span title={balance.currency.name}>{balance.currency.code}</span>
                </td>
                <td className="p-2 border-t border-grey-lighter">
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
    <div className="rounded overflow-hidden shadow-lg px-6 py-4 bg-white">
      {content}
    </div>
  )
};

export default AccountBalance;
