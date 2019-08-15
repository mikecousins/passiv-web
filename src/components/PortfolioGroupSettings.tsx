import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { H2, H3, BulletUL } from '../styled/GlobalElements';
import ShadowBox from '../styled/ShadowBox';
import SettingsToggle from './SettingsToggle';
import CurrencySeparation from './CurrencySeparation';
import { selectCurrentGroupSettings } from '../selectors/groups';

export const PortfolioGroupSettings = () => {
  const settings = useSelector(selectCurrentGroupSettings);
  let summary = [];
  if (settings) {
    if (settings.buy_only) {
      summary.push(
        'Passiv will use available cash to purchase the most underweight assets in your portfolio.',
      );
    } else {
      summary.push(
        'Passiv will buy and sell assets to get as close to 100% accuracy as possible.',
      );
    }
    if (settings.prevent_currency_conversion) {
      if (!settings.hard_currency_separation) {
        summary.push(
          'Currency exchange is not allowed and excess currency will be retained as cash so that it can be manually exchanged.',
        );
      } else {
        summary.push(
          'Currency exchange is not allowed and excess currency will be allocated to existing assets in the same currency.',
        );
      }
    } else {
      summary.push(
        'Currency exchange is allowed, which may result in foreign exchange transactions if there is a currency imbalance.',
      );
    }
  }
  return (
    <ShadowBox>
      <H2>Controls</H2>
      {settings ? (
        <React.Fragment>
          <br />
          <SettingsToggle
            name="Allow selling to rebalance"
            settingsId="buy_only"
            invert={true}
          />
          <br />
          <CurrencySeparation />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <br />
          <FontAwesomeIcon icon={faSpinner} spin />
        </React.Fragment>
      )}
      {summary.length > 0 && (
        <React.Fragment>
          <br />
          <H3>Explanation</H3>
          <BulletUL>
            {summary.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </BulletUL>
        </React.Fragment>
      )}
    </ShadowBox>
  );
};

export default PortfolioGroupSettings;
