import React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentGroupSettings } from '../../selectors/groups';
import { SubSetting, DisabledBox } from '../../styled/GlobalElements';
import SettingsToggle from './SettingsToggle';
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

  if (!settings) {
    return <FontAwesomeIcon icon={faSpinner} spin />;
  }

  if (canSeparateCurrencies) {
    return (
      <div className="tour-currency-separation">
        <SettingsToggle
          name="Keep currencies separate"
          value={preventConversion}
          onChange={onChangePreventConversion}
        />
        <SubSetting>
          <SettingsToggle
            name="Retain cash for manual exchange"
            value={hardSeparation}
            onChange={onChangeHardSeparation}
            invert={true}
            disabled={!preventConversion}
            tip="Separating currencies must be enabled in order to retain cash for manual conversion."
          />
        </SubSetting>
      </div>
    );
  } else {
    return (
      <div className="tour-currency-separation">
        <DisabledBox>
          <SettingsToggle
            name="Keep currencies separate"
            value={preventConversion}
            disabled={true}
            tip="Separating currencies is only available to Elite subscribers. Upgrade your account on the Settings page to use this feature."
          />
          <br />
          <SubSetting>
            <SettingsToggle
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
