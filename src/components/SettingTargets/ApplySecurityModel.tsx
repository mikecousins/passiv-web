import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { ErrorMessage, FieldArray, Formik } from 'formik';
import styled from '@emotion/styled';
import Grid from '../../styled/Grid';
import { GreyBox } from './SettingTargets';
import {
  selectCurrentGroup,
  selectCurrentGroupCash,
  selectCurrentGroupTotalEquityExcludedRemoved,
} from '../../selectors/groups';
import { BarsContainer, Bar, BarTarget, BarActual } from '../../styled/Target';
import { A, P } from '../../styled/GlobalElements';
import {
  Th,
  Legend,
  ActualTitle,
  TargetTitle,
} from '../PortfolioGroupTargets/TargetSelector';
import CashBar from '../PortfolioGroupTargets/CashBar';
import { Button } from '../../styled/Button';
import { postData } from '../../api';
import { loadGroupInfo, loadModelPortfolios } from '../../actions';
import Dialog from '@reach/dialog';
import { H2Margin, ActionContainer } from '../ModelAssetClass/AssetClass';
import { toast } from 'react-toastify';

const StyledLegend = styled(Legend)``;

const Symbol = styled.span`
  font-weight: 600;
  font-size: 22px;
`;
const Description = styled.span`
  font-size: 22px;
  margin-left: 20px;
`;
const Percent = styled.span`
  font-weight: 400;
  font-size: 33px;
`;
const TargetPercent = styled.input`
  font-weight: 600;
  font-size: 33px;
  margin-right: 50px;
  color: var(--brand-blue);
  width: 150px;
  text-align: center;
  background: white;
  border: 2px solid var(--brand-blue);
  padding: 5px;
  position: relative;
`;

const NoSecurities = styled(P)`
  text-align: center;
  font-weight: 600;
`;

const DeleteButton = styled.div`
  background-color: #535455;
  width: 40px;
  position: relative;
  top: -20px;
  right: 19px;
`;

type Props = {
  model: any;
  modelPortfolio: any;
};

