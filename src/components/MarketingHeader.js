import React from 'react';
import { Link } from 'react-router-dom';

const MarketingHeader = () => (
  <nav className="flex items-center justify-between flex-wrap py-6 bg-white">
    <div className="flex items-center flex-no-shrink text-black mr-6">
      <Link to="/" className="font-semibold text-5xl tracking-tight no-underline">Passiv</Link>
      <Link to="/pricing" className="no-underline">Pricing</Link>
      <Link to="/about" className="no-underline">About</Link>
      <Link to="/login" className="no-underline">Login</Link>
      <Link to="/register" className="no-underline">Try For Free</Link>
    </div>
  </nav>
);

export default MarketingHeader;
