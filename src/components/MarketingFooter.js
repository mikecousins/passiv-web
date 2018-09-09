import React from 'react';
import { Link } from 'react-router-dom';

const MarketingFooter = () => (
  <nav className="flex items-center justify-between flex-wrap py-6 bg-white">
    <div className="flex items-center flex-no-shrink text-black mr-6">
      <Link to="/" className="font-semibold tracking-tight">Passiv</Link>
    </div>
  </nav>
);

export default MarketingFooter;
