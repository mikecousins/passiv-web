import React from 'react';
import { Link } from 'react-router-dom';

const MarketingFooter = () => (
  <ul className="list-reset flex bg-black py-4">
    <li className="mr-6">
      <Link className="text-white no-underline" to="/blog">Blog</Link>
    </li>
    <li className="mr-6">
      <Link className="text-white no-underline" to="/termsofservice">Terms Of Service</Link>
    </li>
    <li className="mr-6">
      <Link className="text-white no-underline" to="/privacy">Privacy</Link>
    </li>
    <li className="mr-6">
      <Link className="text-white no-underline" to="/security">Security</Link>
    </li>
  </ul>
);

export default MarketingFooter;
