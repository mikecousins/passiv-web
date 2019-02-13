import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faToggleOn, faToggleOff } from '@fortawesome/free-solid-svg-icons';
import {H2,Title} from '../styled/GlobalElements';
import styled from '@emotion/styled';
import ExcludedAssetToggle from './ExcludedAssetToggle';
import ShadowBox from '../styled/ShadowBox';
import Number from './Number';
import { selectCurrentGroupSettings, selectCurrentGroupId } from '../selectors';
import { baseUrl, loadGroup } from '../actions';
import { putData } from '../api';

class SettingsToggle extends Component {
  state = {
    loading: false,

  }

  handleClick = () => {
    let newToggleState = !!(this.getSettingState() ^ true);
    this.setState({loading: true});
    let newSettings = {...this.props.settings};
    newSettings[this.props.settingsId] = newToggleState;
    putData(`${baseUrl}/api/v1/portfolioGroups/${this.props.groupId}/settings/`, newSettings)
      .then(response => {
        this.setState({loading: false});
        this.props.refreshGroup({ids: [this.props.groupId]});
      })
      .catch(error => {
        this.setState({loading: false});
      })
  }

  getSettingState = () => {
    let state = null;
    if (this.props.settings && this.props.settings[this.props.settingsId]) {
      state = this.props.settings[this.props.settingsId];
    }
    return state;
  }

  render() {
    return (
      <React.Fragment>
        <span>{this.props.name}</span>: { this.state.loading ? (
            <FontAwesomeIcon icon={faSpinner} />
          ) : (
            <button
              onClick={this.handleClick}
            >
              {this.getSettingState() ? <FontAwesomeIcon icon={faToggleOn} /> : <FontAwesomeIcon icon={faToggleOff} />}
            </button>
          )
        }
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

export default connect(select, actions)(SettingsToggle);
