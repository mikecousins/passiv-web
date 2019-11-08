import { faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, FieldArray, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';
import uuid from 'uuid';
import { replace } from 'connected-react-router';
import styled from '@emotion/styled';
import { loadGroup } from '../../actions';
import {
  selectCurrentGroupId,
  selectCurrentGroupPositions,
  selectCurrentGroupTotalEquityExcludedRemoved,
  selectCurrentGroupCash,
} from '../../selectors/groups';
import { selectIsEditMode } from '../../selectors/router';
import TargetBar from './TargetBar';
import CashBar from './CashBar';
import { Button } from '../../styled/Button';
import { Edit, AButton } from '../../styled/GlobalElements';
import { postData } from '../../api';
import { TargetPosition } from '../../types/groupInfo';

const ButtonBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0 20px 0;
`;
const Th = styled.div`
  text-align: right;
`;
const Legend = styled.div`
  display: inline-block;
  margin: 0 5px 0 auto;
  padding: 11px 16px;
  border-radius: 4px;
`;

const BaseLegendTitle = styled.span`
  font-size: 18px;
  color: #000;
  position: relative;
  padding-left: 22px;
  margin-left: 20px;
  font-weight: 600;
  &:before {
    background: #000;
    border-radius: 50%;
    content: '';
    position: absolute;
    width: 17px;
    height: 17px;
    left: 0;
    top: 2px;
  }
`;

const ActualTitle = styled(BaseLegendTitle)`
  color: var(--brand-green);
  &:before {
    background: var(--brand-green);
  }
`;

const TargetTitle = styled(BaseLegendTitle)`
  margin-left: 5px;
  color: var(--brand-blue);
  &:before {
    background: var(--brand-blue);
  }
`;

const ExcludedNote = styled.div`
  text-align: center;
  font-weight: 600;
  font-size: 1em;
`;

const ExcludeTitle = styled(BaseLegendTitle)``;

type Props = {
  lockable: boolean;
  target: TargetPosition[] | null;
};

export const TargetSelector = ({ lockable, target }: Props) => {
  const [forceUpdateToggle, setForceUpdateToggle] = useState(false);

  const groupId = useSelector(selectCurrentGroupId);
  const positions = useSelector(selectCurrentGroupPositions);
  const totalEquity = useSelector(selectCurrentGroupTotalEquityExcludedRemoved);
  const cash = useSelector(selectCurrentGroupCash);
  const edit = useSelector(selectIsEditMode);

  const dispatch = useDispatch();

  if (!target || cash === null || cash === undefined) {
    return null;
  }

  const canEdit = edit || !lockable;

  const forceUpdate = () => {
    setForceUpdateToggle(!forceUpdateToggle);
  };

  const setSymbol = (target: any, symbol: any) => {
    target.fullSymbol = symbol;
    target.symbol = symbol.id;
    // TODO hack to add is_supported flag
    target.is_supported = true;
    forceUpdate();
  };

  const toggleEditMode = () => {
    if (edit) {
      dispatch(replace(`/app/group/${groupId}`));
    } else {
      dispatch(replace(`/app/group/${groupId}?edit=true`));
    }
  };

  const resetTargets = (resetForm: () => void) => {
    postData(`/api/v1/portfolioGroups/${groupId}/targets/`, [])
      .then(() => {
        // once we're done refresh the groups
        toggleEditMode();
        dispatch(loadGroup({ ids: [groupId] }));
      })
      .catch(error => {
        // display our error
        toast.error(
          `Failed to reset targets: ${error.response &&
            error.response.data.detail}`,
        );
        toggleEditMode();
        // reset the form
        resetForm();
      });
  };

  const generateNewTarget = () => {
    let target = {
      symbol: null,
      percent: 0,
      key: uuid.v4(),
    };
    return target;
  };

  type UITargetPosition = TargetPosition & {
    deleted?: boolean;
    key?: string;
  };

  const initialTargets: UITargetPosition[] = target.map((target: any) => {
    target.key = target.id;
    return { ...target };
  });

  // portfolio visualizer url construction
  const portfolioVisualizerBaseURL =
    'https://www.portfoliovisualizer.com/backtest-portfolio?s=y&timePeriod=4&initialAmount=10000&annualOperation=0&annualAdjustment=0&inflationAdjusted=true&annualPercentage=0.0&frequency=4&rebalanceType=1&showYield=false&reinvestDividends=true';

  const portfolioVisualizerURLParts = [];
  portfolioVisualizerURLParts.push(portfolioVisualizerBaseURL);

  let iValue = 0;
  target
    .filter(target => target.is_supported && !target.is_excluded)
    .map((target: any, index: number) => {
      iValue = index + 1;
      portfolioVisualizerURLParts.push(
        `&symbol${iValue}=${target.fullSymbol.symbol}&allocation${iValue}_1=${target.percent}`,
      );
      return null;
    });
  let cashPercentage =
    100 -
    target
      .filter(target => target.is_supported && !target.is_excluded)
      .reduce((total: number, target: any) => {
        if (!target.deleted && target.percent && target.is_supported) {
          return total + parseFloat(target.percent);
        }
        return total;
      }, 0);
  if (cashPercentage > 0) {
    iValue += 1;
    portfolioVisualizerURLParts.push(
      `&symbol${iValue}=CASHX&allocation${iValue}_1=${cashPercentage}`,
    );
  }

  portfolioVisualizerURLParts.push('#analysisResults');

  const portfolioVisualizerURL = portfolioVisualizerURLParts.join('');

  return (
    <Formik
      initialValues={{ targets: initialTargets }}
      enableReinitialize
      validate={values => {
        const errors: any = {};
        const cashPercentage =
          100 -
          values.targets.reduce((total: number, target: any) => {
            if (!target.deleted && target.percent) {
              return total + parseFloat(target.percent);
            }
            return total;
          }, 0);
        if (cashPercentage < 0) {
          errors.cash = 'Too low';
        }
        values.targets.forEach((target: any) => {
          if (target.deleted === undefined || target.deleted === false) {
            if (target.symbol === null) {
              errors.targets = 'Symbol missing on new target';
            }
          }
        });
        return errors;
      }}
      onSubmit={(values, actions) => {
        // set us back to non-editing state
        toggleEditMode();
        const newTargets = values.targets.filter((t: any) => !t.deleted);
        postData(`/api/v1/portfolioGroups/${groupId}/targets/`, newTargets)
          .then(() => {
            // once we're done refresh the groups
            dispatch(loadGroup({ ids: [groupId] }));
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
      onReset={values => {
        values.targets = target;
        toggleEditMode();
      }}
      render={props => (
        <div>
          <Th>
            <Legend>
              <TargetTitle>Target</TargetTitle>
              <ActualTitle>Actual</ActualTitle>
              {edit && <ExcludeTitle>Exclude</ExcludeTitle>}
            </Legend>
          </Th>
          <FieldArray
            name="targets"
            render={arrayHelpers => {
              // calculate any new targets actual percentages
              props.values.targets
                .filter(target => target.actualPercentage === undefined)
                .forEach(target => {
                  if (
                    positions &&
                    positions.find(
                      position => position.symbol.id === target.symbol,
                    )
                  ) {
                    const position = positions.find(
                      position => position.symbol.id === target.symbol,
                    );
                    if (position) {
                      target.actualPercentage =
                        ((position.price * position.units) / totalEquity) * 100;
                    }
                  }
                });

              // calculate the desired cash percentage
              const cashPercentage =
                100 -
                props.values.targets.reduce((total: number, target: any) => {
                  if (!target.deleted && target.percent) {
                    return total + parseFloat(target.percent);
                  }
                  return total;
                }, 0);

              // calculate the actual cash percentage
              const cashActualPercentage = (cash / totalEquity) * 100;

              if (props.values.targets.filter(t => !t.deleted).length === 0) {
                arrayHelpers.push(generateNewTarget());
              }

              // generate the share url
              let shareUrl = `/app/share?`;
              props.values.targets.forEach((target: any) => {
                if (target.fullSymbol && target.fullSymbol.symbol) {
                  return (shareUrl += `symbols[]=${target.fullSymbol.symbol}&percentages[]=${target.percent}&`);
                } else {
                  return null;
                }
              });
              shareUrl = shareUrl.substr(0, shareUrl.length - 1);
              var excludedAssetCount = props.values.targets.filter(
                target => target.is_excluded === true,
              ).length;

              return (
                <React.Fragment>
                  {props.values.targets.map((t, index) => {
                    if (t.deleted) {
                      return null;
                    }
                    if (edit === false && t.is_excluded === true) {
                      return null;
                    }

                    return (
                      <div key={t.key}>
                        <TargetBar
                          key={t.symbol}
                          target={t}
                          edit={canEdit}
                          setSymbol={symbol => {
                            setSymbol(t, symbol);
                            props.setFieldTouched(`targets.${index}.symbol`);
                          }}
                          onDelete={key => {
                            let target = props.values.targets.find(
                              t => t.key === key,
                            );
                            if (!target) {
                              return;
                            }
                            target.deleted = true;
                            props.setFieldTouched(`targets.${index}.percent`);
                            props.setFieldValue(
                              `targets.${index}.percent`,
                              -0.1,
                            );
                            forceUpdate();
                          }}
                          onExclude={key => {
                            let target = props.values.targets.find(
                              t => t.key === key,
                            );
                            if (!target) {
                              return;
                            }
                            const newExcluded = !target.is_excluded;
                            target.is_excluded = newExcluded;
                            props.setFieldTouched(`targets.${index}.percent`);
                            props.setFieldValue(`targets.${index}.percent`, 0);
                            forceUpdate();
                          }}
                        >
                          <input
                            type="number"
                            name={`targets.${index}.percent`}
                            value={props.values.targets[index].percent}
                            tabIndex={index + 1}
                            onChange={e =>
                              props.setFieldValue(
                                `targets.${index}.percent`,
                                parseFloat(e.target.value),
                              )
                            }
                            onBlur={() => {
                              props.setFieldValue(
                                `targets.${index}.percent`,
                                parseFloat(
                                  props.values.targets[index].percent.toFixed(
                                    1,
                                  ),
                                ),
                              );
                            }}
                            readOnly={!canEdit}
                          />
                        </TargetBar>
                      </div>
                    );
                  })}
                  <div key="cashBar">
                    <CashBar
                      percentage={cashPercentage}
                      actualPercentage={cashActualPercentage}
                      edit={edit}
                    />
                  </div>
                  {!canEdit && excludedAssetCount > 0 && (
                    <ExcludedNote>
                      And <strong>{excludedAssetCount}</strong> excluded asset
                      {excludedAssetCount > 1 && 's'}.
                    </ExcludedNote>
                  )}

                  <ErrorMessage name="targets" component="div" />
                  {canEdit ? (
                    <React.Fragment>
                      <button
                        type="button"
                        onClick={() => arrayHelpers.push(generateNewTarget())}
                      >
                        Add
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (lockable) {
                            resetTargets(props.resetForm);
                          } else {
                            let len = props.values.targets.length;
                            for (let i = 0; i < len; i++) {
                              props.values.targets.pop();
                            }
                            arrayHelpers.push(generateNewTarget());
                          }
                        }}
                      >
                        Reset
                      </button>
                      <Button
                        type="submit"
                        onClick={() => props.handleSubmit()}
                        disabled={
                          props.isSubmitting || !props.dirty || !props.isValid
                        }
                      >
                        Save
                      </Button>
                      {lockable && (
                        <button
                          type="button"
                          onClick={() => {
                            props.handleReset();
                            toggleEditMode();
                          }}
                        >
                          Cancel
                        </button>
                      )}
                    </React.Fragment>
                  ) : (
                    <ButtonBox>
                      <div>
                        <Edit type="button" onClick={() => toggleEditMode()}>
                          <FontAwesomeIcon icon={faLock} />
                          Edit Targets
                        </Edit>
                      </div>
                      <div>
                        <AButton
                          href={portfolioVisualizerURL}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Portfolio Visualizer
                        </AButton>
                      </div>
                    </ButtonBox>
                  )}
                </React.Fragment>
              );
            }}
          />
        </div>
      )}
    />
  );
};

export default TargetSelector;
