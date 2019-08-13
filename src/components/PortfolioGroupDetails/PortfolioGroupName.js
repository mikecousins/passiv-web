import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faPen } from '@fortawesome/free-solid-svg-icons';
import { patchData } from '../../api';
import { selectCurrentGroup } from '../../selectors/groups';
import styled from '@emotion/styled';
import { Table, Edit } from '../../styled/GlobalElements';
import { InputNonFormik } from '../../styled/Form';
import { Button } from '../../styled/Button';

const MetaContainer = styled.div`
  text-align: right;
`;

const NameContainer = styled.div`
  padding-bottom: 0px;
  font-size: 40px;
  text-align: left;
  margin-bottom: 30px;
  position: relative;
  @media (max-width: 900px) {
    font-size: 24px;
    margin-bottom: 10px;
  }
  input {
    font-size: 30px;
    border-top: none;
    border-right: none;
    border-left: none;
    padding-left: 0;
    margin-bottom: 0;
  }
  button {
    font-size: 18px;
    margin: 0 5px;
    min-width: 70px;
    @media (min-width: 900px) {
      top: 0;
    }
  }
`;

class PortfolioGroupName extends Component {
  state = {
    name: this.props.name,
    editingName: false,
    loading: false,
  };

  onEnter = e => {
    if (e.key === 'Enter') {
      this.finishEditingName();
    }
  };

  // TODO remove this, it's deprecated
  componentWillReceiveProps(nextProps) {
    this.setState({ name: nextProps.name, editingName: false, loading: false });
  }

  startEditingName() {
    this.setState({ editingName: true });
  }

  finishEditingName() {
    if (this.state.name !== this.props.group.name) {
      this.setState({ loading: true });
      let group = Object.assign({}, this.props.group);
      group.name = this.state.name;
      patchData(`/api/v1/portfolioGroups/${this.props.group.id}/`, group)
        .then(response => {
          console.log('success', response.data);
          this.setState({ loading: false });
          this.props.refreshGroups();
        })
        .catch(error => {
          console.log('error', error.response.data);
          this.setState({ loading: false });
        });
    }
    this.setState({ editingName: false });
  }

  render() {
    return (
      <MetaContainer>
        <Table>
          {this.state.editingName ? (
            <NameContainer>
              <InputNonFormik
                value={this.state.name}
                onChange={event => {
                  this.setState({ name: event.target.value });
                }}
                onKeyPress={this.onEnter}
              />
              <Button onClick={() => this.finishEditingName()}>Done</Button>
            </NameContainer>
          ) : (
            <NameContainer>
              {this.props.name ? (
                this.props.name
              ) : (
                <FontAwesomeIcon icon={faSpinner} spin />
              )}
              <Edit onClick={() => this.startEditingName()}>
                <FontAwesomeIcon icon={faPen} />
                Edit
              </Edit>
            </NameContainer>
          )}
        </Table>
      </MetaContainer>
    );
  }
}

const select = state => ({
  group: selectCurrentGroup(state),
});

export default connect(select)(PortfolioGroupName);
