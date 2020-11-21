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
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { postData } from '../../api';

const StyledCombobox = styled(Combobox)`
  width: 500px;
  position: relative;
  background: #fff;
  margin-bottom: 20px;
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

type Props = {
  onSelectedBrokerage: (brokerageID: any) => void;
};

const WealthicaBrokerageSearchBar = ({ onSelectedBrokerage }: Props) => {
  const [matchingBrokerages, setMatchingBrokerages] = useState<any[]>();
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const loadOptions = () => {
    setLoading(true);
    postData(`/api/v1/wealthica/brokerage`, {
      substring: input,
    })
      .then((response) => {
        setMatchingBrokerages(response.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
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

  const handleSelect = (id: string) => {
    if (!matchingBrokerages) {
      return;
    }
    const brokerage = matchingBrokerages.find(
      (brokerage) => id === brokerage.id,
    );
    if (brokerage) {
      onSelectedBrokerage(brokerage.id);
    }
  };

  return (
    <StyledCombobox onSelect={handleSelect}>
      <StyledInput
        value={input}
        onChange={onChange}
        placeholder="Search for brokerages..."
      />
      {loading ? (
        <StyledComboboxPopover>
          <ComboboxList>
            <FontAwesomeIcon icon={faSpinner} spin />
          </ComboboxList>
        </StyledComboboxPopover>
      ) : (
        matchingBrokerages &&
        matchingBrokerages.length > 0 && (
          <StyledComboboxPopover>
            <ComboboxList>
              {matchingBrokerages.map((option: any, index) => {
                return (
                  <StyledComboboxOption key={index} value={option.id}>
                    <span>{option.name}</span>
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

export default WealthicaBrokerageSearchBar;
