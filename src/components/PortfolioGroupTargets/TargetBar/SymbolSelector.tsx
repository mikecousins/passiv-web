import React, { useState, useEffect, useRef } from 'react';
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

const useDebouncedEffect = (callback: any, delay: number, deps: any[] = []) => {
  const firstUpdate = useRef(true);
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    const handler = setTimeout(() => {
      callback();
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [delay, ...deps]);
};

const SymbolSelector = ({ value, onSelect }: Props) => {
  const groupId = useSelector(selectCurrentGroupId);
  const dispatch = useDispatch();
  const [matchingSymbols, setMatchingSymbols] = useState<any[]>();
  const [input, setInput] = useState('');

  const loadOptions = () => {
    postData(`/api/v1/portfolioGroups/${groupId}/symbols`, {
      substring: input,
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
    const symbol = matchingSymbols.find(symbol => id === symbol.id);
    if (symbol) {
      onSelect(symbol);
    }
  };

  useDebouncedEffect(
    () => {
      loadOptions();
    },
    500,
    [input],
  );

  const onChange = (event: any) => {
    setInput(event.target.value);
  };

  return (
    <StyledCombobox value={value} onSelect={handleSelect}>
      <StyledInput onChange={onChange} placeholder="Search for security..." />
      {matchingSymbols && matchingSymbols.length > 0 && (
        <ComboboxPopover>
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
