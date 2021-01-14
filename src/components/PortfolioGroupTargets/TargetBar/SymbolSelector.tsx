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
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { selectCurrentGroupId } from '../../../selectors/groups';
import { postData } from '../../../api';
import { loadGroup } from '../../../actions';

const StyledCombobox = styled(Combobox)`
  width: 500px;
  position: relative;
  z-index: 5;
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

const StyledComboboxPopover = styled(ComboboxPopover)`
  z-index: 5;
`;

const StyledComboboxOption = styled(ComboboxOption)`
  margin: 5px;
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
  }, [delay, ...deps]); // eslint-disable-line react-hooks/exhaustive-deps
};

const SymbolSelector = ({ value, onSelect }: Props) => {
  const groupId = useSelector(selectCurrentGroupId);
  const dispatch = useDispatch();
  const [matchingSymbols, setMatchingSymbols] = useState<any[]>();
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [confirmTicker, setConfirmTicker] = useState('');

  const loadOptions = () => {
    setLoading(true);
    postData(`/api/v1/portfolioGroups/${groupId}/symbols`, {
      substring: input,
    })
      .then((response) => {
        setMatchingSymbols(response.data);
        setLoading(false);
      })
      .catch(() => {
        dispatch(loadGroup({ ids: [groupId] }));
        setLoading(false);
      });
  };

  const handleSelectByTicker = (ticker: string) => {
    if (!matchingSymbols) {
      return;
    }
    const symbol = matchingSymbols.find(
      (symbol) => ticker.toUpperCase() === symbol.symbol,
    );
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

  const onEnter = (event: any) => {
    if (event.which === 13) {
      setConfirmTicker(event.target.value);
    }
  };

  if (confirmTicker !== '') {
    handleSelectByTicker(confirmTicker);
  }

  return (
    <StyledCombobox onSelect={handleSelectByTicker}>
      <StyledInput
        value={value}
        onChange={onChange}
        onKeyUp={onEnter}
        placeholder="Search for security..."
      />
      {loading ? (
        <StyledComboboxPopover>
          <ComboboxList>
            <FontAwesomeIcon icon={faSpinner} spin />
          </ComboboxList>
        </StyledComboboxPopover>
      ) : (
        matchingSymbols &&
        matchingSymbols.length > 0 && (
          <StyledComboboxPopover>
            <ComboboxList>
              {matchingSymbols.map((option: any, index) => {
                return (
                  <StyledComboboxOption key={index} value={option.symbol}>
                    <span>
                      {option.symbol} ({option.description})
                    </span>
                  </StyledComboboxOption>
                );
              })}
            </ComboboxList>
          </StyledComboboxPopover>
        )
      )}
    </StyledCombobox>
  );
};

export default SymbolSelector;
