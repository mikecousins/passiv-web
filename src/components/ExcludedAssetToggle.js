import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faToggleOn, faToggleOff } from '@fortawesome/free-solid-svg-icons';
import { loadGroup } from '../actions';
import { selectCurrentGroupId, selectCurrentGroupTarget, selectCurrentGroupExcludedAssets, selectCurrentGroupSymbols, selectCurrentGroupQuotableSymbols } from '../selectors';
import { postData, deleteData } from '../api';

class ExcludedAssetToggle extends Component {
  state = {
    loading: false,
    toggle: false,
  }

  componentDidMount() {
    this.setState({ toggle: this.symbolExcluded(this.props.symbolId) });
  }

  symbolInTargets = (symbolId) => this.props.targets.some(target => target.symbol === symbolId);

  symbolExcluded = (symbolId) => { return this.props.excludedAssets.some(excludedAsset => excludedAsset.symbol === symbolId); };

  symbolQuotable = (symbolId) => this.props.quotableSymbols.some(quotableSymbol => quotableSymbol.id === symbolId);

  excludeDisabled = (symbolId) => (this.symbolInTargets(this.props.symbolId) || !this.symbolQuotable(this.props.symbolId));


  handleClick = () => {
    let newToggleState = !!(this.state.toggle ^ true);
    this.setState({loading: true});
    if (newToggleState === true) {
      postData(`/api/v1/portfolioGroups/${this.props.groupId}/excludedassets/`, {symbol: this.props.symbolId})
        .then(response => {
          this.setState({loading: false, toggle: newToggleState});
          this.props.refreshGroup({ids: [this.props.groupId]});
        })
        .catch(error => {
          this.setState({loading: false});
        })
    }
    else {
      deleteData(`/api/v1/portfolioGroups/${this.props.groupId}/excludedassets/${this.props.symbolId}`)
        .then(response => {
          this.setState({loading: false, toggle: newToggleState});
          this.props.refreshGroup({ids: [this.props.groupId]});
        })
        .catch(error => {
          this.setState({loading: false});
        })
    }

  }

  render() {
    return (
      <React.Fragment>
        { this.state.loading ? (
            <FontAwesomeIcon icon={faSpinner} />
          ) : (
            <button
              onClick={this.handleClick}
              disabled={this.excludeDisabled(this.props.symbolId)}
            >
              {this.state.toggle ? <FontAwesomeIcon icon={faToggleOn} /> : <FontAwesomeIcon icon={faToggleOff} />}
            </button>
          )
        }
      </React.Fragment>
    )





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
});

export default connect(select, actions)(ExcludedAssetToggle);
