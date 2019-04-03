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
  selectIsFree,
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

  render() {
    if (this.state.loading) {
      return <FontAwesomeIcon icon={faSpinner} />;
    }

    if (this.symbolInTargets(this.props.symbolId)) {
      return (
        <FontAwesomeIcon
          icon={faToggleOff}
          disabled
          data-tip="You can't exclude assets that are a part of your target portfolio. Remove this security from your target portfolio first."
        />
      );
    }

    if (!this.symbolQuotable(this.props.symbolId)) {
      return (
        <FontAwesomeIcon
          icon={faToggleOn}
          disabled
          data-tip="This security is not supported for trading, so it is excluded from your portfolio calculations."
        />
      );
    }

    if (this.props.isFree) {
      return (
        <React.Fragment>
          <Link
            to="/app/settings"
            data-tip="Exclusing assets is not available on the Community Edition. Upgrade your account on the Settings page to use this feature."
          >
            {this.state.toggle ? (
              <FontAwesomeIcon icon={faToggleOn} />
            ) : (
              <FontAwesomeIcon icon={faToggleOff} />
            )}
          </Link>
        </React.Fragment>
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
  isFree: selectIsFree(state),
});

export default connect(
  select,
  actions,
)(ExcludedAssetToggle);
