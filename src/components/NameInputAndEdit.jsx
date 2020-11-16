import React, { Fragment } from 'react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
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
  font-weight: 900;
`;
const StyledP = styled(P)`
  background: #fff;
  display: inline-block;
  position: relative;
  top: -24px;
  padding: 0 15px;
  margin-bottom: -7px;
`;

const NameInputAndEdit = (props) => {
  return (
    <Fragment>
      {props.edit ? (
        <div style={props.styleDiv}>
          <Input
            type="text"
            value={props.value}
            onChange={props.onChange}
            onKeyPress={props.onKeyPress}
          />
          <SmallButton
            onClick={props.onClick}
            style={{ position: 'relative', top: '-4px' }}
          >
            Done
          </SmallButton>
        </div>
      ) : (
        <div style={props.styleDiv}>
          <Name>{props.value}</Name>
          <Edit onClick={props.onClickEdit}>
            <FontAwesomeIcon icon={faPen} />
            Edit Name
          </Edit>
        </div>
      )}
    </Fragment>
  );
};

export default NameInputAndEdit;
