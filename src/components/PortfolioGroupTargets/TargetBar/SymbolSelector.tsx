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
import { useDispatch } from 'react-redux';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { postData } from '../../../api';
import { loadGroup } from '../../../actions';
import {
  StyledComboboxInput,
  StyledComboboxList,
  StyledComboboxOption,
} from '../../ModelPortfolio/AssetClassSelector';

const StyledCombobox = styled(Combobox)`
  width: 500px;
  position: relative;
  z-index: 5;
  display: inline-block;
  @media (max-width: 900px) {
    width: auto;
    margin-bottom: 20px;
  }
`;

const StyledInput = styled(ComboboxInput)`
  width: 500px;
  border: 1px solid;
  padding: 10px;
  @media (max-width: 900px) {
    width: auto;
    margin-bottom: 20px;
  }
`;

const StyledPopover = styled(ComboboxPopover)`
  z-index: 5;SymbolSelec
`;

const StyledOption = styled(ComboboxOption)`
  margin: 5px;
`;

type Props = {
  value: any;
  groupId?: string;
  forModelSecurity?: boolean;
  clearInput?: number;
  name?: string;
  id?: string;
  onSelect: (symbol: any) => void;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
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

const SymbolSelector = ({
  value,
  groupId,
  forModelSecurity,
  name,
  id,
  clearInput,
  onSelect,
  onKeyPress,
}: Props) => {
  // const groupId = useSelector(selectCurrentGroupId);
  const dispatch = useDispatch();
  const [matchingSymbols, setMatchingSymbols] = useState<any[]>();
  const [input, setInput] = useState(value);
  const [loading, setLoading] = useState(false);
  const [confirmTicker, setConfirmTicker] = useState('');

  const loadOptions = () => {
    setLoading(true);
    let symbolsURL = '';
    if (groupId) {
      symbolsURL = `/api/v1/portfolioGroups/${groupId}/symbols`;
    } else {
      symbolsURL = '/api/v1/symbols';
    }
    postData(symbolsURL, {
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

  useEffect(() => {
    setInput('');
  }, [clearInput]);

  const handleSelectByTicker = (ticker: string) => {
    setInput(ticker);
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
      {forModelSecurity ? (
        <StyledComboboxInput
          value={input}
          onChange={onChange}
          onKeyPress={onKeyPress}
          placeholder="Search for security..."
          name={name}
          id={id}
        />
      ) : (
        <StyledInput
          value={value}
          onChange={onChange}
          onKeyUp={onEnter}
          placeholder="Search for security..."
        />
      )}
      {loading ? (
        <StyledPopover>
          <ComboboxList>
            <FontAwesomeIcon icon={faSpinner} spin />
          </ComboboxList>
        </StyledPopover>
      ) : (
        matchingSymbols &&
        matchingSymbols.length > 0 && (
          <StyledPopover>
            {forModelSecurity ? (
              <StyledComboboxList>
                {matchingSymbols.map((option: any, index) => {
                  return (
                    <StyledComboboxOption key={index} value={option.symbol}>
                      <span>
                        {option.symbol} ({option.description})
                      </span>
                    </StyledComboboxOption>
                  );
                })}
              </StyledComboboxList>
            ) : (
              <ComboboxList>
                {matchingSymbols.map((option: any, index) => {
                  return (
                    <StyledOption key={index} value={option.symbol}>
                      <span>
                        {option.symbol} ({option.description})
                      </span>
                    </StyledOption>
                  );
                })}
              </ComboboxList>
            )}
          </StyledPopover>
        )
      )}
    </StyledCombobox>
  );
};

export default SymbolSelector;
