import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button } from '../styled/Button';
import { H2 } from '../styled/GlobalElements';
import { selectAccounts, selectCashRestrictions } from '../selectors/accounts';
import { selectCurrencies } from '../selectors';
import CashRestrictions from './CashRestrictions';
import { CashRestriction as CashRestrictionType } from '../types/account';

const CashManagement = () => {
  const [editing, setEditing] = useState(false);

  const accounts = useSelector(selectAccounts);
  const cashRestrictions: CashRestrictionType[] = useSelector(
    selectCashRestrictions,
  );
  const currencies = useSelector(selectCurrencies);

  const startEditing = () => {
    setEditing(true);
  };

  const cancelEditing = () => {
    setEditing(false);
  };

  const canManageCash = () => {
    return true;
  };

  return (
    <React.Fragment>
      <H2>Cash Management</H2>
      <CashRestrictions cashRestrictions={cashRestrictions} />

      {editing ? (
        <div>
          <Button
            onClick={() => {
              cancelEditing();
            }}
          >
            Cancel
          </Button>
        </div>
      ) : (
        <div>
          <Button
            onClick={() => {
              startEditing();
            }}
          >
            Add
          </Button>
        </div>
      )}
    </React.Fragment>
  );
};

export default CashManagement;
