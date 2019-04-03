import { faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { connect } from 'react-redux';
import { Formik, FieldArray, Field, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';
import { loadGroup } from '../actions';
import {
  selectCurrentGroupId,
  selectCurrentGroupPositions,
  selectCurrentGroupTotalEquity,
} from '../selectors';
import TargetBar from './TargetBar';
import CashBar from './CashBar';
import { Button } from '../styled/Button';
import { H3, Edit } from '../styled/GlobalElements';
import { TargetRow } from '../styled/Target';
import { postData } from '../api';

export class TargetSelector extends React.Component {
  state = {
    edit: false,
    loading: false,
    counter: 0,
  };

  canEdit() {
    return this.state.edit || !this.props.lockable;
  }

  setSymbol(target, symbol) {
    target.fullSymbol = symbol;
    target.symbol = symbol.id;
    this.forceUpdate();
  }

  resetTargets() {
    this.setState({ loading: true });
    postData(`/api/v1/portfolioGroups/${this.props.groupId}/targets/`, [])
      .then(response => {
        // once we're done refresh the groups
        this.setState({ loading: false, edit: false });
        this.props.refreshGroup({ ids: [this.props.groupId] });
      })
      .catch(error => {
        // display our error
        toast.error(
          `Failed to reset targets: ${error.response &&
            error.response.data.detail}`,
        );
        this.setState({ loading: false, edit: false });
        // reset the form
        actions.resetForm();
      });
  }

  generateNewTarget() {
    let target = {
      symbol: null,
      percent: 0,
      key: this.state.counter,
      id: this.state.counter,
    };
    this.setState({ counter: this.state.counter + 1 });
    return target;
  }

  render() {
    return (
      <Formik
        initialValues={{ targets: this.props.target }}
        enableReinitialize
        validate={(values, actions) => {
          console.log('targets', values.targets);
          const errors = {};
          const cashPercentage =
            100 -
            values.targets.reduce((total, target) => {
              if (!target.deleted && target.percent) {
                return total + parseFloat(target.percent);
              }
              return total;
            }, 0);
          if (cashPercentage < 0) {
            errors.cash = 'Too low';
          }
          values.targets.forEach((target, index) => {
            if (target.deleted === undefined || target.deleted === false) {
              if (target.symbol === null) {
                errors.targets = 'Symbol missing on new target';
              }
            }
          });
          console.log('errors', errors);
          return errors;
        }}
        onSubmit={(values, actions) => {
          // set us back to non-editing state
          this.setState({ edit: false });
          const newTargets = values.targets.filter(t => !t.deleted);
          postData(
            `/api/v1/portfolioGroups/${this.props.groupId}/targets/`,
            newTargets,
          )
            .then(response => {
              // once we're done refresh the groups
              this.props.refreshGroup({ ids: [this.props.groupId] });
            })
            .catch(error => {
              // display our error
              toast.error(
                `Failed to edit targets: ${error.response &&
                  error.response.data.detail}`,
              );

              // reset the form
              actions.resetForm();
            });
        }}
        onReset={(values, actions) => {
          values.targets = this.props.target;
          this.setState({ edit: false });
        }}
        render={props => (
          <div>
            <TargetRow>
              <H3 />
              <H3>Target</H3>
              <H3>Actual</H3>
            </TargetRow>
            <FieldArray
              name="targets"
              render={arrayHelpers => {
                // calculate any new targets actual percentages
                props.values.targets
                  .filter(target => target.actualPercentage === undefined)
                  .forEach(target => {
                    if (
                      this.props.positions &&
                      this.props.positions.find(
                        position => position.symbol.id === target.symbol,
                      )
                    ) {
                      const position = this.props.positions.find(
                        position => position.symbol.id === target.symbol,
                      );
                      target.actualPercentage =
                        ((position.price * position.units) /
                          this.props.totalEquity) *
                        100;
                    }
                  });

                // calculate the desired cash percentage
                const cashPercentage =
                  100 -
                  props.values.targets.reduce((total, target) => {
                    if (!target.deleted && target.percent) {
                      return total + parseFloat(target.percent);
                    }
                    return total;
                  }, 0);

                // calculate the actual cash percentage
                const cashActualPercentage =
                  100 -
                  props.values.targets.reduce((total, target) => {
                    if (!(target.actualPercentage === undefined)) {
                      return total + target.actualPercentage;
                    }
                    return total;
                  }, 0);
                if (props.values.targets.filter(t => !t.deleted).length === 0) {
                  arrayHelpers.push(this.generateNewTarget());
                }
                return (
                  <React.Fragment>
                    {props.values.targets
                      .filter(
                        t =>
                          t.deleted === undefined ||
                          (t.deleted !== undefined && t.deleted === false),
                      )
                      .map((t, index) => (
                        <div key={t.id || t.key}>
                          <TargetBar
                            key={t.symbol}
                            target={t}
                            edit={this.canEdit()}
                            setSymbol={symbol => {
                              this.setSymbol(t, symbol);
                              props.setFieldTouched(`targets.${index}.symbol`);
                            }}
                            onDelete={id => {
                              const target = props.values.targets.find(
                                t => t.id === id,
                              );
                              target.deleted = true;
                              this.forceUpdate();
                              props.setFieldTouched('targets.0.percent');
                            }}
                          >
                            <Field
                              type="number"
                              name={`targets.${index}.percent`}
                              readOnly={!this.canEdit()}
                            />
                          </TargetBar>
                        </div>
                      ))}
                    <div key="cashBar">
                      <CashBar
                        percentage={cashPercentage}
                        actualPercentage={cashActualPercentage}
                      />
                    </div>
                    <ErrorMessage name="targets" component="div" />
                    {this.canEdit() ? (
                      <React.Fragment>
                        <button
                          type="button"
                          onClick={() =>
                            arrayHelpers.push(this.generateNewTarget())
                          }
                        >
                          Add
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (this.props.lockable) {
                              this.resetTargets();
                            } else {
                              let len = props.values.targets.length;
                              for (let i = 0; i < len; i++) {
                                props.values.targets.pop(0);
                              }
                              arrayHelpers.push(this.generateNewTarget());
                            }
                          }}
                        >
                          Reset
                        </button>
                        <Button
                          type="submit"
                          onClick={props.handleSubmit}
                          disabled={
                            (props.isSubmitting ||
                              !props.dirty ||
                              !props.isValid) &&
                            !props.values.targets.find(t => t.deleted)
                          }
                        >
                          Save
                        </Button>
                        {this.props.lockable && (
                          <button
                            type="button"
                            onClick={() => {
                              props.values.targets.forEach(t => {
                                if (t.deleted) {
                                  delete t.deleted;
                                }
                              });
                              props.handleReset();
                            }}
                          >
                            Cancel
                          </button>
                        )}
                      </React.Fragment>
                    ) : (
                      <Edit
                        type="button"
                        onClick={() => this.setState({ edit: true })}
                      >
                        <FontAwesomeIcon icon={faLock} />
                        Edit Targets
                      </Edit>
                    )}
                  </React.Fragment>
                );
              }}
            />
          </div>
        )}
      />
    );
  }
}

const actions = {
  refreshGroup: loadGroup,
};

const select = state => ({
  groupId: selectCurrentGroupId(state),
  positions: selectCurrentGroupPositions(state),
  totalEquity: selectCurrentGroupTotalEquity(state),
});

export default connect(
  select,
  actions,
)(TargetSelector);