const ApplySecurityModel = ({ model, modelPortfolio }: Props) => {
  const dispatch = useDispatch();
  const totalEquity = useSelector(selectCurrentGroupTotalEquityExcludedRemoved);
  const cash = useSelector(selectCurrentGroupCash);
  const [showDialog, setShowDialog] = useState(false);
  const [overWriteModel, setOverWriteModel] = useState(true);
  const currentGroup = useSelector(selectCurrentGroup);
  // const setSymbol = (target: any, symbol: any) => {
  //   target.fullSymbol = symbol;
  //   target.symbol = symbol.id;
  //   target.is_supported = true;
  // };
  return (
    <>
      {model?.length < 1 ? (
        <NoSecurities>There are no securities in this model.</NoSecurities>
      ) : (
        <Formik
          initialValues={{ targets: model }}
          enableReinitialize
          validate={(values) => {
            const errors: any = {};
            const cashPercentage =
              100 -
              values.targets.reduce((total: number, target: any) => {
                if (!target.deleted && target.percent) {
                  return total + parseFloat(target.percent);
                }
                return total;
              }, 0);
            const roundedCashPercentage =
              Math.round(cashPercentage * 1000) / 1000;
            if (roundedCashPercentage < -0) {
              errors.cash = 'Too low';
            }
            return errors;
          }}
          onSubmit={(values, actions) => {
            const newArrayOfObj = values?.targets.map(
              //@ts-ignore
              ({ fullSymbol: symbol, ...rest }) => ({
                symbol,
                ...rest,
              }),
            );
            const toBeSubmitted = {
              model_portfolio: modelPortfolio,
              model_portfolio_security: newArrayOfObj,
            };
            if (overWriteModel) {
              postData(
                `/api/v1/modelPortfolio/${modelPortfolio.id}`,
                toBeSubmitted,
              )
                .then((res) => {
                  dispatch(loadModelPortfolios());
                  toast.success(
                    `'${toBeSubmitted.model_portfolio.name}' got overwritten.`,
                    { autoClose: 3000 },
                  );
                })
                .catch(() => {
                  toast.error('Failed to apply changes to this model.', {
                    autoClose: 3000,
                  });
                  actions.resetForm();
                });
            } else {
              toBeSubmitted.model_portfolio.name = `${modelPortfolio.name}(modified)`;
              // create new model portfolio
              postData('/api/v1/modelPortfolio/', {}).then((res) => {
                // apply the details of model to the new model
                postData(
                  `/api/v1/modelPortfolio/${res.data.model_portfolio.id}`,
                  toBeSubmitted,
                ).then((res) => {
                  dispatch(loadModelPortfolios());
                  // apply the new model to the current group
                  postData(
                    `api/v1/portfolioGroups/${currentGroup?.id}/modelPortfolio/${res.data.model_portfolio.id}`,
                    {},
                  ).then((res) => {
                    dispatch(loadGroupInfo());
                    toast.success(
                      `'${toBeSubmitted.model_portfolio.name}' has applied to '${currentGroup?.name}'.`,
                      { autoClose: 3000 },
                    );
                  });
                });
              });
            }
          }}
        >
          {(props) => (
            <div>
              {/* <Th>
                <Legend>
                  <TargetTitle>TARGET</TargetTitle>
                  <ActualTitle>ACTUAL</ActualTitle>
                </Legend>
              </Th> */}
              <FieldArray
                name="targets"
                render={(arrayHelpers) => {
                  // calculate any new targets actual percentages
                  // props.values.targets
                  //   .filter((target) => target.actualPercentage === undefined)
                  //   .forEach((target) => {
                  //     if (
                  //       positions &&
                  //       positions.find(
                  //         (position) => position.symbol.id === target.symbol,
                  //       )
                  //     ) {
                  //       const position = positions.find(
                  //         (position) => position.symbol.id === target.symbol,
                  //       );
                  //       if (position) {
                  //         target.actualPercentage = position.actualPercentage;
                  //       }
                  //     }
                  //   });

                  // calculate the desired cash percentage
                  const cashPercentage =
                    100 -
                    props.values.targets.reduce(
                      (total: number, target: any) => {
                        if (!target.deleted && target.percent) {
                          return total + parseFloat(target.percent);
                        }
                        return total;
                      },
                      0,
                    );

                  // calculate the actual cash percentage

                  const cashActualPercentage = (cash! / totalEquity) * 100;

                  // if (
                  //   props.values.targets.filter((t) => !t.deleted).length === 0
                  // ) {
                  //   arrayHelpers.push(generateNewTarget());
                  // }

                  // generate the share url

                  var excludedAssetCount = props.values.targets.filter(
                    (target: any) => target.is_excluded === true,
                  ).length;

                  return (
                    <React.Fragment>
                      {props.values.targets.map((t: any, index: number) => {
                        if (
                          props.values.targets[index].actualPercentage ===
                          undefined
                        ) {
                          props.values.targets[index].actualPercentage = 0;
                        }
                        if (t.deleted) {
                          return null;
                        }
                        return (
                          <GreyBox key={t.key}>
                            <DeleteButton></DeleteButton>
                            <Grid columns="3fr 1fr">
                              <div>
                                <Symbol>
                                  {
                                    props.values.targets[index].fullSymbol
                                      .symbol
                                  }
                                </Symbol>
                                <Description>
                                  {
                                    props.values.targets[index].fullSymbol
                                      .description
                                  }
                                </Description>
                              </div>
                              <div>
                                <TargetPercent
                                  type="number"
                                  name={`targets.${index}.percent`}
                                  value={props.values.targets[index].percent}
                                  tabIndex={index + 1}
                                  onChange={(e) =>
                                    props.setFieldValue(
                                      `targets.${index}.percent` as 'targets',
                                      parseFloat(e.target.value),
                                    )
                                  }
                                  // min={'0'}
                                  // max={'100'}
                                />
                                <Percent>
                                  {props.values.targets[
                                    index
                                  ].actualPercentage?.toFixed(1)}
                                  %
                                </Percent>
                              </div>
                            </Grid>
                            <BarsContainer
                              style={{
                                background: 'white',
                                width: '100%',
                                marginTop: '20px',
                                border: '1px solid #BBBBBB',
                              }}
                            >
                              {!(
                                props.values.targets[index].actualPercentage ===
                                undefined
                              ) && (
                                <BarActual>
                                  <Bar
                                    style={{
                                      width: `${props.values.targets[
                                        index
                                      ].actualPercentage?.toFixed(0)}%`,
                                    }}
                                  >
                                    {' '}
                                  </Bar>
                                </BarActual>
                              )}
                              <BarTarget>
                                {props.values.targets[index].percent < 0 ? (
                                  <div
                                    style={{
                                      width: '100%',
                                      backgroundColor: 'red',
                                    }}
                                  >
                                    Warning: cash allocation cannot be negative!
                                  </div>
                                ) : (
                                  <Bar
                                    style={{
                                      width: `${props.values.targets[index].percent}%`,
                                      maxWidth: '100%',
                                    }}
                                  >
                                    {' '}
                                  </Bar>
                                )}
                              </BarTarget>
                            </BarsContainer>
                          </GreyBox>
                        );
                      })}
                      <div key="cashBar">
                        <CashBar
                          percentage={cashPercentage}
                          actualPercentage={cashActualPercentage}
                          edit={true}
                        />
                      </div>
                      {/* {true && excludedAssetCount > 0 && (
                        <ExcludedNote>
                          And <strong>{excludedAssetCount}</strong> excluded
                          asset
                          {excludedAssetCount > 1 && 's'}.
                        </ExcludedNote>
                      )} */}

                      <ErrorMessage name="targets" component="div" />
                      {props.dirty && (
                        <Button
                          type="submit"
                          onClick={() => {
                            // modelPortfolio.total_assigned_portfolio_groups > 1
                            true ? setShowDialog(true) : props.handleSubmit();
                          }}
                          disabled={!props.dirty}
                        >
                          SAVE CHANGES
                        </Button>
                      )}
                      <Dialog
                        isOpen={showDialog}
                        onDismiss={() => setShowDialog(false)}
                        aria-labelledby="dialog1Title"
                        aria-describedby="dialog1Desc"
                      >
                        <H2Margin>
                          This Model is being used by{' '}
                          {modelPortfolio.total_assigned_portfolio_groups - 1}
                          groups.
                          <span style={{ fontWeight: 'bold' }}>*</span>?
                        </H2Margin>
                        <ActionContainer>
                          <A
                            onClick={() => {
                              setShowDialog(false);
                              setOverWriteModel(true);
                              props.handleSubmit();
                            }}
                          >
                            Overwrite "{modelPortfolio.name}"
                          </A>
                          <Button
                            onClick={() => {
                              setShowDialog(false);
                              setOverWriteModel(false);
                              props.handleSubmit();
                            }}
                          >
                            Create New Model
                          </Button>
                        </ActionContainer>
                      </Dialog>
                    </React.Fragment>
                  );
                }}
              />
            </div>
          )}
        </Formik>
      )}
    </>
  );
};

export default ApplySecurityModel;
