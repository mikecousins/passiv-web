import React from 'react';
import { Menu, MenuButton, MenuList, MenuItem } from '@reach/menu-button';
import { Currency } from '../../types/currency';

type Props = {
  value: string;
  options: Currency[] | null;
  onChange: (newCurrency: string) => void;
};

const CurrencySelector = ({ value, options, onChange }: Props) => {
  if (!options) {
    return null;
  }
  const currentCurrency = options.find(currency => currency.id === value);
  if (!currentCurrency) {
    return null;
  }

  return (
    <Menu>
      <MenuButton>{currentCurrency.code}</MenuButton>
      <MenuList>
        {options.map(currency => (
          <MenuItem onSelect={() => onChange(currency.id)}>
            {currency.code}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default CurrencySelector;
