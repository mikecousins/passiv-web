import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postData } from '../../api';
import styled from '@emotion/styled';
import { toast } from 'react-toastify';
import { loadGroup, loadModelPortfolios } from '../../actions';
import { ModelPortfolioDetailsType } from '../../types/modelPortfolio';
import NameInputAndEdit from '../NameInputAndEdit';
import { ModelAssetClass } from '../../types/modelAssetClass';
import { useHistory } from 'react-router';
import { selectGroupInfoForModelPortfolio } from '../../selectors/modelPortfolios';
import { Field, FieldArray, Form, Formik } from 'formik';
import Grid from '../../styled/Grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare, faTimes } from '@fortawesome/free-solid-svg-icons';
import SymbolSelector from '../PortfolioGroupTargets/TargetBar/SymbolSelector';
import { Button } from '../../styled/Button';
import AssetClassSelector from './AssetClassSelector';

const Box = styled.div`
  border: 1px solid #bfb6b6;
  margin-right: 50px;
  padding: 10px;
  margin-bottom: 20px;
  @media (max-width: 900px) {
    margin-right: 0;
  }
`;

const MainContainer = styled.div`
  margin: 10px;
`;

const FormContainer = styled.div`
  border-bottom: 1px solid var(--brand-blue);
  margin-top: 20px;
`;

const Percentage = styled.div`
  display: inline-block;
  border-right: 1px solid var(--brand-blue);
  @media (max-width: 740px) {
    margin-bottom: 10px;
  }
`;

const PercentageInput = styled.input`
  max-width: 100px;
  color: var(--brand-blue);
  font-weight: 600;
  font-size: 26px;
`;

const PercentageLabel = styled.label`
  color: var(--brand-blue);
  font-weight: 600;
  font-size: 26px;
  margin-right: 10px;
`;

const Symbol = styled.span`
  font-size: 18px;
  margin-left: 10px;
`;

const ButtonContainer = styled.div`
  margin-top: 20px;
`;

const ApplyModelBtn = styled(Button)`
  background-color: transparent;
  color: var(--brand-blue);
  border: 1px solid var(--brand-blue);
`;

const NewNameInput = styled(Field)`
  border-bottom: 2px solid var(--brand-blue);
  color: var(--brand-blue);
  font-size: 28px;
  font-weight: 600;
`;
const NewNameLabel = styled.label`
  font-size: 28px;
  font-weight: 500;
  margin: 0 15px;
  display: inline-block;
`;

const ErroMsg = styled.div`
  color: red;
  margin-top: 5px;
`;

const StyledContainer = styled.div`
  background: #fff;
  display: inline-block;
  position: relative;
  top: -24px;
  padding: 0 15px;
  margin-bottom: -7px;
`;

const StyledName = styled.span`
  font-weight: 600;
  font-size: 30px;
`;

type Props = {
  modelPortfolio: ModelPortfolioDetailsType;
  assetClasses: ModelAssetClass[];
  securityBased: boolean;
  sharedModel: boolean;
};

