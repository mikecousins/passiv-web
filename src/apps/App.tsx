import React, { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { StripeProvider } from 'react-stripe-elements';
import Layout from '../layouts/Layout';
import HelpPage from '../pages/HelpPage';
import HelpArticlePage from '../pages/HelpArticlePage';
import UpdateNotification from '../components/UpdateNotification';
import '@reach/menu-button/styles.css';
import { selectLoggedIn } from '../selectors';
import { useSelector } from 'react-redux';
import SecureApp from './SecureApp';
import InsecureApp from './InsecureApp';

declare global {
  interface Window {
    Stripe: any;
  }
}

// hack to make routing work on both prod and dev
const prefixPath = (path: string) => {
  return `/app${path}`;
};

// use the stripe test key unless we're in prod
const stripePublicKey =
  process.env.REACT_APP_BASE_URL_OVERRIDE &&
  process.env.REACT_APP_BASE_URL_OVERRIDE === 'getpassiv.com'
    ? 'pk_live_LTLbjcwtt6gUmBleYqVVhMFX'
    : 'pk_test_UEivjUoJpfSDWq5i4xc64YNK';

const App = () => {
  const loggedIn = useSelector(selectLoggedIn);
  const [stripe, setStripe] = useState<any>(null);
  useEffect(() => {
    if (window.Stripe) {
      setStripe(window.Stripe(stripePublicKey));
    } else {
      document.querySelector('#stripe-js')!.addEventListener('load', () => {
        // Create Stripe instance once Stripe.js loads
        setStripe(window.Stripe(stripePublicKey));
      });
    }
  }, []);
  return (
    <Layout>
      <StripeProvider stripe={stripe}>
        <Switch>
          <Route
            path={prefixPath('/help/topic/:slug')}
            component={HelpArticlePage}
          />
          <Route path={prefixPath('/help')} component={HelpPage} />
          {loggedIn && <SecureApp />}
          {!loggedIn && <InsecureApp />}
          <UpdateNotification />
        </Switch>
      </StripeProvider>
    </Layout>
  );
};

export default App;
