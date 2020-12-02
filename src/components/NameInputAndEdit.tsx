import React, { Fragment } from 'react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { Edit } from '../styled/GlobalElements';
import { SmallButton } from '../styled/Button';

const Input = styled.input`
  width: fit-content;
  font-size: 27px;
  font-weight: 500;
  border-bottom: 1px solid;
  @media (max-width: 900px) {
    max-width: 50%;
  }
`;

const SmallDoneButton = styled(SmallButton)`
  padding: 5px 10px;
  margin-left: 10px;
`;

const Container = styled.div``;

const Name = styled.span`
  font-size: inherit;
`;

type Props = {
  value: string;
  edit: boolean;
  doneBtnTxt?: string;
  editBtnTxt?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onClickDone: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onClickEdit: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;

  //TODO: replace Style components' types with correct types
  StyledContainer?: any;
  StyledInput?: any;
  StyledDoneButton?: any;
  StyledName?: any;
  StyledEditButton?: any;
};

const NameInputAndEdit = ({
  value,
  edit,
  doneBtnTxt = 'Done',
  editBtnTxt = 'Edit',
  onChange,
  onKeyPress,
  onClickDone,
  onClickEdit,
  StyledContainer = Container,
  StyledInput = Input,
  StyledDoneButton = SmallDoneButton,
  StyledName = Name,
  StyledEditButton = Edit,
}: Props) => {
  return (
    <Fragment>
      {edit ? (
        <StyledContainer>
          <StyledInput
            type="text"
            autoFocus
            value={value}
            onChange={onChange}
            onKeyPress={onKeyPress}
          />
          <StyledDoneButton onClick={onClickDone}>
            {doneBtnTxt}
          </StyledDoneButton>
        </StyledContainer>
      ) : (
        <StyledContainer>
          <StyledName>{value}</StyledName>
          <StyledEditButton onClick={onClickEdit}>
            <FontAwesomeIcon icon={faPen} />
            {editBtnTxt}
          </StyledEditButton>
        </StyledContainer>
      )}
    </Fragment>
  );
};

export default NameInputAndEdit;
