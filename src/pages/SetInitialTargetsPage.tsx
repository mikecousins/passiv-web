import React from 'react';
import { Link } from 'react-router-dom';

const ImportAccountsPage = () => (
  <div>
    <p>This is where we auto-import all of your group targets.</p>
    <Link to="/initial-targets">Back</Link>
    <Link to="/summary">Next</Link>
  </div>
);

export default ImportAccountsPage;
