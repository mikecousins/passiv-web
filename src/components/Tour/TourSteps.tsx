import React from 'react';
import EliteFeatureTitle from './EliteFeatureTitle';
import UpgradeButton from './UpgradeButton';

/* Overview tab tour steps */
export const OverviewTabSteps = [
  {
    target: '.tour-accuracy',
    content:
      'Accuracy tells you how close your holdings are to your desired target. 100% indicates your holdings are perfectly on target (including cash). Accuracy changes when you adjust your targets, your settings, and when you place trades. ',
    placement: 'right',
  },
  {
    target: '.tour-cash',
    content: 'All your available funds in your brokerage accounts’ currencies.',
    placement: 'right',
  },
  {
    target: '.tour-total-value',
    content:
      'Current total value of your holding plus your available cash. You can choose the currency Passiv displays your Total Value in.',
    placement: 'right',
  },
];

/* Trades and one-click trade tour steps */
export const TradesSteps = [
  {
    target: '.tour-trades',
    content:
      ' Passiv displays the trades needed to maximize your accuracy based on your targets, current holdings, your available cash, and your settings.',
    placement: 'right',
  },
  {
    target: '.tour-one-click-trade',
    title: <EliteFeatureTitle />,
    content: (
      <>
        <div>
          Review your recommended trades by clicking Preview Orders and click
          Confirm to rebalance your portfolio in{' '}
          <a
            href="https://passiv.com/help/tutorials/how-to-use-one-click-trades/"
            target="_blank"
            rel="noopener noreferrer"
          >
            one-click
          </a>
          .
        </div>
        <br />
        <UpgradeButton />
      </>
    ),
    placement: 'right',
  },
];

/* Group settings page tour steps */
export const GroupSettingsSteps = [
  {
    target: '.tour-allow-selling',
    content:
      'By default, Passiv is set to only allocate cash to your underweight targets. To do a full rebalance, you can enable Sell.',
    placement: 'right',
  },
  {
    target: '.tour-currency-separation',
    title: <EliteFeatureTitle />,
    content: (
      <>
        <div>
          Have more control over how Passiv treats multiple currencies you hold
          in your brokerage account.{' '}
          <a
            href="https://passiv.com/help/tutorials/how-to-change-your-currency-handling-settings/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn More
          </a>
        </div>
        <br />
        <UpgradeButton />
      </>
    ),
    placement: 'right',
  },
  {
    target: '.tour-cash-management',
    content: (
      <>
        Helps you to allocate new cash gradually or withhold a specific amount
        of cash to invest later. Start dollar-cost averaging your assets by
        clicking <strong>Add Rule</strong>.{' '}
        <a
          href="https://passiv.com/help/tutorials/how-to-use-cash-management/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn More
        </a>
      </>
    ),
    placement: 'top',
  },
];

/* Setup page tour steps */
export const SetupSteps = [
  {
    target: '.tour-import-holdings',
    content: (
      <>
        If you already own securities in your brokerage account, then the
        easiest way to get started is to import your holdings as your target
        portfolio allocation by clicking the <strong> Import button</strong>.
        Once this is done, don’t forget to review and adjust your targets.
      </>
    ),
  },
  {
    target: '.tour-build-portfolio',
    content:
      'If you don’t own any securities yet, you can build your target portfolio’s allocation from scratch by adding securities and assigning percentages to them.',
  },
];

/* Target section tour steps */
export const GroupTargetSteps = [
  {
    target: '.tour-actual-target-bar',
    content: (
      <ul>
        <li>
          The <span style={{ color: 'var(--brand-green)' }}>green bar</span> is
          the <strong>Actual Bar</strong>. It represents the current percentage
          of your holdings in this security.
        </li>
        <br />
        <li>
          The <span style={{ color: 'var(--brand-blue)' }}>blue gauge</span> is
          the <strong>Target Bar</strong>. It represents the desired percentage
          of your holdings in this security.
        </li>
      </ul>
    ),
    placement: 'right',
  },
  {
    target: '.tour-edit-targets',
    content: (
      <>
        <div>
          Click <strong>Edit Targets</strong> to adjust your target, add and
          delete securities from your target, or
          <a
            href="https://passiv.com/help/tutorials/how-to-exclude-stock-picks-from-your-portfolio/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {' '}
            exclude assets
          </a>
          .
        </div>
        <br />
        <small style={{ marginTop: '300px' }}>
          Note that if you delete an asset from your target portfolio, Passiv
          will try to sell it if Selling is enabled and your accuracy will be
          affected until you do. If you exclude it, Passiv will simply ignore
          it.
        </small>
      </>
    ),
    placement: 'top',
  },
  {
    target: '.tour-group-settings',
    content: 'Change settings for this portfolio.',
  },
];

/* Settings page tour steps */

export const SettingsPageSteps = [
  {
    target: '.tour-edit-connections',
    content: (
      <div>
        A connection is a unique brokerage login. Your connection is always
        read-only when you first connect. You can enable trading by clicking
        <strong> Edit</strong>.<br />
        <a
          href="https://passiv.com/help/tutorials/how-to-manage-your-brokerage-connections/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn More
        </a>
      </div>
    ),
    placement: 'right',
  },
  {
    target: '.tour-add-more-connections',
    content: (
      <div>
        You can have multiple connections. Connect your spouse’s accounts by
        clicking <strong>Add Another Connection</strong>.
      </div>
    ),
    placement: 'right',
  },
  {
    target: '.tour-edit-groups',
    content: (
      <>
        <div>
          Click on <strong> Edit Groups</strong> to manage your accounts. You
          can{' '}
          <a
            href="https://passiv.com/help/tutorials/how-to-set-up-multi-account-portfolios/"
            target="_blank"
            rel="noopener noreferrer"
          >
            group
          </a>{' '}
          them into portfolios to manage them together with the same target
          allocation. You can also{' '}
          <a
            href="https://passiv.com/help/tutorials/how-to-hide-accounts-in-passiv/"
            target="_blank"
            rel="noopener noreferrer"
          >
            hide
          </a>{' '}
          accounts that you don’t want to see in Passiv.
        </div>
      </>
    ),
    placement: 'right',
  },
];
