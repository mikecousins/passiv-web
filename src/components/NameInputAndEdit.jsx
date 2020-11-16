import React, { Fragment } from 'react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTimes } from '@fortawesome/free-solid-svg-icons';
import { P, Edit } from '../styled/GlobalElements';
import { SmallButton } from '../styled/Button';

const Input = styled.input`
  width: 40%;
  font-size: 27px;
  font-weight: 500;
  padding: 5px;
  margin: 10px;
  border: 1px solid;
`;

const Name = styled.span`
  font-size: 27px;
  font-weight: 500;
  margin: 10px;
  padding: 10px;
`;

const NameInputAndEdit = ({
  value,
  edit,
  onChange,
  onClick,
  onKeyPress,
  onClickEdit,
}) => {
  return (
    <Fragment>
      {edit ? (
        <Fragment>
          {' '}
          <Input
            type="text"
            value={value}
            onChange={onChange}
            onKeyPress={onKeyPress}
          />
          <SmallButton
            onClick={onClick}
            style={{ position: 'relative', top: '-4px' }}
          >
            Done
          </SmallButton>{' '}
        </Fragment>
      ) : (
        <P>
          <Name>{value}</Name>
          <Edit onClick={onClickEdit}>
            <FontAwesomeIcon icon={faPen} />
            Edit
          </Edit>
        </P>
      )}
    </Fragment>
  );
};

export default NameInputAndEdit;
