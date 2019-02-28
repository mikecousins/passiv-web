import { faSpinner,faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { connect } from 'react-redux';
import { Formik, FieldArray, Field, ErrorMessage } from 'formik';
import { toast } from "react-toastify";
import { loadGroup } from '../actions';
import { selectCurrentGroupId, selectCurrentGroupTarget } from '../selectors';
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

export class AccountTargets extends React.Component {
  state = {
    edit: false,
    loading: false
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
    if (!this.state.loading && target && target.length === 0) {
      return (
        <ShadowBox>
          <H2>Target Portfolio</H2>
          <span>No target set<Button onClick={() => this.importTarget()}>Import</Button></span>
        </ShadowBox>
      );
    }

    return (
      <ShadowBox>
        <TargetContainer>
        <H2>Target Portfolio</H2>
        {
          this.state.loading ? (
            <P>Importing targets... <FontAwesomeIcon icon={faSpinner} spin /></P>
          ) : (
            <Formik
              initialValues={{ targets: target }}
              enableReinitialize
              validate={(values, actions) => {
                const errors = {};
                const cashPercentage = 100 - values.targets.reduce((total, target) => {
                  if (target.percent) {
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
                postData(`/api/v1/portfolioGroups/${groupId}/targets/`, newTargets)
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
                values.targets = target;
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
                          if (target.percent) {
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
                              edit={edit}
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
                          {edit ? (
                            <React.Fragment>
                              <button type="button" onClick={() => arrayHelpers.push({ symbol: null, percent: 0 })}>
                                Add
                              </button>
                              <button type="button" onClick={() => this.importTarget()}>
                                Import
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
          )
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
  target: selectCurrentGroupTarget(state)
});

export default connect(select, actions)(AccountTargets);
