import React, { Fragment, useState } from 'react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { Button } from '../styled/Button';
import Grid from '../styled/Grid';

const Input = styled.input`
  width: fit-content;
  font-size: 27px;
  font-weight: 500;
  border-bottom: 1px solid;
  @media (max-width: 900px) {
    max-width: 50%;
  }
`;

const Name = styled.span`
  font-size: inherit;
`;
const ToggleShow = styled(Button)`
  background: none;
  color: var(--brand-blue);
  font-size: 1rem;
  font-weight: 300;
  background: #fff;
  padding: 10px;
  position: relative;
  top: -4px;
  &:hover {
    background: var(--brand-blue);
    color: #fff;
  }
`;

const DropDown = styled.div`
  border: 1px solid var(--brand-blue);
  width: 40%;
  margin-top: 20px;
  padding: 22px 20px 24px;
  background: #def2ff;
  border-radius: 4px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
  font-size: 18px;
  @media (max-width: 900px) {
    top: 112%;
  }
`;

type Props = {
  value: string;
  edit?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;

  //TODO: replace types with correct types
  StyledInput?: any;
  StyledName?: any;
  children?: any;
};

const DropDownOptions = ({
  value,
  edit,
  onChange,
  onKeyPress,
  StyledInput = Input,
  StyledName = Name,
  children,
}: Props) => {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <Fragment>
      <Grid columns="1fr 2fr" style={{ display: 'inline-block' }}>
        <ToggleShow onClick={() => setShowOptions(!showOptions)}>
          <FontAwesomeIcon icon={faEllipsisV} />
        </ToggleShow>
        {edit ? (
          <StyledInput
            type="text"
            autoFocus
            value={value}
            onChange={onChange}
            onKeyPress={onKeyPress}
          />
        ) : (
          <StyledName>{value}</StyledName>
        )}
      </Grid>
      {showOptions && <DropDown>{children}</DropDown>}
    </Fragment>
  );
};

export default DropDownOptions;
