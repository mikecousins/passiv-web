import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSpinner,
  faToggleOn,
  faToggleOff,
} from '@fortawesome/free-solid-svg-icons';
import { loadGroup } from '../actions';
import {
  selectCurrentGroupId,
  selectCurrentGroupTarget,
  selectCurrentGroupExcludedAssets,
  selectCurrentGroupSymbols,
  selectCurrentGroupQuotableSymbols,
} from '../selectors/groups';
import { selectCanExcludeAssets } from '../selectors/subscription';
import { postData, deleteData } from '../api';
import {
  ToggleButton,
  DisabledToggleButton,
  StateText,
} from '../styled/ToggleButton';
import { toast } from 'react-toastify';

class ExcludedAssetToggle extends Component {
  state = {
    loading: false,
    toggle: false,
  };

  componentDidMount() {
    this.setState({ toggle: this.symbolExcluded(this.props.symbolId) });
  }

  symbolInTargets = symbolId => {
    if (this.props.targets) {
      return this.props.targets.some(target => target.symbol === symbolId);
    } else {
      return false;
    }
  };

  symbolExcluded = symbolId => {
    return this.props.excludedAssets.some(
      excludedAsset => excludedAsset.symbol === symbolId,
    );
  };

  symbolQuotable = symbolId =>
    this.props.quotableSymbols.some(
      quotableSymbol => quotableSymbol.id === symbolId,
    );

  handleClick = () => {
    let newToggleState = !!(this.state.toggle ^ true);
    this.setState({ loading: true });
    if (newToggleState === true) {
      postData(
        `/api/v1/portfolioGroups/${this.props.groupId}/excludedassets/`,
        { symbol: this.props.symbolId },
      )
        .then(response => {
          this.setState({ loading: false, toggle: newToggleState });
          this.props.refreshGroup({ ids: [this.props.groupId] });
        })
        .catch(error => {
          this.setState({ loading: false });
        });
    } else {
      deleteData(
        `/api/v1/portfolioGroups/${this.props.groupId}/excludedassets/${this.props.symbolId}`,
      )
        .then(response => {
          this.setState({ loading: false, toggle: newToggleState });
          this.props.refreshGroup({ ids: [this.props.groupId] });
        })
        .catch(error => {
          this.setState({ loading: false });
        });
    }
  };

  render() {
    if (this.state.loading) {
      return <FontAwesomeIcon icon={faSpinner} />;
    }

    if (this.symbolInTargets(this.props.symbolId)) {
      return (
        <DisabledToggleButton>
          <FontAwesomeIcon
            icon={faToggleOff}
            data-tip="You can't exclude assets that are a part of your target portfolio. Remove this security from your target portfolio first."
          />
          <StateText>off</StateText>
        </DisabledToggleButton>
      );
    }

    if (!this.symbolQuotable(this.props.symbolId)) {
      return (
        <DisabledToggleButton>
          <FontAwesomeIcon
            icon={faToggleOn}
            data-tip="This security is not supported for trading, so it is excluded from your portfolio calculations."
          />
          <StateText>on</StateText>
        </DisabledToggleButton>
      );
    }

    const upgradeError =
      'Excluding assets is only available to Elite subscribers. Upgrade your account on the Settings page to use this feature.';

    if (!this.props.canExcludeAssets) {
      return (
        <DisabledToggleButton onClick={() => toast.error(upgradeError)}>
          {this.state.toggle ? (
            <React.Fragment>
              <FontAwesomeIcon icon={faToggleOn} data-tip={upgradeError} />
              <StateText>on</StateText>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <FontAwesomeIcon icon={faToggleOff} data-tip={upgradeError} />
              <StateText>off</StateText>
            </React.Fragment>
          )}
        </DisabledToggleButton>
      );
    }

    return (
      <ToggleButton onClick={this.handleClick}>
        {this.state.toggle ? (
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
}

const actions = {
  refreshGroup: loadGroup,
};

const select = state => ({
  groupId: selectCurrentGroupId(state),
  targets: selectCurrentGroupTarget(state),
  excludedAssets: selectCurrentGroupExcludedAssets(state),
  symbols: selectCurrentGroupSymbols(state),
  quotableSymbols: selectCurrentGroupQuotableSymbols(state),
  canExcludeAssets: selectCanExcludeAssets(state),
});

export default connect(
  select,
  actions,
)(ExcludedAssetToggle);
