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
import { NumericTextInput } from '../styled/Form';
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

  const calcDecimalPlaces = (number: number) => {
    let decimalPlaces = 4;
    const asString = String(number);
    if (asString.indexOf('.') >= 0) {
      const pieces = asString.split('.');
      if (pieces.length === 2) {
        decimalPlaces = pieces[1].length;
      }
    }
    return decimalPlaces;
  };

  useEffect(() => {
    if (settings) {
      setPriceLimitThreshold(
        settings && parseFloat(settings.price_limit_threshold),
      );
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
                  decimalPlaces={calcDecimalPlaces(priceLimitThreshold)}
                />
                <Edit onClick={() => setEditingThreshold(true)}>
                  <FontAwesomeIcon icon={faPen} />
                  Edit
                </Edit>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <NumericTextInput
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
            <DisabledBox>
              Limit Order Premium sets the limit price to be a certain
              percentage above the ask price when buying, and below the bid
              price when selling.
            </DisabledBox>
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
