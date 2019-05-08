import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSpinner,
  faToggleOn,
  faToggleOff,
} from '@fortawesome/free-solid-svg-icons';
import {
  selectCurrentGroupSettings,
  selectCurrentGroupId,
} from '../selectors/groups';
import { loadGroup } from '../actions';
import { putData } from '../api';
import { ToggleButton, DisabledTogglebutton } from '../styled/ToggleButton';
import styled from '@emotion/styled';

const StateText = styled.span`
  padding: 0 0 5px 5px;
  font-size: 12pt;
  font-weight: 800;
  vertical-align: middle;
`;

class SettingsToggle extends Component {
  state = {
    loading: false,
  };

  handleClick = () => {
    let newToggleState = !!(this.getSettingState() ^ true);
    this.setState({ loading: true });
    let newSettings = { ...this.props.settings };
    newSettings[this.props.settingsId] = newToggleState;
    putData(
      `/api/v1/portfolioGroups/${this.props.groupId}/settings/`,
      newSettings,
    )
      .then(response => {
        this.setState({ loading: false });
        this.props.refreshGroup({ ids: [this.props.groupId] });
      })
      .catch(error => {
        this.setState({ loading: false });
      });
  };

  getSettingState = () => {
    let state = null;
    if (this.props.settings && this.props.settings[this.props.settingsId]) {
      state = this.props.settings[this.props.settingsId];
    }
    return state;
  };

  getViewState = () => {
    let state = this.getSettingState();
    if (this.props.invert === true) {
      state = !state;
    }
    return state;
  };

  render() {
    const disabled = !!this.props.disabled;

    let toggleButton = (
      <DisabledTogglebutton>
        {this.getViewState() ? (
          <React.Fragment>
            <FontAwesomeIcon icon={faToggleOn} />
            <StateText>on</StateText>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <FontAwesomeIcon icon={faToggleOff} />
            <StateText>off</StateText>
          </React.Fragment>
        )}
      </DisabledTogglebutton>
    );
    if (!disabled) {
      toggleButton = (
        <ToggleButton onClick={this.handleClick}>
          {this.getViewState() ? (
            <React.Fragment>
              <FontAwesomeIcon icon={faToggleOn} />
              <StateText>on</StateText>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <FontAwesomeIcon icon={faToggleOff} />
              <StateText>off</StateText>
            </React.Fragment>
          )}
        </ToggleButton>
      );
    }
    return (
      <React.Fragment>
        <span>{this.props.name}</span>:{' '}
        {this.state.loading ? (
          <FontAwesomeIcon icon={faSpinner} spin />
        ) : (
          toggleButton
        )}
      </React.Fragment>
    );
  }
}

const actions = {
  refreshGroup: loadGroup,
};
const select = state => ({
  groupId: selectCurrentGroupId(state),
  settings: selectCurrentGroupSettings(state),
});

export default connect(
  select,
  actions,
)(SettingsToggle);
