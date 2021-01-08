import React, { useState, useEffect } from 'react';
import Layout from '../layouts/Layout';
import { Route, Redirect, Switch, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import qs from 'qs';
import { StripeProvider } from 'react-stripe-elements';
import '@reach/menu-button/styles.css';
import '@reach/dialog/styles.css';
import { selectLoggedIn, selectReferralCode } from '../selectors';
import {
  selectShowInsecureApp,
  selectShowOnboardingApp,
  selectShowSecureApp,
} from '../selectors/app';
import { setReferralCode } from '../actions';
import { selectQueryTokens } from '../selectors/router';
import { prefixPath } from '../common';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import GoalsPage from '../pages/GoalsPage';
import GoalDetailPage from '../pages/GoalDetailPage';
import { selectGoalsPageFeature } from '../selectors/features';

// code splitting to lazy load our pages
const LoginPage = React.lazy(() =>
  import(/* webpackChunkName: "login" */ '../pages/LoginPage'),
);
const RegistrationPage = React.lazy(() =>
  import(/* webpackChunkName: "registration" */ '../pages/RegistrationPage'),
);
const DemoLoginPage = React.lazy(() =>
  import(/* webpackChunkName: "demo-login" */ '../pages/DemoLoginPage'),
);
const HelpArticlePage = React.lazy(() =>
  import(/* webpackChunkName: "help-article" */ '../pages/HelpArticlePage'),
);
const HelpPage = React.lazy(() =>
  import(/* webpackChunkName: "help" */ '../pages/HelpPage'),
);
const ResetPasswordPage = React.lazy(() =>
  import(/* webpackChunkName: "reset-password" */ '../pages/ResetPasswordPage'),
);
const ResetPasswordConfirmPage = React.lazy(() =>
  import(
    /* webpackChunkName: "reset-password-confirm" */ '../pages/ResetPasswordConfirmPage'
  ),
);
const SetNewPasswordPage = React.lazy(() =>
  import(
    /* webpackChunkName: "set-new-password" */ '../pages/SetNewPasswordPage'
  ),
);
const QuestradeOauthPage = React.lazy(() =>
  import(
    /* webpackChunkName: "questrade-oauth" */ '../pages/QuestradeOauthPage'
  ),
);
const TradierOauthPage = React.lazy(() =>
  import(/* webpackChunkName: "tradier-oauth" */ '../pages/TradierOauthPage'),
);
const AlpacaOauthPage = React.lazy(() =>
  import(/* webpackChunkName: "alpaca-oauth" */ '../pages/AlpacaOauthPage'),
);
const InteractiveBrokersOauthPage = React.lazy(() =>
  import(
    /* webpackChunkName: "interactive-brokers-oauth" */ '../pages/InteractiveBrokersOauthPage'
  ),
);
const TDAmeritradeOauthPage = React.lazy(() =>
  import(
    /* webpackChunkName: "td-ameritrade-oauth" */ '../pages/TDAmeritradeOauthPage'
  ),
);
const WealthicaConnectionPage = React.lazy(() =>
  import(
    /* webpackChunkName: "wealthica-connection-page" */ '../pages/WealthicaConnectionPage'
  ),
);
const WealthicaConnectionUpdatePage = React.lazy(() =>
  import(
    /* webpackChunkName: "wealthica-update-connection-page" */ '../pages/WealthicaConnectionUpdatePage'
  ),
);
const UpgradeOfferPage = React.lazy(() =>
  import(/* webpackChunkName: "upgrade-offer" */ '../pages/UpgradeOfferPage'),
);
const LoginLoadingPage = React.lazy(() =>
  import(/* webpackChunkName: "login-loading" */ '../pages/LoginLoadingPage'),
);
const DashboardPage = React.lazy(() =>
  import(/* webpackChunkName: "dashboard" */ '../pages/DashboardPage'),
);
const GroupPage = React.lazy(() =>
  import(/* webpackChunkName: "group" */ '../pages/GroupPage'),
);
const CouponPage = React.lazy(() =>
  import(/* webpackChunkName: "coupon" */ '../pages/CouponPage'),
);
const SharePage = React.lazy(() =>
  import(/* webpackChunkName: "share" */ '../pages/SharePage'),
);
const AuthorizationPage = React.lazy(() =>
  import(/* webpackChunkName: "authorization" */ '../pages/AuthorizationPage'),
);
const WelcomePage = React.lazy(() =>
  import(/* webpackChunkName: "welcome" */ '../pages/WelcomePage'),
);
const SettingsPage = React.lazy(() =>
  import(/* webpackChunkName: "settings" */ '../pages/SettingsPage'),
);
const ReferralPage = React.lazy(() =>
  import(/* webpackChunkName: "referrals" */ '../pages/ReferralPage'),
);
const UpgradePage = React.lazy(() =>
  import(/* webpackChunkName: "upgrade" */ '../pages/UpgradePage'),
);
const PerformancePage = React.lazy(() =>
  import(/* webpackChunkName: "performance" */ '../pages/PerformancePage'),
);

const ModelAssetClassPage = React.lazy(() =>
  //? webpackChunkName
  import(/* webpackChunkName: "...?" */ '../pages/ModelAssetClassPage'),
);

const ModelPortfolioPage = React.lazy(() =>
  //? webpackChunkName
  import(/* webpackChunkName: "...?" */ '../pages/ModelPortfolioPage'),
);

const SettingTargetsPage = React.lazy(() =>
  //? webpackChunkName
  import(/* webpackChunkName: "...?" */ '../pages/SettingTargetsPage'),
);

const MyModelPortfoliosPage = React.lazy(() =>
  //? webpackChunkName
  import(/* webpackChunkName: "...?" */ '../pages/MyModelPortfoliosPage'),
);

const ApplyTargetPage = React.lazy(() =>
  //? webpackChunkName
  import(/* webpackChunkName: "...?" */ '../pages/ApplyTargetPage'),
);

// declare global {
//   interface Window {
//     Stripe: any;
//   }
// }

// use the stripe test key unless we're in prod
const stripePublicKey =
  process.env.REACT_APP_BASE_URL_OVERRIDE &&
  process.env.REACT_APP_BASE_URL_OVERRIDE === 'passiv.com'
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

const App = () => {
  const showInsecureApp = useSelector(selectShowInsecureApp);
  const showOnboardingApp = useSelector(selectShowOnboardingApp);
  const showSecureApp = useSelector(selectShowSecureApp);
  const referralCode = useSelector(selectReferralCode);
  const loggedIn = useSelector(selectLoggedIn);
  const location = useLocation();
  const goalsPageFeatureActive = useSelector(selectGoalsPageFeature);
  const dispatch = useDispatch();

  const queryParams = useSelector(selectQueryTokens);

  // extract referral code (if any) and make available on registration page
  if (queryParams.ref && queryParams.ref !== referralCode) {
    dispatch(setReferralCode({ referralCode: queryParams.ref }));
    delete queryParams.ref;
  }

  // include query params in deep link redirect for insecure app
  if (queryParams.next) {
    delete queryParams.next;
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
    }
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
            // onboarding app
            {showOnboardingApp && (
              <Route path={prefixPath('/connect/:brokerage?')}>
                <AuthorizationPage onboarding={true} />
              </Route>
            )}
            {showOnboardingApp && (
              <Route path={prefixPath('/wealthica/onboard-connect')}>
                <WealthicaConnectionPage onboarding={true} />
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
              <Route exact path={prefixPath('/wealthica/connect/')}>
                <WealthicaConnectionPage onboarding={false} />
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
              <Route
                exact
                path={prefixPath('/wealthica/connect/:authorizationID?')}
                component={WealthicaConnectionUpdatePage}
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
            {showSecureApp && (
              <Route
                path={prefixPath('/asset-class')}
                component={ModelAssetClassPage}
              />
            )}
            {showSecureApp && (
              <Route
                path={prefixPath('/model-portfolio/:modelId')}
                component={ModelPortfolioPage}
              />
            )}
            {showSecureApp && (
              <Route
                path={prefixPath('/setting-targets/:groupId')}
                component={ApplyTargetPage}
              />
            )}
            {showSecureApp && (
              <Route
                path={prefixPath('/setting-targets')}
                component={SettingTargetsPage}
              />
            )}
            {showSecureApp && (
              <Route
                path={prefixPath('/my-model-portfolios')}
                component={MyModelPortfoliosPage}
              />
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
