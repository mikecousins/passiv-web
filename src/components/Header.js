import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogoutButton from './LogoutButton';
import RefreshButton from './RefreshButton';


const Header = () => (
  <nav className="flex items-center justify-between flex-wrap py-6 bg-white">
    <div className="flex items-center flex-no-shrink text-black mr-6">
      <Link to="/" >
        <span className="font-semibold text-5xl tracking-tight">Passiv</span>
      </Link>
    </div>
    <div className="flex items-center flex-no-shrink text-black mr-6">
      <RefreshButton />
    </div>
    <div className="flex items-center flex-no-shrink text-black mr-6">
      <LogoutButton />
    </div>
  </nav>
);

const select = state => ({});

export default connect(select)(Header);
