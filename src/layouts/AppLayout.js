import React from 'react';
import Header from '../components/Header';
import SideBar from '../components/SideBar';

const AppLayout = (props) => (
  <div className="container mx-auto shadow bg-grey-lightest pb-2">
    <Header />
    <div className="min-h-screen md:flex">
      <div className="flex-none w-full md:max-w-xs bg-black text-white">
        <SideBar />
      </div>
      <div className="flex-1 bg-grey-lightest p-4">
        {props.children}
      </div>
    </div>
  </div>
);

export default AppLayout;
