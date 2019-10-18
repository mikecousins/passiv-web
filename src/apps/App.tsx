import React from 'react';
import Layout from '../layouts/Layout';
import '@reach/menu-button/styles.css';
import { selectLoggedIn } from '../selectors';
import { useSelector } from 'react-redux';
import SecureApp from './SecureApp';
import InsecureApp from './InsecureApp';

const App = () => {
  const loggedIn = useSelector(selectLoggedIn);
  return <Layout>{loggedIn ? <SecureApp /> : <InsecureApp />}</Layout>;
};

export default App;
