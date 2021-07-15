import React from 'react';
import styled from '@emotion/styled';
import HiddenAccountsTooltip from '../HiddenAccountsTooltip';

const GroupHeading = styled.h3`
  background: #fff;
  display: inline-block;
  position: relative;
  top: -24px;
  padding: 0 15px;
  margin-bottom: -7px;
  font-size: 26px;
`;

type Props = {
  name: string;
  children?: JSX.Element;
};

const AccountGroup = ({ name, children }: Props) => {
  return (
    <>
      <GroupHeading>
        {name} {name === 'Hidden Accounts' && <HiddenAccountsTooltip />}
      </GroupHeading>
      {children}
    </>
  );
};

export default AccountGroup;
