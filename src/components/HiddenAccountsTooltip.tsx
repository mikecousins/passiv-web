import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectHiddenAccounts } from '../selectors/accounts';
import Tooltip from './Tooltip';

const HiddenAccountsTooltip = () => {
  const hiddenAccounts = useSelector(selectHiddenAccounts);
  return (
    <>
      {hiddenAccounts.length >= 1 && (
        <Tooltip
          label={
            'Note: holdings in hidden accounts are not included in your total holdings.'
          }
        >
          <FontAwesomeIcon icon={faInfoCircle} style={{ fontSize: '15px' }} />
        </Tooltip>
      )}
    </>
  );
};

export default HiddenAccountsTooltip;
