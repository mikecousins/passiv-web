import React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrencies } from '../../selectors';
import { Select } from '../../styled/Form';
import styled from '@emotion/styled';
import { OptionsTitle } from '../../styled/GlobalElements';

export const SelectCurrency = styled(Select)`
  margin-left: 6px;
`;

type Props = {
  name?: string;
  settings: any;
  update: (event: any) => void;
};

const PreferredCurrencySetting = ({ name, settings, update }: Props) => {
  const currencies = useSelector(selectCurrencies);
  if (!settings) {
    return null;
  }
  if (!name) {
    name = 'Preferred Currency';
  }
  return (
    <div>
      <OptionsTitle>{name}:</OptionsTitle>
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
