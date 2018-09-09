import React from 'react';
import { Link } from 'react-router-dom';

const MarketingHeader = () => (
  <nav className="flex items-center justify-between flex-wrap py-6 bg-white">
    <div className="flex items-center flex-no-shrink text-black mr-6">
      <Link to="/" className="font-semibold text-5xl tracking-tight">Passiv</Link>
      <Link to="/pricing">Pricing</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </div>
  </nav>
);

export default MarketingHeader;
