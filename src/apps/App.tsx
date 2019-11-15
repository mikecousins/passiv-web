import React from 'react';
import Layout from '../layouts/Layout';
import '@reach/menu-button/styles.css';
import {
  selectShowInsecureApp,
  selectShowOnboardingApp,
  selectShowSecureApp,
  selectIsAuthorized,
} from '../selectors';
import { useSelector } from 'react-redux';
import SecureApp from './SecureApp';
import InsecureApp from './InsecureApp';
import OnboardingApp from './OnboardingApp';
import CommonRoutes from './CommonRoutes';
import OauthRoutes from './OauthRoutes';

const App = () => {
  const showInsecureApp = useSelector(selectShowInsecureApp);
  const showOnboardingApp = useSelector(selectShowOnboardingApp);
  const showSecureApp = useSelector(selectShowSecureApp);
  const isAuthorized = useSelector(selectIsAuthorized);
  return (
    <Layout>
      <React.Fragment>
        <CommonRoutes />
        {isAuthorized && <OauthRoutes />}
        {showInsecureApp && <InsecureApp />}
        {showOnboardingApp && <OnboardingApp />}
        {showSecureApp && <SecureApp />}
      </React.Fragment>
    </Layout>
  );
};

export default App;
