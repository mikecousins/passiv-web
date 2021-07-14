import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
        easiest way to get started is to import your holdings as a model by
        clicking the <strong>Import</strong> button.
      </>
    ),
  },
  {
    target: '.tour-build-model',
    content:
      'If you don’t own any securities yet, you can build your model portfolio from scratch by adding securities and assigning percentages to them.',
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
    target: '.tour-edit-model',
    content: (
      <>
        <div>
          Click <strong>Edit Model</strong> to adjust your percentage
          allocations, add and delete items from your model.
        </div>
        <br />
        <br />
        <small>
          * Note: at the moment, editing a model is disabled if the model is
          applied to more than one group.
        </small>
        <br />
        <br />
        <small>
          * Note: if you delete an asset from your target portfolio, Passiv will
          try to sell it if Selling is enabled and your accuracy will be
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

/* My Models Page tour steps */
export const MyModelsPageSteps = [
  {
    target: '.tour-new-model-button',
    content:
      'Create a new model. You can choose to set your target allocation based on individual securities or on asset classes that you define.',
    placement: 'top',
  },
  {
    target: '.tour-more-options',
    content:
      'Click More Options icon to quickly duplicate, delete or share a model if you have it enabled.',
    placement: 'right',
  },
  {
    target: '.tour-apply-button',
    content: 'Apply your model to your portfolio(s).',
    placement: 'right',
  },
  {
    target: '.tour-view-button',
    content: 'View the items (securities/asset classes) under this model.',
    placement: 'right',
  },
];

/* Mode Portfolio tour steps */
export const ModelPortfolioSteps = [
  {
    target: '.tour-edit-model-button',
    content:
      'Edit your percentage allocations, add and delete items from your model.',
    placement: 'top',
  },
  {
    target: '.tour-model-type',
    content: (
      <>
        <div>
          By default, model portfolios are security based, meaning your
          allocations are assigned to securities. You can define asset classes
          and assign allocations to classes instead.
          <a
            href="https://passiv.com/help/tutorials/how-to-use-asset-classes-models/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn more
          </a>
        </div>
      </>
    ),
    placement: 'right',
  },
  {
    target: '.tour-share-model',
    content:
      'Share your model with friends and earn cash when they sign up for Passiv Elite! ',
    placement: 'right',
  },
];

/* Asset class box in model page tour steps */

export const AssetClassBoxSteps = [
  {
    target: '.tour-add-asset-class',
    content:
      'The first step to building your asset class model is to define your asset classes. An asset class is a group of securities that you want to count towards the same percentage allocation. ',
    placement: 'top',
  },
];

/* Asset classes page tour steps*/

export const AssetClassesSteps = [
  {
    target: '.tour-asset-class',
    content: (
      <div>
        {' '}
        Add your asset classes and assign securities to them. Then click{' '}
        <span style={{ fontWeight: 600 }}>Back to Model Portfolio</span> to use
        them in your model.{' '}
      </div>
    ),
    placement: 'left',
  },
];

/* Asset Class Priorities */

export const OpenPrioritiesSteps = [
  {
    target: '.tour-expand-priorities',
    content: (
      <div>
        Click on{' '}
        <strong>
          <FontAwesomeIcon icon={faChevronDown} />
        </strong>{' '}
        to start prioritizing asset classes.
      </div>
    ),
    placement: 'right',
  },
];

export const AssetClassPrioritiesSteps = [
  {
    target: '.tour-priorities',
    content: (
      <div>
        If Sell is enabled, the securities will be sold from the bottom up. If
        you don't choose a Buy priority, Passiv will not make suggestions for
        buys for this asset class.
      </div>
    ),
    placement: 'right',
  },
  {
    target: '.tour-priorities-buy-box',
    content: (
      <div>
        You can choose ONE security to be bought in each account. Click on the
        {'  '}
        "<FontAwesomeIcon icon={faChevronUp} />" to move it to the top priority
        into the Buy box.
        <br />
        <br />
        The other securities in the asset class will not be bought, but will
        count towards the asset class allocation.
      </div>
    ),
    placement: 'right',
  },
  {
    target: '.tour-priorities-do-not-trade',
    content: (
      <div>
        You can prevent a security from being traded (buy and sell) in an
        account by checking the{' '}
        <span style={{ fontWeight: 600 }}>Do Not Trade</span> box.
      </div>
    ),
    placement: 'right',
  },
];