const ModelPortoflioBox = ({
  modelPortfolio,
  assetClasses,
  securityBased,
  sharedModel,
}: Props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [modelPortfolioName, setModelPortfolioName] = useState(
    modelPortfolio.model_portfolio.name,
  );
  const [editName, setEditName] = useState(false);

  const [showDialog, setShowDialog] = useState(false);
  const [overWriteModel, setOverWriteModel] = useState(true);
  const [showNameInput, setShowNameInput] = useState(false);

  let model: any = modelPortfolio.model_portfolio_asset_class;
  if (securityBased) {
    model = modelPortfolio.model_portfolio_security;
  }

  const modelId = modelPortfolio.model_portfolio.id;
  const assignedPortfolioGroups =
    modelPortfolio.model_portfolio.total_assigned_portfolio_groups > 0;

  const group = useSelector(selectGroupInfoForModelPortfolio);
  const groupInfo = group.groupInfo;
  const groupId = groupInfo?.groupId;
  const editMode = group.edit;

  const finishEditingName = () => {
    if (
      modelPortfolioName !== modelPortfolio.model_portfolio.name &&
      modelPortfolioName!.trim().length > 0
    ) {
      modelPortfolio.model_portfolio.name = modelPortfolioName;
      postData(
        `/api/v1/modelPortfolio/${modelPortfolio.model_portfolio.id}`,
        modelPortfolio,
      )
        .then(() => {
          dispatch(loadModelPortfolios());
        })
        .catch(() => {
          dispatch(loadModelPortfolios());
          toast.error(
            `${modelPortfolio.model_portfolio.name} Model Portfolio Name Update Failed`,
            { autoClose: 3000 },
          );
        });
    } else {
      setModelPortfolioName(modelPortfolio.model_portfolio.name);
    }
    setEditName(false);
  };

  const applyModel = () => {
    postData(`api/v1/portfolioGroups/${groupId}/modelPortfolio/${modelId}`, {})
      .then((res) => {
        dispatch(loadGroup({ ids: [groupId] }));
        dispatch(loadModelPortfolios());
        toast.success(
          `"${modelPortfolio.model_portfolio.name}" applied to "${groupInfo?.name}"`,
        );
        history.push(`/app/group/${groupId}`);
      })
      .catch((err) => {
        toast.success(`${err.message}`);
      });
  };
  return (
    <Box>
      <NameInputAndEdit
        value={modelPortfolioName}
        edit={editName}
        allowEdit={!sharedModel}
        editBtnTxt={'Edit Name'}
        onChange={(e: any) => setModelPortfolioName(e.target.value)}
        onKeyPress={(e: any) => e.key === 'Enter' && finishEditingName()}
        onClickDone={() => finishEditingName()}
        onClickEdit={() => setEditName(true)}
        StyledName={StyledName}
        StyledContainer={StyledContainer}
      />
      <MainContainer>
        <Formik
          initialValues={{
            targets: model,
            newModelName: '',
            newTarget: {
              percent: 0,
              symbol: {},
              model_asset_class: {},
            },
          }}
          enableReinitialize
          initialStatus={{ submitted: false }}
          validate={(values) => {
            const errors: any = {};
            if (values.newTarget.percent < 0) {
              errors.newTarget = 'Percentage cannot be negative';
            }
            // if (!values.newTarget.symbol) {
            //   errors.newTarget = 'Symbol cannot be empty';
            // }
            return errors;
          }}
          onSubmit={(values, actions) => {
            if (securityBased) {
              modelPortfolio.model_portfolio_security = values.targets;
            } else {
              // const targets = values.targets.map((t: any) => {
              //   return {
              //     model_asset_class: {
              //       id: t.model_asset_class.id,
              //     },
              //     percent: t.percent,
              //   };
              // });
              modelPortfolio.model_portfolio_asset_class = values.targets;
            }
            console.log('model', modelPortfolio);

            postData(`/api/v1/modelPortfolio/${modelId}`, modelPortfolio)
              .then(() => {
                dispatch(loadModelPortfolios());
                // if (editMode) {
                //   // apply the model to all the accounts
                // }
              })
              .catch(() => {
                dispatch(loadModelPortfolios());
              });
            // if (overWriteModel) {
            //   postData(`/api/v1/modelPortfolio/${modelId}`, modelPortfolio)
            //     .then(() => {
            //       dispatch(loadModelPortfolios());
            //       if (editMode) {
            //         // apply the model to all the accounts
            //       }
            //     })
            //     .catch(() => {
            //       dispatch(loadModelPortfolios());
            //     });
            // } else {
            //   // create new model portfolio
            //   postData('/api/v1/modelPortfolio/', {}).then((res) => {
            //     // apply the details of model to the new model
            //     modelPortfolio.model_portfolio.name = values.newModelName;
            //     postData(
            //       `/api/v1/modelPortfolio/${res.data.model_portfolio.id}`,
            //       modelPortfolio,
            //     ).then((res) => {
            //       dispatch(loadModelPortfolios());
            //       // apply the new model to the current group
            //       if (groupId) {
            //         postData(
            //           `api/v1/portfolioGroups/${groupId}/modelPortfolio/${res.data.model_portfolio.id}`,
            //           {},
            //         ).then((res) => {
            //           toast.success(
            //             `'${modelPortfolio.model_portfolio.name}' has applied to '${groupInfo?.name}'.`,
            //           );
            //           history.replace('/app/models');
            //           dispatch(loadModelPortfolios());
            //         });
            //       } else {
            //         history.replace('/app/models');
            //       }
            //     });
            //   });
            // }
            actions.resetForm();
            actions.setSubmitting(false);
            actions.setStatus({ submitted: true });
          }}
        >
          {(props) => (
            <Form>
              <FieldArray
                name="targets"
                render={(arrayHelpers) => {
                  const total = props.values.targets.reduce(
                    (sum: string, target: any) => {
                      if (target.percent) {
                        return (+sum + +target.percent).toFixed(3);
                      }
                      return sum;
                    },
                    '0',
                  );

                  const cashPercentage = (100 - +total).toFixed(3);
                  let availableAssetClasses: any = [];
                  if (!securityBased) {
                    const usedAssetClasses = props.values.targets.map(
                      (astCls: any) => {
                        return astCls.model_asset_class.id;
                      },
                    );
                    // filter out the asset classes that have been already added
                    availableAssetClasses = assetClasses.filter(
                      (ast) => !usedAssetClasses.includes(ast.id),
                    );
                  }

                  return (
                    <>
                      <ul>
                        <li
                          style={{
                            borderLeft: '5px solid var(--brand-green)',
                            lineHeight: '30px',
                            padding: '10px',
                            marginBottom: '20px',
                          }}
                          key="cash"
                        >
                          <span style={{ fontSize: '26px', fontWeight: 900 }}>
                            {cashPercentage}% Cash
                          </span>
                        </li>
                      </ul>
                      {props.values.targets.map(
                        (target: any, index: number) => {
                          return (
                            <Grid columns="1fr 50px">
                              <FormContainer style={{ borderColor: 'black' }}>
                                <Percentage>
                                  <PercentageInput
                                    type="number"
                                    name={`targets.${index}`}
                                    value={props.values.targets[index].percent}
                                    onChange={(e) =>
                                      props.setFieldValue(
                                        `targets.${index}.percent` as 'targets',
                                        parseFloat(e.target.value),
                                      )
                                    }
                                    required
                                    readOnly={assignedPortfolioGroups}
                                  />
                                  <PercentageLabel htmlFor="percentage">
                                    %
                                  </PercentageLabel>
                                </Percentage>
                                <Symbol>
                                  {securityBased ? (
                                    <>
                                      <span
                                        style={{
                                          fontWeight: 600,
                                          marginRight: '20px',
                                        }}
                                      >
                                        {
                                          props.values.targets[index].symbol
                                            ?.symbol
                                        }
                                      </span>
                                      {
                                        props.values.targets[index].symbol
                                          ?.description
                                      }
                                    </>
                                  ) : (
                                    <span
                                      style={{
                                        fontWeight: 600,
                                        marginRight: '20px',
                                      }}
                                    >
                                      {
                                        props.values.targets[index]
                                          .model_asset_class.name
                                      }
                                    </span>
                                  )}
                                </Symbol>

                                <br></br>
                              </FormContainer>
                              {!assignedPortfolioGroups && (
                                <button
                                  type="button"
                                  onClick={() => arrayHelpers.remove(index)}
                                  title="Delete security from model"
                                >
                                  <FontAwesomeIcon
                                    icon={faTimes}
                                    size="lg"
                                    color="var(--grey-darkest)"
                                  />
                                </button>
                              )}
                            </Grid>
                          );
                        },
                      )}
                      {!assignedPortfolioGroups && (
                        <Grid columns="1fr 50px" style={{ marginTop: '30px' }}>
                          <div>
                            <FormContainer>
                              <Percentage>
                                <PercentageInput
                                  id="percent"
                                  name="newTarget.percent"
                                  type="number"
                                  onChange={props.handleChange}
                                  value={props.values.newTarget.percent}
                                  required
                                />
                                <PercentageLabel htmlFor="percentage">
                                  %
                                </PercentageLabel>
                              </Percentage>
                              {securityBased ? (
                                <SymbolSelector
                                  name="newTarget.symbol"
                                  id="symbol"
                                  value={null}
                                  onSelect={(symbol) => {
                                    props.setFieldValue(
                                      `newTarget.symbol` as 'newTarget',
                                      symbol,
                                    );
                                  }}
                                  groupId={groupInfo ? groupInfo.groupId : ''}
                                  forModelSecurity={true}
                                />
                              ) : (
                                <AssetClassSelector
                                  name="newTarget.model_asset_class"
                                  id="symbol"
                                  availableAssetClasses={availableAssetClasses}
                                  onSelect={(symbol: any) => {
                                    props.setFieldValue(
                                      `newTarget.model_asset_class` as 'newTarget',
                                      symbol,
                                    );
                                  }}
                                />
                              )}
                            </FormContainer>
                            {props.errors.newTarget && (
                              <ErroMsg>{props.errors.newTarget}</ErroMsg>
                            )}
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              // if (props.values.newTarget.symbol === {}) {
                              //   console.log('Error');
                              // }
                              return arrayHelpers.push(props.values.newTarget);
                            }}
                            title="Add security to model"
                            // disabled={props.dirty}
                          >
                            <FontAwesomeIcon
                              icon={faPlusSquare}
                              color="var(--grey-darkest)"
                              size="lg"
                            />
                          </button>
                        </Grid>
                      )}
                    </>
                  );
                }}
              />
              <ButtonContainer>
                {!assignedPortfolioGroups && (
                  <Button
                    type="submit"
                    // onClick={() => {
                    //   modelPortfolio.model_portfolio
                    //     .total_assigned_portfolio_groups > 1
                    //     ? setShowDialog(true)
                    //     : props.handleSubmit();
                    // }}
                    disabled={
                      props.isSubmitting || !props.isValid || !props.dirty
                    }
                  >
                    Save Model
                  </Button>
                )}

                {/* <Dialog
                isOpen={showDialog}
                onDismiss={() => setShowDialog(false)}
                aria-labelledby="dialog1Title"
                aria-describedby="dialog1Desc"
              >
                {}
                <H2Margin>
                  This model is applied to{' '}
                  {
                    modelPortfolio.model_portfolio
                      .total_assigned_portfolio_groups
                  }{' '}
                  groups. Do you want to save as a new model or overwrite this
                  model ?
                </H2Margin>
                <ActionContainer>
                  <Button
                    onClick={() => {
                      setShowDialog(false);
                      props.handleSubmit();
                    }}
                  >
                    Overwrite Model
                  </Button>
                  <Button
                    onClick={() => {
                      setShowDialog(false);
                      setShowNameInput(true);
                    }}
                  >
                    Create New Model
                  </Button>
                </ActionContainer>
              </Dialog>
              <Dialog
                isOpen={showNameInput}
                onDismiss={() => setShowNameInput(false)}
                aria-labelledby="dialog1Title"
                aria-describedby="dialog1Desc"
              >
                <NewNameLabel htmlFor="newModelName">
                  The name of the new model:{' '}
                </NewNameLabel>
                <NewNameInput name="newModelName" id="newModelName" />
                <ActionContainer>
                  <Button
                    onClick={() => {
                      setShowNameInput(false);
                      setOverWriteModel(false);
                      props.handleSubmit();
                    }}
                  >
                    Done
                  </Button>
                </ActionContainer>
              </Dialog> */}
                {groupId && !props.dirty && !editMode && (
                  <ApplyModelBtn onClick={applyModel}>
                    Apply to {groupInfo?.name}
                  </ApplyModelBtn>
                )}
              </ButtonContainer>
            </Form>
          )}
        </Formik>
      </MainContainer>
    </Box>
  );
};

export default ModelPortoflioBox;
