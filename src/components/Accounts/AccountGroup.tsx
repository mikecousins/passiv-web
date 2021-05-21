import React from 'react';
import styled from '@emotion/styled';
import HiddenAccountsTooltip from '../HiddenAccountsTooltip';

type GroupHeadingProps = {
  isOnboarding: boolean;
};

export const GroupHeading = styled.h3<GroupHeadingProps>`
  background: ${(props) =>
    props.isOnboarding ? 'var(--brand-light-green)' : 'white'};
  display: inline-block;
  position: relative;
  top: -24px;
  padding: 0 15px;
  margin-bottom: -7px;
  font-size: 26px;
`;

type Props = {
  name: string;
  isOnboarding: boolean;
  children?: JSX.Element;
};

const AccountGroup = ({ name, children, isOnboarding }: Props) => {
  return (
    <>
      <GroupHeading isOnboarding={isOnboarding}>
        {name} {name === 'Hidden Accounts' && <HiddenAccountsTooltip />}
      </GroupHeading>
      {children}
    </>
  );
};

export default AccountGroup;
