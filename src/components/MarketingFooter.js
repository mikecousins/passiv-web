import React from 'react';
import { Link } from 'react-router-dom';

const MarketingFooter = () => (
  <ul>
    <li>
      <Link to="/blog">Blog</Link>
    </li>
    <li>
      <Link to="/termsofservice">Terms Of Service</Link>
    </li>
    <li>
      <Link to="/privacy">Privacy</Link>
    </li>
    <li>
      <Link to="/security">Security</Link>
    </li>
  </ul>
);

export default MarketingFooter;
