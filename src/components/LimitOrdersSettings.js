import React from 'react';
import { connect } from 'react-redux';
import { faToggleOn, faToggleOff } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { selectSettings } from '../selectors';
import { loadSettings } from '../actions';
import { putData } from '../api';
import { ToggleButton, StateText } from '../styled/ToggleButton';
import Number from './Number';
import { InputTarget } from '../styled/Form';
import { SmallButton } from '../styled/Button';
import styled from '@emotion/styled';
import { Edit, SubSetting, OptionsTitle } from '../styled/GlobalElements';

export const DriftBox = styled.div``;

class LimitOrdersSettings extends React.Component {
  state = {
    editingThreshold: false,
    priceLimitThreshold: this.props.settings.price_limit_threshold,
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
      })
      .catch(error => {
        this.props.refreshSettings();
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
    console.log(newSettings);
    newSettings.price_limit_threshold = this.state.priceLimitThreshold;

    putData('/api/v1/settings/', newSettings)
      .then(response => {
        this.props.refreshSettings();
      })
      .catch(error => {
        this.props.refreshSettings();
      });

    this.setState({ editingThreshold: false });
  }

  render() {
    const { settings } = this.props;

    if (!settings) {
      return null;
    }

    let contents = (
      <React.Fragment>
        <OptionsTitle>Trade with Limit Orders:</OptionsTitle>
        {settings.trade_with_limit_orders ? (
          <React.Fragment>
            <ToggleButton onClick={this.updateLimitOrder}>
              <React.Fragment>
                <FontAwesomeIcon icon={faToggleOn} />
                <StateText>on</StateText>
              </React.Fragment>
            </ToggleButton>
            <SubSetting>
              <OptionsTitle>Limit Price Threshold:</OptionsTitle>
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
          <ToggleButton onClick={this.updateLimitOrder}>
            <React.Fragment>
              <FontAwesomeIcon icon={faToggleOff} />
              <StateText>off</StateText>
            </React.Fragment>
          </ToggleButton>
        )}
      </React.Fragment>
    );
    return <DriftBox>{contents}</DriftBox>;
  }
}

const select = state => ({
  settings: selectSettings(state),
});

const actions = {
  refreshSettings: loadSettings,
};

export default connect(select, actions)(LimitOrdersSettings);
