import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSpinner,
  faToggleOn,
  faToggleOff,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { loadGroup } from '../actions';
import {
  selectCurrentGroupId,
  selectCurrentGroupTarget,
  selectCurrentGroupExcludedAssets,
  selectCurrentGroupSymbols,
  selectCurrentGroupQuotableSymbols,
  selectUserPermissions,
} from '../selectors';
import { postData, deleteData } from '../api';

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
        `/api/v1/portfolioGroups/${this.props.groupId}/excludedassets/${
          this.props.symbolId
        }`,
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

  canExcludeAssets = () => {
    let permissions = this.props.userPermissions;
    if (!permissions) {
      return false;
    }
    let filtered_permissions = permissions.filter(
      permission => permission === 'can_exclude_assets',
    );

    if (filtered_permissions.length > 0) {
      return true;
    } else {
      return false;
    }
  };

  render() {
    if (this.state.loading) {
      return <FontAwesomeIcon icon={faSpinner} />;
    }

    if (this.symbolInTargets(this.props.symbolId)) {
      return (
        <button>
          <FontAwesomeIcon
            icon={faToggleOff}
            disabled
            data-tip="You can't exclude assets that are a part of your target portfolio. Remove this security from your target portfolio first."
          />
        </button>
      );
    }

    if (!this.symbolQuotable(this.props.symbolId)) {
      return (
        <button>
          <FontAwesomeIcon
            icon={faToggleOn}
            disabled
            data-tip="This security is not supported for trading, so it is excluded from your portfolio calculations."
          />
        </button>
      );
    }

    if (!this.canExcludeAssets()) {
      return (
        <Link
          to="/app/settings"
          data-tip="Excluding assets is not available on the Community Edition. Upgrade your account on the Settings page to use this feature."
        >
          {this.state.toggle ? (
            <FontAwesomeIcon icon={faToggleOn} />
          ) : (
            <FontAwesomeIcon icon={faToggleOff} />
          )}
        </Link>
      );
    }

    return (
      <button onClick={this.handleClick}>
        {this.state.toggle ? (
          <FontAwesomeIcon icon={faToggleOn} />
        ) : (
          <FontAwesomeIcon icon={faToggleOff} />
        )}
      </button>
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
  userPermissions: selectUserPermissions(state),
});

export default connect(
  select,
  actions,
)(ExcludedAssetToggle);
