import React from 'react';
import { ModelAssetClass } from '../../types/modelAssetClass';
import styled from '@emotion/styled';
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
  ComboboxOptionText,
} from '@reach/combobox';
import '@reach/combobox/styles.css';
import { faSpinner, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
          {assetClassesAvailable.map((option: any, index) => {
            return (
              <StyledComboboxOption key={index} value={option.id}>
                {/* <ComboboxOptionText /> */}
                {option.name}
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
    </StyledCombobox>
  );
};

export default AssetClassSelector;
