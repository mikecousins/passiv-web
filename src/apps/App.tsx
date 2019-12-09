import React, { useState, useEffect } from 'react';
import Layout from '../layouts/Layout';
import { Route, Redirect, Switch, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '@reach/menu-button/styles.css';
import {
  selectShowInsecureApp,
  selectShowOnboardingApp,
  selectShowSecureApp,
  selectLoggedIn,
} from '../selectors';
import { selectQueryTokens } from '../selectors/router';

import LoginPage from '../pages/LoginPage';
import RegistrationPage from '../pages/RegistrationPage';
import DemoLoginPage from '../pages/DemoLoginPage';
import SecureApp from './SecureApp';
// import InsecureApp from './InsecureApp';
import OnboardingApp from './OnboardingApp';
// import CommonRoutes from './CommonRoutes';
// import OauthRoutes from './OauthRoutes';
import { StripeProvider } from 'react-stripe-elements';

import HelpArticlePage from '../pages/HelpArticlePage';
import HelpPage from '../pages/HelpPage';
import ResetPasswordPage from '../pages/ResetPasswordPage';
import ResetPasswordConfirmPage from '../pages/ResetPasswordConfirmPage';
import QuestradeOauthPage from '../pages/QuestradeOauthPage';
import AlpacaOauthPage from '../pages/AlpacaOauthPage';
import InteractiveBrokersOauthPage from '../pages/InteractiveBrokersOauthPage';

import qs from 'qs';
import DashboardPage from '../pages/DashboardPage';
import GroupPage from '../pages/GroupPage';
import SettingsPage from '../pages/SettingsPage';
import CouponPage from '../pages/CouponPage';
import SharePage from '../pages/SharePage';
import AuthorizationPage from '../pages/AuthorizationPage';

import SetupGroupPage from '../pages/SetupGroupsPage';
import SetInitialTargetsPage from '../pages/SetInitialTargetsPage';
import OnboardingSummaryPage from '../pages/OnboardingSummaryPage';
import WelcomePage from '../pages/WelcomePage';

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

const questradeOauthRedirect = () => {
  let urlParams = new URLSearchParams(window.location.search);
  let newPath = '/app/oauth/questrade?' + urlParams;
  return <Redirect to={newPath} />;
};

const alpacaOauthRedirect = () => {
  let urlParams = new URLSearchParams(window.location.search);
  let newPath = '/app/oauth/alpaca?' + urlParams;
  return <Redirect to={newPath} />;
};

const interactiveBrokersOauthRedirect = () => {
  let urlParams = new URLSearchParams(window.location.search);
  let newPath = '/app/oauth/interactivebrokers?' + urlParams;
  return <Redirect to={newPath} />;
};

const App = () => {
  const showInsecureApp = useSelector(selectShowInsecureApp);
  const showOnboardingApp = useSelector(selectShowOnboardingApp);
  const showSecureApp = useSelector(selectShowSecureApp);
  const loggedIn = useSelector(selectLoggedIn);

  const location = useLocation();

  // include query params in deep link redirect for insecure app
  const queryParams = useSelector(selectQueryTokens);
  if (queryParams.next) {
    delete queryParams.next;
  }
  let appendParams = '';
  if (queryParams.length > 0) {
    const pieces = Object.entries(queryParams).map(([k, v]) => {
      return `${k}%3D${v}`;
    });
    appendParams = '%3F' + pieces.join('%26');
  }

  // redirect path for secure app
  let redirectPath = prefixPath('/dashboard');
  if (location && location.search) {
    const params = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });
    redirectPath = params.next;
  }

  // stripe provider
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
      <React.Fragment>
        <StripeProvider stripe={stripe}>
          <Switch>
            // common routes
            <Route
              path={prefixPath('/help/topic/:slug')}
              component={HelpArticlePage}
            />
            <Route path={prefixPath('/help')} component={HelpPage} />
            <Route
              path={prefixPath('/reset-password')}
              component={ResetPasswordPage}
            />
            <Route
              path={prefixPath('/reset-password-confirm/:token')}
              component={ResetPasswordConfirmPage}
            />
            // oauth routes
            {loggedIn && (
              <Route
                path={prefixPath('/oauth/questrade')}
                component={QuestradeOauthPage}
              />
            )}
            {loggedIn && (
              <Route
                exact
                path="/oauth/questrade"
                render={() => questradeOauthRedirect()}
              />
            )}
            {loggedIn && (
              <Route
                exact
                path="/oauth/questrade-trade"
                render={() => questradeOauthRedirect()}
              />
            )}
            {loggedIn && (
              <Route
                path={prefixPath('/oauth/alpaca')}
                component={AlpacaOauthPage}
              />
            )}
            {loggedIn && (
              <Route
                exact
                path="/oauth/alpaca"
                render={() => alpacaOauthRedirect()}
              />
            )}
            {loggedIn && (
              <Route
                path={prefixPath('/oauth/interactivebrokers')}
                component={InteractiveBrokersOauthPage}
              />
            )}
            {loggedIn && (
              <Route
                exact
                path="/oauth/interactivebrokers"
                render={() => interactiveBrokersOauthRedirect()}
              />
            )}
            // onboarding app
            {showOnboardingApp && (
              <Route path={prefixPath('/connect/:brokerage?')}>
                <AuthorizationPage onboarding={true} />
              </Route>
            )}
            {showOnboardingApp && (
              <Route path={prefixPath('/welcome')}>
                <WelcomePage />
              </Route>
            )}
            {showOnboardingApp && (
              <Route path={prefixPath('/setup-groups')}>
                <SetupGroupPage />
              </Route>
            )}
            {showOnboardingApp && (
              <Route path={prefixPath('/initial-targets')}>
                <SetInitialTargetsPage />
              </Route>
            )}
            {showOnboardingApp && (
              <Route path={prefixPath('/summary')}>
                <OnboardingSummaryPage />
              </Route>
            )}
            {showOnboardingApp && (
              <Route path="*">
                <Redirect to={prefixPath('/welcome')} />
              </Route>
            )}
            // secure app
            {showSecureApp && (
              <Route path="/" exact>
                <Redirect to={prefixPath('/dashboard')} />
              </Route>
            )}
            {showSecureApp && (
              <Route path={prefixPath('/')} exact>
                <Redirect to={prefixPath('/dashboard')} />
              </Route>
            )}
            {showSecureApp && (
              <Route
                path={prefixPath('/dashboard')}
                component={DashboardPage}
              />
            )}
            {showSecureApp && (
              <Route
                path={prefixPath('/group/:groupId')}
                component={GroupPage}
              />
            )}
            {showSecureApp && (
              <Route path={prefixPath('/settings/connect/:brokerage?')}>
                <AuthorizationPage onboarding={false} />
              </Route>
            )}
            {showSecureApp && (
              <Route path={prefixPath('/settings')} component={SettingsPage} />
            )}
            {showSecureApp && (
              <Route path={prefixPath('/coupon')} component={CouponPage} />
            )}
            {showSecureApp && (
              <Route path={prefixPath('/share')} component={SharePage} />
            )}
            // insecure app
            {showInsecureApp && (
              <Route path={prefixPath('/login')} component={LoginPage} />
            )}
            {showInsecureApp && (
              <Route
                path={prefixPath('/register')}
                component={RegistrationPage}
              />
            )}
            {showInsecureApp && (
              <Route path={prefixPath('/demo')} component={DemoLoginPage} />
            )}
            // catchalls // when logged in, catch unknown URLs and redirect to
            dashboard or 'next' query param if defined
            {showSecureApp && (
              <Route path="*">
                <Redirect to={redirectPath} />
              </Route>
            )}
            // when not logged in, catch unknown URLs (such as secure paths) and
            login with redirect
            {showInsecureApp && (
              <Route path="*">
                <Redirect
                  to={prefixPath(
                    `/login?next=${location.pathname}${appendParams}`,
                  )}
                />
              </Route>
            )}
          </Switch>
        </StripeProvider>
      </React.Fragment>
    </Layout>
  );
};

export default App;
