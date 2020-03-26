import React from 'react';
import { CashRestriction } from '../types/account';
import Number from './Number';

type Props = {
  cashRestrictions: CashRestriction[];
};

const CashRestrictions = ({ cashRestrictions }: Props) => {
  if (cashRestrictions.length > 0) {
    return (
      <div>
        {cashRestrictions.map((cashRestriction: CashRestriction) => {
          return (
            <div>
              hello {<Number value={cashRestriction.amount} currency />}
            </div>
          );
        })}
      </div>
    );
  } else {
    return <div>There are no cash rules defined.</div>;
  }
};

export default CashRestrictions;
