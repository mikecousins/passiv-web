import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faPen } from '@fortawesome/free-solid-svg-icons';
import { baseUrl, loadGroups } from '../actions';
import { patchData } from '../api';
import { selectCurrentGroup } from '../selectors';
import styled from '@emotion/styled';
import { Table , Edit } from '../styled/GlobalElements';
import { Input } from '../styled/Form';
import ShadowBox from '../styled/ShadowBox';

class AccountMetadata extends Component {
  state = {
    name: this.props.name,
    editingName: false,
    loading: false,
  }

  componentWillReceiveProps(nextProps) {
    this.setState({name: nextProps.name, editingName: false, loading: false});
  }

  startEditingName() {
    this.setState({editingName: true});
  }

  finishEditingName() {
    if (this.state.name !== this.props.group.name) {
      this.setState({loading: true});
      let group = Object.assign({}, this.props.group);
      group.name = this.state.name;
      patchData(`${baseUrl}/api/v1/portfolioGroups/${this.props.group.id}/`, group)
        .then(response => {
          console.log('success', response);
          this.setState({loading: false});
          this.props.refreshGroups();
        })
        .catch(error => {
          console.log('error', error);
          this.setState({loading: false});
        });
    }
    this.setState({editingName: false});
  }

  render() {
    return (
      <ShadowBox>
        <Table>
          {this.state.editingName ? (
            <div>
              <Input value={this.state.name} onChange={(event) => {this.setState({name: event.target.value})}}/>
              <button onClick={() => this.finishEditingName()}>Done</button>
            </div>
          ) : (
            <div>
              {this.props.name ? this.props.name : <FontAwesomeIcon icon={faSpinner} spin />}
              <Edit onClick={() => this.startEditingName()}><FontAwesomeIcon icon={faPen} />Edit Name</Edit>
            </div>
          )}
          <div>
            <h3>Type</h3>
            {this.props.type ? this.props.type : <FontAwesomeIcon icon={faSpinner} spin />}
          </div>
          <div>
            <h3>Account #</h3>
            {this.props.number ? this.props.number : <FontAwesomeIcon icon={faSpinner} spin />}
          </div>
        </Table>
        <Table>
          <div>
            <h3>Accuracy</h3>
            {this.props.accuracy ? <span>{Intl.NumberFormat('en-CA', { style: 'percent', maximumFractionDigits: 1}).format(this.props.accuracy / 100)}</span> : <FontAwesomeIcon icon={faSpinner} spin />}
          </div>
          <div>
            <h3>Cash</h3>
            {this.props.cash ? new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(this.props.cash) : <FontAwesomeIcon icon={faSpinner} spin />}
          </div>
          <div>
            <h3>Total Value</h3>
            <b>{this.props.equity ? new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(this.props.equity) : <FontAwesomeIcon icon={faSpinner} spin />}</b>
          </div>
        </Table>
      </ShadowBox>
    )
  }
};

AccountMetadata.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  number: PropTypes.string,
  accuracy: PropTypes.number,
  cash: PropTypes.number,
  equity: PropTypes.number,
};

const select = state => ({
  group: selectCurrentGroup(state),
});
const actions = {
  refreshGroups: loadGroups,
};

export default connect(select, actions)(AccountMetadata);
