import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import styled from '@emotion/styled';
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from '@reach/combobox';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const StyledCombobox = styled(Combobox)`
  width: 500px;
  position: relative;
  z-index: 5;
  display: inline-block;
  @media (max-width: 900px) {
    width: auto;
  }
`;

export const StyledComboboxInput = styled(ComboboxInput)`
  width: 500px;
  padding: 12px 10px 8px;
  color: var(--brand-blue);
  font-weight: 600;
  font-size: 18px;
  ::placeholder {
    opacity: 1;
  }
  @media (max-width: 740px) {
    width: auto;
    border: none;
    padding: 0;
  }
`;

const StyledComboboxPopover = styled(ComboboxPopover)`
  z-index: 5;
`;

export const StyledComboboxList = styled(ComboboxList)`
  box-sizing: border-box;
  width: 553px;
  padding: 10px;
  border: 1px solid var(--brand-blue);
  background: #f2f3fd;
  line-height: 30px;
  font-size: 18px;
  font-weight: 600;
`;

export const StyledComboboxOption = styled(ComboboxOption)`
  &:hover {
    background: var(--brand-green);
  }
`;

const AddAssetClassBtn = styled.li`
  cursor: pointer;
  color: var(--brand-blue);
  margin-top: 20px;
`;

type Props = {
  name: string;
  id: string;
  availableAssetClasses: any[];
  clearInput?: number;
  onSelect: any;
};

const AssetClassSelector = ({
  name,
  id,
  availableAssetClasses,
  clearInput,
  onSelect,
}: Props) => {
  const [backToAssetClass, setBackToAssetClass] = useState(false);
  const [input, setInput] = useState('');
  useEffect(() => {
    setInput('');
  }, [clearInput]);

  if (backToAssetClass) {
    return <Redirect exact to="/app/asset-class" />;
  }

  const onChange = (event: any) => {
    setInput(event.target.value);
  };

  const handleSelect = (id: string) => {
    const assetClass = availableAssetClasses.find((astCls) => id === astCls.id);
    if (assetClass) {
      setInput(assetClass.name);
      onSelect(assetClass);
    }
  };

  return (
    <StyledCombobox onSelect={handleSelect}>
      <StyledComboboxInput
        value={input}
        placeholder="Pick Asset Class"
        name={name}
        id={id}
        onChange={onChange}
        onKeyPress={(event: any) =>
          event.key === 'Enter' && handleSelect(event.target.value)
        }
      />
      <StyledComboboxPopover>
        <StyledComboboxList>
          {availableAssetClasses.map((option, index) => {
            return (
              <StyledComboboxOption key={index} value={option.id}>
                {option.name}
              </StyledComboboxOption>
            );
          })}
          <AddAssetClassBtn onClick={() => setBackToAssetClass(true)}>
            <FontAwesomeIcon icon={faPlus} size="sm" /> New Asset Class
          </AddAssetClassBtn>
        </StyledComboboxList>
      </StyledComboboxPopover>
    </StyledCombobox>
  );
};

export default AssetClassSelector;
