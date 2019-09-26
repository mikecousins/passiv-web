import React from 'react';
import { BulletUL, H3 } from '../../styled/GlobalElements';
import { Settings } from '../../types/groupInfo';

type Props = {
  settings: Settings;
};

const SettingsSummary = ({ settings }: Props) => {
  if (!settings) {
    return null;
  }

  let summary = [];
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

  return (
    <React.Fragment>
      <br />
      <H3>Explanation</H3>
      <BulletUL>
        {summary.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </BulletUL>
    </React.Fragment>
  );
};

export default SettingsSummary;
