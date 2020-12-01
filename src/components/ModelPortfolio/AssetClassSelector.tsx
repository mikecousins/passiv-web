import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { ModelAssetClass } from '../../types/modelAssetClass';
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

const StyledInput = styled(ComboboxInput)`
  width: 500px;
  padding: 10px;
  border-left: 1px solid var(--brand-blue);
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

const StyledComboboxList = styled(ComboboxList)`
  box-sizing: border-box;
  width: 553px;
  padding: 10px !important; //? why this style wouldn't get applied without !important
  border: 1px solid var(--brand-blue);
  background: #f2f3fd;
  line-height: 30px;
  font-size: 18px;
  font-weight: 600;
`;

const StyledComboboxOption = styled(ComboboxOption)`
  &:hover {
    background: var(
      --brand-green
    ) !important; //? why this style wouldn't get applied without !important
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
  assetClassesAvailable: ModelAssetClass[];
  onSelect: any;
};

const AssetClassSelector = ({
  name,
  id,
  assetClassesAvailable,
  onSelect,
}: Props) => {
  const [backToAssetClass, setBackToAssetClass] = useState(false);

  if (backToAssetClass) {
    return (
      <Redirect
        exact
        to="/app/asset-class/6050c7fa-7c27-47d8-b5b6-206cbc994733"
      />
    ); //TODO change the hardcoded groupId
  }

  return (
    <StyledCombobox>
      <StyledInput
        placeholder="Pick Asset Class"
        onSelect={onSelect}
        name={name}
        id={id}
      />
      <StyledComboboxPopover>
        <StyledComboboxList>
          {assetClassesAvailable.map((option, index) => {
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
