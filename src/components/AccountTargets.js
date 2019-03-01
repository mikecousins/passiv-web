import { faSpinner,faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { connect } from 'react-redux';
import { Formik, FieldArray, Field, ErrorMessage } from 'formik';
import { toast } from "react-toastify";
import { loadGroup } from '../actions';
import { selectCurrentGroupId, selectCurrentGroupTarget, selectCurrentGroupTargetInitialized } from '../selectors';
import TargetBar from './TargetBar';
import CashBar from './CashBar';
import { Button } from '../styled/Button';
import { H2, H3, Edit, P } from '../styled/GlobalElements';
import { TargetRow } from '../styled/Target';
import { postData } from '../api';
import styled from '@emotion/styled';
import ShadowBox from '../styled/ShadowBox';

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

  resetTargets() {
    this.setState({loading: true});
    postData(`/api/v1/portfolioGroups/${this.props.groupId}/targets/`, [])
      .then((response) => {
        // once we're done refresh the groups
        this.setState({loading: false, edit: false});
        this.props.refreshGroup({ids: [this.props.groupId]});
      })
      .catch((error) => {
        // display our error
        toast.error(`Failed to reset targets: ${error.response && error.response.data.detail}`);
        this.setState({loading: false, edit: false});
        // reset the form
        actions.resetForm();
      });
  }

  generateTargetForm() {
    let form = (
      <Formik
        initialValues={{ targets: this.props.target }}
        enableReinitialize
        validate={(values, actions) => {
          const errors = {};
          const cashPercentage = 100 - values.targets.reduce((total, target) => {
            if (!target.deleted && target.percent) {
              return total + parseFloat(target.percent);
            }
            return total;
          }, 0);
          if (cashPercentage < 0) {
            errors.cash = 'Too low';
          }
          return errors;
        }}
        onSubmit={(values, actions) => {
          // set us back to non-editing state
          this.setState({edit: false});
          const newTargets = values.targets.filter(t => !t.deleted);
          postData(`/api/v1/portfolioGroups/${this.props.groupId}/targets/`, newTargets)
            .then((response) => {
              // once we're done refresh the groups
              this.props.refreshGroup({ids: [this.props.groupId]});
            })
            .catch((error) => {
              // display our error
              toast.error(`Failed to edit targets: ${error.response && error.response.data.detail}`);

              // reset the form
              actions.resetForm();
            });
        }}
        onReset={(values, actions) => {
          values.targets = this.props.target;
          this.setState({ edit: false });
        }}
        render={(props) => (
          <div>
            <TargetRow>
              <H3></H3>
              <H3>Target</H3>
              <H3>Actual</H3>
            </TargetRow>
              <FieldArray
                name="targets"
                render={arrayHelpers => {
                  const cashPercentage = 100 - props.values.targets.reduce((total, target) => {
                    if (!target.deleted && target.percent) {
                      return total + parseFloat(target.percent);
                    }
                    return total;
                  }, 0);
                  const cashActualPercentage = 100 - props.values.targets.reduce((total, target) => {
                    if (target.actualPercentage) {
                      return total + target.actualPercentage;
                    }
                    return total;
                  }, 0);
                  return (
                  <React.Fragment>

                    {props.values.targets.filter(t => !t.deleted).map((t, index) => (
                    <div key={t.id === undefined ? this.getRandomId() : t.id}>
                      <TargetBar
                        key={t.symbol}
                        target={t}
                        edit={this.state.edit}
                        setSymbol={(symbol) => this.setSymbol(t, symbol)}
                        onDelete={(id) => {
                          const target = props.values.targets.find(t => t.id === id);
                          target.deleted = true;
                          this.forceUpdate();
                          props.setFieldTouched('targets.0.percent');
                        }}
                      >
                        <Field type="number" name={`targets.${index}.percent`} readOnly={!this.state.edit} />
                      </TargetBar>
                    </div>
                    ))}
                    <div key="cashBar">
                      <CashBar percentage={cashPercentage} actualPercentage={cashActualPercentage} />
                    </div>
                    <ErrorMessage name="targets" />
                    {this.state.edit ? (
                      <React.Fragment>
                        <button type="button" onClick={() => arrayHelpers.push({ symbol: null, percent: 0 })}>
                          Add
                        </button>
                        <button type="button" onClick={() => this.resetTargets()}>
                          Reset
                        </button>
                        <Button type="submit" onClick={props.handleSubmit} disabled={(props.isSubmitting || !props.dirty || !props.isValid) && !props.values.targets.find(t => t.deleted)}>
                          Save
                        </Button>
                        <button type="button" onClick={() => {
                          props.values.targets.forEach((t) => {
                            if (t.deleted) {
                              delete t.deleted;
                            }
                          })
                          props.handleReset();
                        }}>
                          Cancel
                        </button>
                      </React.Fragment>
                    ) : (
                      <Edit type="button" onClick={() => this.setState({ edit: true })}><FontAwesomeIcon icon={faLock} />Edit Targets</Edit>
                    )}

                  </React.Fragment>
                )}}
              />

            </div>
        )}
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
        break
      case 'IMPORT':
        return (<P>LOL1</P>);
        break;
      case 'MANUAL':
        return this.generateTargetForm();
        break;
    }
  }

  render() {
    const { target, groupId } = this.props;
    const { edit } = this.state;

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
          ) : this.generateTargetForm()
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
