import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { connect } from 'react-redux';
import { loadGroup } from '../actions';
import { selectCurrentGroupId, selectCurrentGroupTarget, selectCurrentGroupTargetInitialized } from '../selectors';
import { Button } from '../styled/Button';
import { H2, H3, P } from '../styled/GlobalElements';
import { postData } from '../api';
import styled from '@emotion/styled';
import ShadowBox from '../styled/ShadowBox';
import TargetSelector from './TargetSelector';

export const TargetContainer = styled.form`
  h2 {
    margin-bottom: 20px;
  }
`;

export const Container3Column = styled.div`
  display: flex;
  justify-content: space-between;
  > div {
    width: 30%;
  }
`;

export class AccountTargets extends React.Component {
  state = {
    edit: false,
    loading: false,
    model: null,
    modelChoices: [
      {
        id: 'CHOOSE',
        name: 'Choose a model portfolio',
        button: (<Button onClick={() => this.setState({model: 'CHOOSE'})}>Select</Button>)
      },
      {
        id: 'IMPORT',
        name: 'Import your current holdings',
        button: (<Button onClick={() => this.importTarget()}>Import</Button>)
      },
      {
        id: 'MANUAL',
        name: 'Set your target portfolio manually',
        button: (<Button onClick={() => this.setState({model: 'MANUAL'})}>Select</Button>)
      }

    ]
  }

  componentWillReceiveProps(nextProps) {
    this.setState({model: null});
  }

  getRandomId() {
    return String(Math.floor(Math.random() * 1e12));
  }

  setSymbol(target, symbol) {
    target.fullSymbol = symbol;
    target.symbol = symbol.id;
    this.forceUpdate();
  }

  importTarget() {
    this.setState({loading: true});
    postData('/api/v1/portfolioGroups/' + this.props.groupId + '/import/')
      .then(response => {
        this.setState({loading: false, edit: false});
        this.props.refreshGroup({ids: [this.props.groupId]});
      })
      .catch(error => {
        this.setState({loading: false, edit: false});
        console.log('errors', error.response.data)
      });
  }

  generateTargetForm(lockable) {
    let form = (
      <TargetSelector
        target={this.props.target}
        lockable={lockable}
      />
    );
    if (!this.props.targetInitialized || (!this.state.loading && this.props.target && this.props.target.length === 0)) {
      form = (
        <ShadowBox>
          { form }
        </ShadowBox>
      )
    }
    return form;
  }

  renderTargetChooser() {
    switch(this.state.model) {
      case 'CHOOSE':
        return (<P>LOL0</P>);
      case 'IMPORT':
        return (<P>LOL1</P>);
      case 'MANUAL':
        return this.generateTargetForm(false);
      default:
        return (<P>This shouldn't be visible ever.</P>);
    }
  }

  render() {
    const { target } = this.props;

    // show a spinner if we don't have our data yet
    if (!target) {
      return (
        <ShadowBox>
          <H2>Target Portfolio</H2>
          <span><FontAwesomeIcon icon={faSpinner} spin /></span>
        </ShadowBox>
      );
    }



    // help them set a target if they don't have one yet
    if (!this.props.targetInitialized || (!this.state.loading && target && target.length === 0)) {
      return (
        <ShadowBox dark>
          <H2 color="white">Target Portfolio</H2>
          {
            this.state.model === null ? (
              <React.Fragment>
                <P color="white">There is no target portfolio set for this account. Please choose one of the following options:</P>
                <Container3Column>
                  {
                    this.state.modelChoices.map(m => (
                      <ShadowBox key={ m.id }>
                        <H3>{ m.name }</H3>
                        { m.button }
                      </ShadowBox>
                    ))
                  }

                </Container3Column>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <H3 color="white">{ this.state.modelChoices.find(m => m.id === this.state.model).name }</H3>
                { this.renderTargetChooser() }
                <Button onClick={() => this.setState({model: null})}>Back</Button>
              </React.Fragment>
            )
          }

        </ShadowBox>
      );
    }

    // <span>No target set<Button onClick={() => this.importTarget()}>Import</Button></span>

    return (
      <ShadowBox>
        <TargetContainer>
        <H2>Target Portfolio</H2>
        {
          this.state.loading ? (
            <P>Importing targets... <FontAwesomeIcon icon={faSpinner} spin /></P>
          ) : this.generateTargetForm(true)
        }

        </TargetContainer>
      </ShadowBox>
    );
  }
}

const actions = {
  refreshGroup: loadGroup,
};

const select = state => ({
  groupId: selectCurrentGroupId(state),
  target: selectCurrentGroupTarget(state),
  targetInitialized: selectCurrentGroupTargetInitialized(state)
});

export default connect(select, actions)(AccountTargets);
