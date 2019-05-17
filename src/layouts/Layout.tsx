import React from 'react';
import AppLayout from './AppLayout';

interface Props {
  children: any;
}

const Layout = ({ children }: Props) => {
  return <AppLayout>{children}</AppLayout>;
};

export default Layout;
