import React, { useState } from 'react';
import { Input } from '../styled/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import styled from '@emotion/styled';

type Props = {
  error: string | boolean | undefined;
};

const IconInput = styled(Input)`
  margin-bottom: -30px;
`;

const IconBox = styled.div`
  display: block;
  height: 40px;
  text-align: left;
  padding-left: 70px;
  padding-top: 10px;
  font: 22px sans-serif;
  position: relative;
  top: 0;
  left: 0;
  svg {
    position: absolute;
    right: 15px;
    bottom: 37px;
    cursor: pointer;
  }
`;

const PasswordField = ({ error }: Props) => {
  const [visible, setVisible] = useState<boolean>(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <React.Fragment>
      <IconInput
        error={error}
        type={visible ? 'text' : 'password'}
        name="password"
        placeholder="Password"
      />
      <IconBox>
        <i onClick={() => toggleVisibility()}>
          {visible ? (
            <FontAwesomeIcon icon={faEyeSlash} />
          ) : (
            <FontAwesomeIcon icon={faEye} />
          )}
        </i>
      </IconBox>
    </React.Fragment>
  );
};

export default PasswordField;
