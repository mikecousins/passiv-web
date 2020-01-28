import React from 'react';
import { connect } from 'react-redux';
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
import styled from '@emotion/styled';
import {
  Edit,
  SubSetting,
  DisabledBox,
  OptionsTitle,
} from '../styled/GlobalElements';

export const DriftBox = styled.div``;

class LimitOrdersSettings extends React.Component {
  state = {
    editingThreshold: false,
    priceLimitThreshold:
      this.props.settings && this.props.settings.price_limit_threshold,
  };

  // TODO remove this, it's deprecated
  componentWillReceiveProps(nextProps) {
    this.setState({
      price_limit_threshold:
        nextProps.settings && nextProps.settings.price_limit_threshold,
    });
  }

  updateLimitOrder = () => {
    let newSettings = Object.assign({}, this.props.settings);
    newSettings.trade_with_limit_orders = !this.props.settings
      .trade_with_limit_orders;

    putData('/api/v1/settings/', newSettings)
      .then(response => {
        this.props.refreshSettings();
        this.props.refreshGroups();
      })
      .catch(error => {
        this.props.refreshSettings();
        this.props.refreshGroups();
      });
  };

  onEnter = e => {
    if (e.key === 'Enter') {
      this.finishEditingThreshold();
    }
  };

  startEditingThreshold() {
    this.setState({ editingThreshold: true });
  }

  finishEditingThreshold() {
    let newSettings = Object.assign({}, this.props.settings);

    newSettings.price_limit_threshold = this.state.priceLimitThreshold;

    putData('/api/v1/settings/', newSettings)
      .then(response => {
        this.props.refreshSettings();
        this.props.refreshGroups();
      })
      .catch(error => {
        this.props.refreshSettings();
        this.props.refreshGroups();
      });

    this.setState({ editingThreshold: false });
  }

  render() {
    const { settings } = this.props;

    if (!settings) {
      return null;
    }

    const disabled = !this.props.canPlaceOrders;

    let contents = (
      <React.Fragment>
        <OptionsTitle>Use Limit Orders:</OptionsTitle>
        {settings.trade_with_limit_orders && !disabled ? (
          <React.Fragment>
            <ToggleButton onClick={this.updateLimitOrder}>
              <React.Fragment>
                <FontAwesomeIcon icon={faToggleOn} />
                <StateText>on</StateText>
              </React.Fragment>
            </ToggleButton>
            <SubSetting>
              <OptionsTitle>Limit Order Premium:</OptionsTitle>
              {!this.state.editingThreshold ? (
                <React.Fragment>
                  <Number
                    value={settings.price_limit_threshold}
                    percentage
                    decimalPlaces={4}
                  />
                  <Edit onClick={() => this.startEditingThreshold()}>
                    <FontAwesomeIcon icon={faPen} />
                    Edit
                  </Edit>
                  <DisabledBox>
                    Limit Order Premium sets the limit price to be a certain
                    percentage above the ask price when buying, and below the
                    bid price when selling.
                  </DisabledBox>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <InputTarget
                    value={this.state.priceLimitThreshold}
                    onChange={event => {
                      this.setState({
                        priceLimitThreshold: event.target.value,
                      });
                    }}
                    onKeyPress={this.onEnter}
                  />{' '}
                  %
                  <SmallButton onClick={() => this.finishEditingThreshold()}>
                    Done
                  </SmallButton>
                </React.Fragment>
              )}
            </SubSetting>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <ToggleButton onClick={this.updateLimitOrder} disabled={disabled}>
              <React.Fragment>
                <FontAwesomeIcon icon={faToggleOff} />
                <StateText>off</StateText>
              </React.Fragment>
            </ToggleButton>
            {disabled ? (
              <DisabledBox>
                Placing orders through Passiv is an Elite feature. You can
                upgrade your account to use this feature.
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
    return <DriftBox>{contents}</DriftBox>;
  }
}

const select = state => ({
  settings: selectSettings(state),
  canPlaceOrders: selectCanPlaceOrders(state),
});

const actions = {
  refreshSettings: loadSettings,
  refreshGroups: loadGroups,
};

export default connect(select, actions)(LimitOrdersSettings);
