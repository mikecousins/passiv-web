import React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrencies } from '../../selectors';
import { Select } from '../../styled/Form';
import styled from '@emotion/styled';

export const SelectCurrency = styled(Select)`
  margin-left: 6px;
`;

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
      <SelectCurrency value={settings.preferred_currency} onChange={update}>
        {currencies &&
          currencies.map(currency => (
            <option key={currency.id} value={currency.id}>
              {currency.code} - {currency.name}
            </option>
          ))}
      </SelectCurrency>
    </div>
  );
};

export default PreferredCurrencySetting;
