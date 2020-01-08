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

export const PasswordRequirements = () => {
  return (
    <ShadowBox>
      <P>
        <H1>Password requirements</H1>
        <PaddedUL>
          <li>must contain at least 8 characters</li>
          <li>can't be a commonly used password</li>
          <li>can't be entirely numeric</li>
        </PaddedUL>
      </P>
    </ShadowBox>
  );
};

export default PasswordRequirements;
