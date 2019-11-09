import React from 'react';
import { Menu, MenuButton, MenuList, MenuItem } from '@reach/menu-button';
import { Currency } from '../../types/currency';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import styled from '@emotion/styled';

const StyledMenuButton = styled(MenuButton)`
  font-weight: 600;
`;

const CaretBox = styled(FontAwesomeIcon)`
  margin-left: 5px;
`;

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
      <StyledMenuButton>
        {currentCurrency.code}
        <CaretBox icon={faCaretDown} />
      </StyledMenuButton>
      <MenuList>
        {options.map(currency => (
          <MenuItem key={currency.id} onSelect={() => onChange(currency.id)}>
            {currency.code}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default CurrencySelector;
