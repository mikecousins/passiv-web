import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Tooltip from '../Tooltip';
import { selectCurrencies } from '../../selectors';

type Props = {
  settings: any;
  update: (event: any) => void;
};

const PreferredCurrencySetting = ({ settings, update }: Props) => {
  const currencies = useSelector(selectCurrencies);
  return (
    <React.Fragment>
      <div>
        <span>Preferred Currency: </span>
        <select value={settings.preferred_currency} onChange={update}>
          {currencies &&
            currencies.map(currency => (
              <option value={currency.id}>{currency.code}</option>
            ))}
        </select>
      </div>
    </React.Fragment>
  );
};

export default PreferredCurrencySetting;
