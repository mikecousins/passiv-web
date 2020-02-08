import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { faToggleOn, faToggleOff } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { selectSettings } from '../selectors';
import { selectCanPlaceOrders } from '../selectors/subscription';
import { loadSettings, loadGroups } from '../actions';
import { putData } from '../api';
import { ToggleButton, StateText } from '../styled/ToggleButton';
import Number from './Number';
import { InputTarget } from '../styled/Form';
import { SmallButton } from '../styled/Button';
import {
  Edit,
  SubSetting,
  DisabledBox,
  OptionsTitle,
} from '../styled/GlobalElements';
import { Settings } from '../types/settings';

const LimitOrdersSettings = () => {
  const settings = useSelector(selectSettings);
  const canPlaceOrders = useSelector(selectCanPlaceOrders);
  const dispatch = useDispatch();
  const [editingThreshold, setEditingThreshold] = useState(false);
  const [priceLimitThreshold, setPriceLimitThreshold] = useState();

  useEffect(() => {
    if (settings) {
      setPriceLimitThreshold(settings.price_limit_threshold);
    }
  }, [settings]);

  const updateLimitOrder = () => {
    if (!settings) {
      return;
    }

    let newSettings: Settings = { ...settings };
    newSettings.trade_with_limit_orders = !settings.trade_with_limit_orders;

    putData('/api/v1/settings/', newSettings)
      .then(() => {
        dispatch(loadSettings());
        dispatch(loadGroups());
      })
      .catch(() => {
        dispatch(loadSettings());
        dispatch(loadGroups());
      });
  };

  const finishEditingThreshold = () => {
    if (!settings) {
      return;
    }

    let newSettings: Settings = { ...settings };

    newSettings.price_limit_threshold = priceLimitThreshold;

    putData('/api/v1/settings/', newSettings)
      .then(() => {
        dispatch(loadSettings());
        dispatch(loadGroups());
      })
      .catch(() => {
        dispatch(loadSettings());
        dispatch(loadGroups());
      });

    setEditingThreshold(false);
  };

  if (!settings) {
    return null;
  }

  const disabled = !canPlaceOrders;

  let contents = (
    <React.Fragment>
      <OptionsTitle>Use Limit Orders:</OptionsTitle>
      {settings.trade_with_limit_orders && !disabled ? (
        <React.Fragment>
          <ToggleButton onClick={updateLimitOrder}>
            <FontAwesomeIcon icon={faToggleOn} />
            <StateText>on</StateText>
          </ToggleButton>
          <SubSetting>
            <OptionsTitle>Limit Order Premium:</OptionsTitle>
            {!editingThreshold ? (
              <React.Fragment>
                <Number
                  value={priceLimitThreshold}
                  percentage
                  decimalPlaces={4}
                />
                <Edit onClick={() => setEditingThreshold(true)}>
                  <FontAwesomeIcon icon={faPen} />
                  Edit
                </Edit>
                <DisabledBox>
                  Limit Order Premium sets the limit price to be a certain
                  percentage above the ask price when buying, and below the bid
                  price when selling.
                </DisabledBox>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <InputTarget
                  value={priceLimitThreshold}
                  onChange={e => setPriceLimitThreshold(e.target.value)}
                  onKeyPress={e => {
                    if (e.key === 'Enter') {
                      finishEditingThreshold();
                    }
                  }}
                />{' '}
                %
                <SmallButton onClick={finishEditingThreshold}>Done</SmallButton>
              </React.Fragment>
            )}
          </SubSetting>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <ToggleButton onClick={updateLimitOrder} disabled={disabled}>
            <React.Fragment>
              <FontAwesomeIcon icon={faToggleOff} />
              <StateText>off</StateText>
            </React.Fragment>
          </ToggleButton>
          {disabled ? (
            <DisabledBox>
              Placing orders through Passiv is an Elite feature. You can upgrade
              your account to use this feature.
            </DisabledBox>
          ) : (
            <DisabledBox>
              One-Click Trades places market orders by default. Enable this
              setting to use limit orders with a price cap.
            </DisabledBox>
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
  return <div>{contents}</div>;
};

export default LimitOrdersSettings;
