import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectBrokerages } from '../selectors';
import AuthorizationPicker from '../components/AuthorizationPicker';
import ShadowBox from '../styled/ShadowBox';
import { StepQuestion, StepButton, Step } from '../styled/SignupSteps';
import { Table,H1,P } from '../styled/GlobalElements';
import { Button } from '../styled/Button';

class QuestradeAuthorizationPicker extends Component {
  state = {
    answered: false,
    haveQuestrade: false,
  }

  resetAnswered() {
    this.setState({answered: false});
  }

  setHaveQuestrade(value) {
    this.setState({answered: true, haveQuestrade: value});
  }

  getQuestradeBrokerage() {
    return this.props.brokerages.find(b => b.name === 'Questrade');
  }

  getQuestradeId() {
    return this.getQuestradeBrokerage().id;
  }

  getQuestradeDefaultType() {
    return this.getQuestradeBrokerage().authorization_types.find(t => t.type === 'trade').type;
  }

  render() {
    return (
      <React.Fragment>
        {this.state.answered ? (
          <div>
          {this.state.haveQuestrade ? (
              <div>
                <button onClick={() => {this.resetAnswered()}}>Back</button>
                <AuthorizationPicker
                  allowSelect={false}
                  brokerage={this.getQuestradeId()}
                  type={this.getQuestradeDefaultType()}
                />
              </div>
            ) : (
              <ShadowBox dark>
                <Button onClick={() => {this.resetAnswered()}}>Back</Button>
                <P color="white">Then you'd better make one!</P>
              </ShadowBox>
            )
          }
          </div>
        ) : (
          <ShadowBox dark>
            <H1 color="white">SETUP</H1>
            <Step>Step 1 - Authorize Questrade</Step>
            <StepQuestion>Do you have a Questrade account?</StepQuestion>
            <Table>
              <StepButton onClick={() => {this.setHaveQuestrade(true)}}>Yes</StepButton>
              <StepButton onClick={() => {this.setHaveQuestrade(false)}}>No</StepButton>
            </Table>
          </ShadowBox>
        )}
      </React.Fragment>
    )
  }
}

const select = state => ({
  brokerages: selectBrokerages(state),
});
const actions = {};

export default connect(select, actions)(QuestradeAuthorizationPicker);
