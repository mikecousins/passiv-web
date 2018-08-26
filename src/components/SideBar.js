import React from 'react';
import { Link } from 'react-router-dom';

const SideBar = () => (
  <div>
    <Link to="/" className="block text-white no-underline text-lg tracking-wide pl-10 py-2">Dashboard</Link>
    <Link to="/group" className="block text-white no-underline text-lg tracking-wide pl-10 py-2">Group</Link>
    <Link to="/account" className="block text-white no-underline text-lg tracking-wide pl-10 py-2">Account</Link>
    <Link to="/settings" className="block text-white no-underline text-lg tracking-wide pl-10 py-2">Settings</Link>
  </div>
);

export default SideBar;
