import React from 'react';
import { useSelector } from 'react-redux';
import {
  selectCurrentGroupModelType,
  selectCurrentGroupSettings,
} from '../../selectors/groups';
import { SubSetting, DisabledBox } from '../../styled/GlobalElements';
import SettingsCheckBox from './SettingsCheckBox';
import { selectCanSeparateCurrencies } from '../../selectors/subscription';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

type Props = {
  preventConversion: boolean;
  onChangePreventConversion: () => void;
  hardSeparation: boolean;
  onChangeHardSeparation: () => void;
};

const CurrencySeparation = ({
  preventConversion,
  onChangePreventConversion,
  hardSeparation,
  onChangeHardSeparation,
}: Props) => {
  const settings = useSelector(selectCurrentGroupSettings);
  const canSeparateCurrencies = useSelector(selectCanSeparateCurrencies);
  const modelType = useSelector(selectCurrentGroupModelType);

  if (!settings) {
    return <FontAwesomeIcon icon={faSpinner} spin />;
  }

  if (canSeparateCurrencies) {
    return (
      <div className="tour-currency-separation">
        <SettingsCheckBox
          name="Keep currencies separate"
          explanation={
            settings.prevent_currency_conversion &&
            !settings.hard_currency_separation
              ? 'Currency exchange is not allowed and excess currency will be retained as cash so that it can be manually exchanged.'
              : settings.prevent_currency_conversion &&
                settings.hard_currency_separation
              ? 'Currency exchange is not allowed and excess currency will be allocated to existing assets in the same currency.'
              : 'Currency exchange is allowed, which may result in foreign exchange transactions if there is a currency imbalance.'
          }
          value={preventConversion}
          onChange={onChangePreventConversion}
        />
        {preventConversion && (
          <SubSetting>
            <SettingsCheckBox
              name="Retain cash for manual exchange"
              value={hardSeparation}
              onChange={onChangeHardSeparation}
              invert={true}
              disabled={modelType === 1} // why? => hard separation not supported for asset classes on the backend yet
              tip="Hard currency separation not supported for asset classes yet."
            />
          </SubSetting>
        )}
      </div>
    );
  } else {
    return (
      <div className="tour-currency-separation">
        <DisabledBox>
          <SettingsCheckBox
            name="Keep currencies separate"
            value={preventConversion}
            disabled={true}
            tip="Separating currencies is only available to Elite subscribers. Upgrade your account on the Settings page to use this feature."
          />
          <br />
          <SubSetting>
            <SettingsCheckBox
              name="Retain cash for manual exchange"
              value={hardSeparation}
              invert={true}
              disabled={true}
              tip="Separating currencies is only available to Elite subscribers. Upgrade your account on the Settings page to use this feature."
            />
          </SubSetting>
        </DisabledBox>
      </div>
    );
  }
};

export default CurrencySeparation;
