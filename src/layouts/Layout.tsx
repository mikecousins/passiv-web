import React from 'react';
import AppLayout from './AppLayout';

interface Props {
  children: JSX.Element;
}

const Layout = ({ children }: Props) => <AppLayout>{children}</AppLayout>;

export default Layout;
