import React, { Fragment } from 'react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { A, Edit } from '../styled/GlobalElements';
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

const CancelButton = styled(A)`
  margin-left: 15px;
`;

const Container = styled.div``;

const Name = styled.span`
  font-size: inherit;
`;

type Props = {
  value: string;
  edit: boolean;
  cancelButton?: boolean;
  allowEdit: boolean;
  doneBtnTxt?: string;
  editBtnTxt?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onClickDone: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onClickEdit: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onClickCancel?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;

  //TODO: replace Style components' types with correct types
  StyledContainer?: any;
  StyledInput?: any;
  StyledDoneButton?: any;
  StyledName?: any;
  StyledEditButton?: any;
  StyledCancelButton?: any;
};

const NameInputAndEdit = ({
  value,
  edit,
  cancelButton,
  allowEdit,
  doneBtnTxt = 'Done',
  editBtnTxt = 'Edit',
  onChange,
  onKeyPress,
  onClickDone,
  onClickEdit,
  onClickCancel,
  StyledContainer = Container,
  StyledInput = Input,
  StyledDoneButton = SmallDoneButton,
  StyledName = Name,
  StyledEditButton = Edit,
  StyledCancelButton = CancelButton,
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
          <StyledDoneButton onClick={onClickDone} type="button">
            {doneBtnTxt}
          </StyledDoneButton>
          {cancelButton && (
            <StyledCancelButton onClick={onClickCancel} type="button">
              Cancel
            </StyledCancelButton>
          )}
        </StyledContainer>
      ) : (
        <StyledContainer>
          <StyledName>{value}</StyledName>
          {allowEdit && (
            <StyledEditButton onClick={onClickEdit} type="button">
              <FontAwesomeIcon icon={faPen} />
              {editBtnTxt}
            </StyledEditButton>
          )}
        </StyledContainer>
      )}
    </Fragment>
  );
};

export default NameInputAndEdit;
