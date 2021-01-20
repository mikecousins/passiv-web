import React, { useState, useEffect } from 'react';
import Layout from '../layouts/Layout';
import {
  Route,
  Redirect,
  Switch,
  useLocation,
  matchPath,
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import qs from 'qs';
import { StripeProvider } from 'react-stripe-elements';
import '@reach/menu-button/styles.css';
import {
  selectLoggedIn,
  selectReferralCode,
  selectTrackingId,
} from '../selectors';
import {
  selectShowInsecureApp,
  selectShowOnboardingApp,
  selectShowSecureApp,
} from '../selectors/app';
import { generateTrackingCode } from '../seo';
import { setReferralCode, setTrackingId } from '../actions';
import { selectQueryTokens } from '../selectors/router';
import { prefixPath } from '../common';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import GoalDetailPage from '../pages/GoalDetailPage';
import { selectGoalsPageFeature } from '../selectors/features';
import {
  LOGIN_PATH,
  REGISTER_PATH,
  HELP_PATH,
  RESET_PASSWORD_PATH,
  DASHBOARD_PATH,
  GROUP_PATH,
  SETTINGS_PATH,
  REFERRALS_PATH,
  REPORTING_PATH,
  GOALS_PATH,
} from './Paths';

// preload pages
const ReactLazyPreload = (importStatement: any) => {
  const Component = React.lazy(importStatement);
  //@ts-ignore
  Component.preload = importStatement;
  return Component;
};

// code splitting to load our pages
const LoginPage = ReactLazyPreload(() =>
  import(/* webpackChunkName: "login" */ '../pages/LoginPage'),
);

const RegistrationPage = ReactLazyPreload(() =>
  import(/* webpackChunkName: "registration" */ '../pages/RegistrationPage'),
);

const DemoLoginPage = ReactLazyPreload(() =>
  import(/* webpackChunkName: "demo-login" */ '../pages/DemoLoginPage'),
);

const HelpArticlePage = ReactLazyPreload(() =>
  import(/* webpackChunkName: "help-article" */ '../pages/HelpArticlePage'),
);

const HelpPage = ReactLazyPreload(() =>
  import(/* webpackChunkName: "help" */ '../pages/HelpPage'),
);

const ResetPasswordPage = ReactLazyPreload(() =>
  import(/* webpackChunkName: "reset-password" */ '../pages/ResetPasswordPage'),
);

const ResetPasswordConfirmPage = ReactLazyPreload(() =>
  import(
    /* webpackChunkName: "reset-password-confirm" */ '../pages/ResetPasswordConfirmPage'
  ),
);

const SetNewPasswordPage = ReactLazyPreload(() =>
  import(
    /* webpackChunkName: "set-new-password" */ '../pages/SetNewPasswordPage'
  ),
);

const QuestradeOauthPage = ReactLazyPreload(() =>
  import(
    /* webpackChunkName: "questrade-oauth" */ '../pages/QuestradeOauthPage'
  ),
);

const TradierOauthPage = ReactLazyPreload(() =>
  import(/* webpackChunkName: "tradier-oauth" */ '../pages/TradierOauthPage'),
);

const AlpacaOauthPage = ReactLazyPreload(() =>
  import(/* webpackChunkName: "alpaca-oauth" */ '../pages/AlpacaOauthPage'),
);

const InteractiveBrokersOauthPage = ReactLazyPreload(() =>
  import(
    /* webpackChunkName: "interactive-brokers-oauth" */ '../pages/InteractiveBrokersOauthPage'
  ),
);

const TDAmeritradeOauthPage = ReactLazyPreload(() =>
  import(
    /* webpackChunkName: "td-ameritrade-oauth" */ '../pages/TDAmeritradeOauthPage'
  ),
);

const WealthicaOauthPage = ReactLazyPreload(() =>
  import(
    /* webpackChunkName: "td-ameritrade-oauth" */ '../pages/WealthicaOauthPage'
  ),
);

const UpgradeOfferPage = ReactLazyPreload(() =>
  import(/* webpackChunkName: "upgrade-offer" */ '../pages/UpgradeOfferPage'),
);

const LoginLoadingPage = ReactLazyPreload(() =>
  import(/* webpackChunkName: "login-loading" */ '../pages/LoginLoadingPage'),
);

const DashboardPage = ReactLazyPreload(() =>
  import(/* webpackChunkName: "dashboard" */ '../pages/DashboardPage'),
);

const GroupPage = ReactLazyPreload(() =>
  import(/* webpackChunkName: "group" */ '../pages/GroupPage'),
);

const CouponPage = ReactLazyPreload(() =>
  import(/* webpackChunkName: "coupon" */ '../pages/CouponPage'),
);

const SharePage = ReactLazyPreload(() =>
  import(/* webpackChunkName: "share" */ '../pages/SharePage'),
);

const AuthorizationPage = ReactLazyPreload(() =>
  import(/* webpackChunkName: "authorization" */ '../pages/AuthorizationPage'),
);

const WelcomePage = ReactLazyPreload(() =>
  import(/* webpackChunkName: "welcome" */ '../pages/WelcomePage'),
);

const SettingsPage = ReactLazyPreload(() =>
  import(/* webpackChunkName: "settings" */ '../pages/SettingsPage'),
);

const ReferralPage = ReactLazyPreload(() =>
  import(/* webpackChunkName: "referrals" */ '../pages/ReferralPage'),
);

const UpgradePage = ReactLazyPreload(() =>
  import(/* webpackChunkName: "upgrade" */ '../pages/UpgradePage'),
);

const PerformancePage = ReactLazyPreload(() =>
  import(/* webpackChunkName: "performance" */ '../pages/PerformancePage'),
);

const GoalsPage = ReactLazyPreload(() =>
  import(/* webpackChunkName: "goals" */ '../pages/GoalsPage'),
);

// declare global {
//   interface Window {
//     Stripe: any;
//   }
// }

// list of all the routes that has any link associate with them in the app
const routes = [
  { path: LOGIN_PATH, exact: true, component: LoginPage },
  { path: REGISTER_PATH, exact: true, component: RegistrationPage },
  { path: HELP_PATH, exact: true, component: HelpPage },
  { path: RESET_PASSWORD_PATH, exact: true, component: ResetPasswordPage },
  { path: DASHBOARD_PATH, exact: true, component: DashboardPage },
  { path: GROUP_PATH, exact: false, component: GroupPage },
  { path: SETTINGS_PATH, exact: true, component: SettingsPage },
  { path: REFERRALS_PATH, exact: true, component: ReferralPage },
  { path: REPORTING_PATH, exact: true, component: PerformancePage },
  { path: GOALS_PATH, exact: true, component: GoalsPage },
];

const findComponentForRoute = (path: any, routes: any) => {
  const matchingRoute = routes.find((route: any) =>
    matchPath(path, {
      path: route.path,
      exact: route.exact,
    }),
  );
  return matchingRoute ? matchingRoute.component : null;
};
export const preloadRouteComponent = (to: string) => {
  const component = findComponentForRoute(to, routes);
  if (component && component.preload) {
    component.preload();
  }
};

// use the stripe test key unless we're in prod
const stripePublicKey =
  process.env.REACT_APP_BASE_URL_OVERRIDE &&
  process.env.REACT_APP_BASE_URL_OVERRIDE === 'api.passiv.com'
    ? 'pk_live_LTLbjcwtt6gUmBleYqVVhMFX'
    : 'pk_test_UEivjUoJpfSDWq5i4xc64YNK';

const questradeOauthRedirect = () => {
  let urlParams = new URLSearchParams(window.location.search);
  let newPath = '/app/oauth/questrade?' + urlParams;
  return <Redirect to={newPath} />;
};

const tradierOauthRedirect = () => {
  let urlParams = new URLSearchParams(window.location.search);
  let newPath = '/app/oauth/tradier?' + urlParams;
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

const tdAmeritradeOauthRedirect = () => {
  let urlParams = new URLSearchParams(window.location.search);
  let newPath = '/app/oauth/td?' + urlParams;
  return <Redirect to={newPath} />;
};

const wealthicaOauthRedirect = () => {
  let urlParams = new URLSearchParams(window.location.search);
  let newPath = '/app/oauth/wealthica?' + urlParams;
  return <Redirect to={newPath} />;
};

const App = () => {
  const showInsecureApp = useSelector(selectShowInsecureApp);
  const showOnboardingApp = useSelector(selectShowOnboardingApp);
  const showSecureApp = useSelector(selectShowSecureApp);
  const referralCode = useSelector(selectReferralCode);
  const trackingId = useSelector(selectTrackingId);
  const loggedIn = useSelector(selectLoggedIn);
  const location = useLocation();
  const goalsPageFeatureActive = useSelector(selectGoalsPageFeature);
  const dispatch = useDispatch();

  const queryParams = useSelector(selectQueryTokens);

  let updateQuery = false;

  // extract referral code (if any) and make available on registration page
  if (queryParams.ref) {
    if (queryParams.ref !== referralCode) {
      dispatch(setReferralCode({ referralCode: queryParams.ref }));
    }
    delete queryParams.ref;
    updateQuery = true;
  }

  // extract tracking id (if any) and make available on registration page
  if (queryParams.uid) {
    if (queryParams.uid !== trackingId) {
      dispatch(setTrackingId({ trackingId: queryParams.uid }));
    }
    delete queryParams.uid;
    updateQuery = true;
  } else {
    if (trackingId === '') {
      dispatch(setTrackingId({ trackingId: generateTrackingCode() }));
    }
  }

  // include query params in deep link redirect for insecure app
  if (queryParams.next) {
    delete queryParams.next;
    updateQuery = true;
  }
  let appendParams = '';
  if (Object.keys(queryParams).length > 0) {
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
    if (params.next) {
      redirectPath = params.next as string;
      queryParams.next = redirectPath;
    }
  }

  if (updateQuery) {
    const newQuery = qs.stringify(queryParams);
    let newPath = location.pathname;
    if (newQuery) {
      newPath += '?' + newQuery;
    }
    window.history.replaceState({}, '', newPath);
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
      <StripeProvider stripe={stripe}>
        <React.Suspense fallback={<FontAwesomeIcon icon={faSpinner} spin />}>
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
            <Route
              path={prefixPath('/set-new-password/:token')}
              component={SetNewPasswordPage}
            />
            <Route path={prefixPath('/demo')} component={DemoLoginPage} />
            // oauth routes
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
                path={prefixPath('/oauth/questrade')}
                component={QuestradeOauthPage}
              />
            )}
            {loggedIn && (
              <Route
                exact
                path="/oauth/tradier"
                render={() => tradierOauthRedirect()}
              />
            )}
            {loggedIn && (
              <Route
                path={prefixPath('/oauth/tradier')}
                component={TradierOauthPage}
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
            {loggedIn && (
              <Route
                path={prefixPath('/oauth/td')}
                component={TDAmeritradeOauthPage}
              />
            )}
            {loggedIn && (
              <Route
                exact
                path="/oauth/td"
                render={() => tdAmeritradeOauthRedirect()}
              />
            )}
            {loggedIn && (
              <Route
                path={prefixPath('/oauth/wealthica')}
                component={WealthicaOauthPage}
              />
            )}
            {loggedIn && (
              <Route
                exact
                path="/oauth/wealthica"
                render={() => wealthicaOauthRedirect()}
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
            {(showSecureApp || showOnboardingApp) && (
              <Route path={prefixPath('/settings/connect/:brokerage?')}>
                <AuthorizationPage onboarding={false} />
              </Route>
            )}
            {(showSecureApp || showOnboardingApp) && (
              <Route path={prefixPath('/settings')} component={SettingsPage} />
            )}
            {(showSecureApp || showOnboardingApp) && (
              <Route path={prefixPath('/referrals')} component={ReferralPage} />
            )}
            {(showSecureApp || showOnboardingApp) && (
              <Route path={prefixPath('/upgrade')} component={UpgradePage} />
            )}
            {(showSecureApp || showOnboardingApp) && (
              <Route path={prefixPath('/coupon')} component={CouponPage} />
            )}
            {showOnboardingApp && (
              <Route path="*">
                <Redirect to={prefixPath('/welcome')} />
              </Route>
            )}
            // secure app
            {showSecureApp && (
              <Route
                path={prefixPath('/reporting')}
                component={PerformancePage}
              />
            )}
            {showSecureApp && goalsPageFeatureActive && (
              <Route path={prefixPath('/goals')} component={GoalsPage} />
            )}
            {showSecureApp && goalsPageFeatureActive && (
              <Route
                path={prefixPath('/goal/:goalId')}
                component={GoalDetailPage}
              />
            )}
            {showSecureApp && (
              <Route path={prefixPath('/performance')}>
                <Redirect to={prefixPath(`/reporting`)} />
              </Route>
            )}
            {loggedIn && (
              <Route
                exact
                path={prefixPath('/questrade-offer')}
                component={UpgradeOfferPage}
              />
            )}
            {loggedIn && (
              <Route
                exact
                path={prefixPath('/loading')}
                render={(props) => (
                  <LoginLoadingPage {...props} redirectPath={redirectPath} />
                )}
              />
            )}
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
            // catchalls // when logged in, catch unknown URLs and redirect to
            // dashboard or 'next' query param if defined
            {showSecureApp && (
              <Route path="*">
                <Redirect to={redirectPath} />
              </Route>
            )}
            // when not logged in, catch unknown URLs (such as secure paths) and
            // login with redirect
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
        </React.Suspense>
      </StripeProvider>
    </Layout>
  );
};

export default App;
