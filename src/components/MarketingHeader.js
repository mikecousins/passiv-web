import React from 'react';
import { Link } from 'react-router-dom';

const MarketingHeader = () => (
  <nav>
    <div>
      <Link to="/">Passiv</Link>
      <Link to="/pricing">Pricing</Link>
      <Link to="/about">About</Link>
      <Link to="/app/login">Login</Link>
      <Link to="/app/register">Try For Free</Link>
    </div>
  </nav>
);

export default MarketingHeader;
