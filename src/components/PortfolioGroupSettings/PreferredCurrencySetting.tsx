import React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrencies } from '../../selectors';

type Props = {
  settings: any;
  update: (event: any) => void;
};

const PreferredCurrencySetting = ({ settings, update }: Props) => {
  const currencies = useSelector(selectCurrencies);
  if (!settings) {
    return null;
  }
  return (
    <div>
      <span>Preferred Currency: </span>
      <select value={settings.preferred_currency} onChange={update}>
        {currencies &&
          currencies.map(currency => (
            <option key={currency.id} value={currency.id}>
              {currency.code} - {currency.name}
            </option>
          ))}
      </select>
    </div>
  );
};

export default PreferredCurrencySetting;
