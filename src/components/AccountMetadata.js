import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faPen } from '@fortawesome/free-solid-svg-icons';
import { baseUrl, loadGroups } from '../actions';
import { patchData } from '../api';
import { selectCurrentGroup } from '../selectors';
import styled from '@emotion/styled';
import { Table , Edit, Title } from '../styled/GlobalElements';
import { InputNonFormik } from '../styled/Form';
import ShadowBox from '../styled/ShadowBox';
import { Button } from '../styled/Button';
import Number from './Number';

const MetaContainer = styled.div`
  text-align: right;
`;
const Accuracy = styled.div`
  text-align: center;
`;
const Total = styled.div`
  text-align: right;
  padding: 13px 20px 0 20px;
  margin: -20px -20px 12px 0px;
  border-radius: 0 4px;
  color: #fff;
  background: #04a287;
`;

const Cash = styled.div`
  text-align: right;
`;

const NameContainer = styled.div`
  padding-bottom: 15px;
  font-size: 40px;
  text-align: left;
  button {
    font-size: 18px;
  }
`;
const MetaHorizontal = styled.div`
  text-align: left;
  span {
    font-weight: 600;
    margin-bottom: 8px;
    display: inline-block;
    margin-right: 6px;
    text-align: left;
  }
`;

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
        <MetaContainer>
          <Table>
            {this.state.editingName ? (
              <NameContainer>
                <InputNonFormik value={this.state.name} onChange={(event) => {this.setState({name: event.target.value})}}/>
                <Button onClick={() => this.finishEditingName()}>Done</Button>
              </NameContainer>
            ) : (
              <NameContainer>
                {this.props.name ? this.props.name : <FontAwesomeIcon icon={faSpinner} spin />}
                <Edit onClick={() => this.startEditingName()}><FontAwesomeIcon icon={faPen} />Edit</Edit>
              </NameContainer>
            )}
            <Total>
              <Title>Total Value</Title>
              <b>{this.props.equity ? new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(this.props.equity) : <FontAwesomeIcon icon={faSpinner} spin />}</b>
            </Total>
          </Table>
          <Table>
            <MetaHorizontal>
              <div>
                <span>Account #: </span>
                {this.props.number ? this.props.number : <FontAwesomeIcon icon={faSpinner} spin />}
              </div>
              <div>
                <span>Type: </span>
                {this.props.type ? this.props.type : <FontAwesomeIcon icon={faSpinner} spin />}
              </div>
            </MetaHorizontal>
            <Accuracy>
              <Title>Accuracy</Title>
              {this.props.accuracy ? <Number value={this.props.accuracy} percentage decimalPlaces={0} /> : <FontAwesomeIcon icon={faSpinner} spin />}
            </Accuracy>
            <Cash>
              <Title>Cash</Title>
              {this.props.cash ? <Number value={this.props.cash} currency /> : <FontAwesomeIcon icon={faSpinner} spin />}
            </Cash>

          </Table>
        </MetaContainer>
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
