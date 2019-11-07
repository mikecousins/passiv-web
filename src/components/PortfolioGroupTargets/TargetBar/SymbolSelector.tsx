import React, { useState } from 'react';
import styled from '@emotion/styled';
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from '@reach/combobox';
import '@reach/combobox/styles.css';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentGroupId } from '../../../selectors/groups';
import { postData } from '../../../api';
import { loadGroup } from '../../../actions';

const StyledCombobox = styled(Combobox)`
  width: 500px;
  @media (max-width: 900px) {
    width: 81vw;
    margin-bottom: 20px;
  }
`;

const StyledInput = styled(ComboboxInput)`
  width: 500px;
  border: 1px solid;
  padding: 5px;
  @media (max-width: 900px) {
    width: 81vw;
    margin-bottom: 20px;
  }
`;

type Props = {
  value: any;
  onSelect: (symbol: any) => void;
};

const SymbolSelector = ({ value, onSelect }: Props) => {
  const groupId = useSelector(selectCurrentGroupId);
  const dispatch = useDispatch();
  const [matchingSymbols, setMatchingSymbols] = useState<any[]>();

  const loadOptions = (event: any) => {
    postData(`/api/v1/portfolioGroups/${groupId}/symbols`, {
      substring: event.target.value,
    })
      .then(response => {
        setMatchingSymbols(response.data);
      })
      .catch(() => {
        dispatch(loadGroup({ ids: [groupId] }));
      });
  };

  const handleSelect = (id: string) => {
    if (!matchingSymbols) {
      return;
    }
    const symbol = matchingSymbols.find(symbol => id == symbol.id);
    if (symbol) {
      onSelect(symbol);
    }
  };

  return (
    <StyledCombobox value={value} onSelect={handleSelect}>
      <StyledInput
        onChange={loadOptions}
        placeholder="Search for security..."
      />
      {matchingSymbols && matchingSymbols.length > 0 && (
        <ComboboxPopover className="shadow-popup">
          <ComboboxList>
            {matchingSymbols.map((option: any, index) => {
              const str = `${option.symbol} (${option.description})`;
              return (
                <ComboboxOption key={index} value={option.id}>
                  {str}
                </ComboboxOption>
              );
            })}
          </ComboboxList>
        </ComboboxPopover>
      )}
    </StyledCombobox>
  );
};

export default SymbolSelector;
