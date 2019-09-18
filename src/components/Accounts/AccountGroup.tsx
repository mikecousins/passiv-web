import React from 'react';
import { H3 } from '../../styled/GlobalElements';

type Props = {
  name: string;
  children?: JSX.Element[];
};

const AccountGroup = ({ name, children }: Props) => (
  <div>
    <H3>{name}</H3>
    {children}
  </div>
);

export default AccountGroup;
