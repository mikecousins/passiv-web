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
  z-index: 5;
`;

const StyledOption = styled(ComboboxOption)`
  margin: 5px;
`;

type Props = {
  value: any;
  allSymbols: boolean;
  forModelSecurity?: boolean;
  name?: string;
  id?: string;
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

const SymbolSelector = ({
  value,
  allSymbols,
  forModelSecurity,
  name,
  id,
  onSelect,
}: Props) => {
  const groupId = useSelector(selectCurrentGroupId);
  const dispatch = useDispatch();
  const [matchingSymbols, setMatchingSymbols] = useState<any[]>();
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const loadOptions = () => {
    setLoading(true);
    let symbolsURL = '';
    if (allSymbols) {
      symbolsURL = '/api/v1/symbols';
    } else {
      symbolsURL = `/api/v1/portfolioGroups/${groupId}/symbols`;
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

  const handleSelect = (id: string) => {
    if (!matchingSymbols) {
      return;
    }
    const symbol = matchingSymbols.find((symbol) => id === symbol.id);
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
    <StyledCombobox onSelect={forModelSecurity ? onSelect : handleSelect}>
      {forModelSecurity ? (
        <StyledComboboxInput
          value={value}
          onChange={onChange}
          onSelect={onSelect}
          placeholder="Search for security..."
          autoFocus
          name={name}
          id={id}
        />
      ) : (
        <StyledInput
          value={value}
          onChange={onChange}
          placeholder="Search for security..."
          autoFocus
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
                    <StyledComboboxOption key={index} value={option.id}>
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
                    <StyledOption key={index} value={option.id}>
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
