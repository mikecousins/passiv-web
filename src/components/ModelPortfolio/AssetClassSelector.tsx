import React, { useState, useEffect, useRef } from 'react';
import { ModelAssetClass } from '../../types/modelAssetClass';
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
import { faSpinner, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { selectCurrentGroupId } from '../../selectors/groups';

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
  padding: 10px;
  border-left: 1px solid var(--brand-blue);
  padding: 10px;
  color: var(--brand-blue);
  font-weight: 600;
  font-size: 18px;
  ::placeholder {
    opacity: 1;
  }
  @media (max-width: 900px) {
    width: auto;
    margin-bottom: 20px;
  }
`;

const StyledComboboxPopover = styled(ComboboxPopover)`
  z-index: 5;
`;

const StyledComboboxList = styled(ComboboxList)`
  box-sizing: border-box;
  width: 553px;
  padding: 10px;
  border: 1px solid var(--brand-blue);
  background: #f2f3fd;
  line-height: 30px;
  font-size: 18px;
  font-weight: 600;
`;

const StyledComboboxOption = styled(ComboboxOption)`
  &: hover {
    background: var(--brand-green);
  }
`;

const AddAssetClassBtn = styled.li`
  cursor: pointer;
  color: var(--brand-blue);
`;

type Props = {
  value: any;
  assetClassesAvailable: ModelAssetClass[];
  onSelect: (modelAssetClass: any) => void;
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

const AssetClassSelector = ({
  value,
  assetClassesAvailable,
  onSelect,
}: Props) => {
  const [matchingModelAssetClasses, setMatchingModelAssetClasses] = useState<
    any[]
  >();
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [val, setVal] = useState(value);

  const loadOptions = () => {
    setLoading(true);
    setMatchingModelAssetClasses(assetClassesAvailable);
    setLoading(false);
  };

  const handleSelect = (id: string) => {
    if (!matchingModelAssetClasses) {
      return;
    }
    const modelAssetClass = matchingModelAssetClasses.find(
      (modelAssetClass) => id === modelAssetClass.name,
    );
    if (modelAssetClass) {
      onSelect(modelAssetClass);
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
    <StyledCombobox onSelect={handleSelect}>
      <StyledInput
        value={val}
        onChange={onChange}
        placeholder="Pick Asset Class"
      />
      {loading ? (
        <StyledComboboxPopover>
          <ComboboxList>
            <FontAwesomeIcon icon={faSpinner} spin />
          </ComboboxList>
        </StyledComboboxPopover>
      ) : (
        matchingModelAssetClasses &&
        matchingModelAssetClasses.length > 0 && (
          <StyledComboboxPopover>
            <StyledComboboxList>
              {matchingModelAssetClasses.map((option: any, index) => {
                return (
                  <StyledComboboxOption key={index} value={option.name}>
                    <span>{option.name}</span>
                  </StyledComboboxOption>
                );
              })}
              <AddAssetClassBtn>
                <FontAwesomeIcon
                  icon={faPlus}
                  size="sm"
                  style={{ position: 'relative' }}
                />{' '}
                New Asset Class
              </AddAssetClassBtn>
            </StyledComboboxList>
          </StyledComboboxPopover>
        )
      )}
    </StyledCombobox>
  );
};

export default AssetClassSelector;
