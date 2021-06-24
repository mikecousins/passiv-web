import React from 'react';
import { BulletUL } from '../styled/GlobalElements';
import ShadowBox from '../styled/ShadowBox';
import styled from '@emotion/styled';
import { P } from '../styled/GlobalElements';

const PaddedUL = styled(BulletUL)`
  padding-top: 15px;
`;

const H1 = styled.h1`
  font-size: 1.2em;
`;

const PasswordRequirements = () => {
  return (
    <ShadowBox>
      <H1>Password requirements</H1>
      <PaddedUL>
        <li>
          <P>must contain at least 8 characters</P>
        </li>
        <li>
          <P>can't be a commonly used password</P>
        </li>
        <li>
          <P>can't be entirely numeric</P>
        </li>
      </PaddedUL>
    </ShadowBox>
  );
};

export default PasswordRequirements;
