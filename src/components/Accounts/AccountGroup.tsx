import React from 'react';

type Props = {
  name: string;
  children: JSX.Element[];
};

const AccountGroup = ({ name, children }: Props) => (
  <div>
    <h3>{name}</h3>
    {children}
  </div>
);

export default AccountGroup;
