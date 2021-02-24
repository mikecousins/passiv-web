import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postData } from '../../api';
import styled from '@emotion/styled';
import { toast } from 'react-toastify';
import { loadGroups, loadModelPortfolios } from '../../actions';
import { ModelPortfolioDetailsType } from '../../types/modelPortfolio';
import NameInputAndEdit from '../NameInputAndEdit';
import { ModelAssetClass } from '../../types/modelAssetClass';
import { useHistory } from 'react-router';
import { selectGroupInfoForModelPortfolio } from '../../selectors/modelPortfolios';
import { FieldArray, Form, Formik } from 'formik';
import Grid from '../../styled/Grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare, faTimes } from '@fortawesome/free-solid-svg-icons';
import SymbolSelector from '../PortfolioGroupTargets/TargetBar/SymbolSelector';
import { Button } from '../../styled/Button';
import AssetClassSelector from './AssetClassSelector';
import { P } from '../../styled/GlobalElements';

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

const Cash = styled.div`
  border-left: 5px solid var(--brand-green);
  line-height: 30px;
  padding: 10px;
  margin-bottom: 20px;
`;

const CashPercentage = styled.div`
  font-size: 26px;
  font-weight: 900;
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

const ErroMsg = styled(P)`
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

const AddButton = styled.button`
  :disabled {
    display: none;
  }
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

  let model: any = modelPortfolio.model_portfolio_asset_class;
  if (securityBased) {
    model = modelPortfolio.model_portfolio_security;
  }

  const modelId = modelPortfolio.model_portfolio.id;
  const assignedPortfolioGroups =
    modelPortfolio.model_portfolio.total_assigned_portfolio_groups;

  const group = useSelector(selectGroupInfoForModelPortfolio);
  const groupInfo = group.groupInfo;
  const groupId = groupInfo?.groupId;
  const editMode = group.edit;

  const canEdit =
    (assignedPortfolioGroups <= 1 && editMode) ||
    (assignedPortfolioGroups === 0 && !editMode);

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
        dispatch(loadGroups()); // need to load all groups to have an updated list of groups using a model in my models page
        dispatch(loadModelPortfolios());
        if (editMode) {
          toast.success(
            `Changes are saved for "${modelPortfolio.model_portfolio.name}"`,
          );
        } else {
          toast.success(
            `"${modelPortfolio.model_portfolio.name}" applied to "${groupInfo?.name}"`,
          );
        }
        history.push(`/app/group/${groupId}`);
      })
      .catch((err) => {
        if (err.response) {
          toast.error(err.response.data.detail);
        } else {
          toast.error('Cannot apply model');
        }
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
            cash: 0,
          }}
          enableReinitialize
          initialStatus={{ submitted: false }}
          validate={(values) => {
            const errors: any = {};

            const targets = [...values.targets, values.newTarget];
            const total = targets.reduce((sum: string, target: any) => {
              if (target.percent) {
                return (+sum + +target.percent).toFixed(3);
              }
              return sum;
            }, '0');

            const cashPercentage = (100 - +total).toFixed(3);
            const roundedCashPercentage =
              Math.round(+cashPercentage * 1000) / 1000;
            if (roundedCashPercentage < -0) {
              errors.cash = 'The cash percentage should be between 0 and 100';
            }

            if (
              values.newTarget.percent < 0 ||
              values.newTarget.percent > 100
            ) {
              errors.newTarget = 'Percentage should be between 0 and 100';
            } else if (typeof values.newTarget.percent === 'string') {
              errors.newTarget = 'Percentage should be a number';
            }
            return errors;
          }}
          onSubmit={(values, actions) => {
            if (securityBased) {
              modelPortfolio.model_portfolio_security = values.targets;
            } else {
              modelPortfolio.model_portfolio_asset_class = values.targets;
            }
            postData(`/api/v1/modelPortfolio/${modelId}`, modelPortfolio)
              .then(() => {
                dispatch(loadModelPortfolios());
                if (groupId && editMode) {
                  applyModel();
                }
              })
              .catch((err) => {
                dispatch(loadModelPortfolios());
                if (err.response) {
                  toast.error(err.response.data.detail);
                }
              });
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
                  const targets = [
                    ...props.values.targets,
                    props.values.newTarget,
                  ];
                  const total = targets.reduce((sum: string, target: any) => {
                    if (target.percent) {
                      return (+sum + +target.percent).toFixed(3);
                    }
                    return sum;
                  }, '0');

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
                  const handleKeyPress = (event: any) => {
                    if (
                      event.key === 'Enter' &&
                      ((props.isValid &&
                        securityBased &&
                        Object.entries(props.values.newTarget.symbol).length !==
                          0) ||
                        (!securityBased &&
                          Object.entries(
                            props.values.newTarget.model_asset_class,
                          ).length !== 0))
                    ) {
                      arrayHelpers.push(props.values.newTarget);
                      props.setFieldValue('newTarget.symbol', {});
                    }
                  };
                  return (
                    <>
                      <div>
                        {props.errors.cash && (
                          <ErroMsg>{props.errors.cash}</ErroMsg>
                        )}
                        <Cash key="cash">
                          <CashPercentage>
                            {cashPercentage}% Cash
                          </CashPercentage>
                        </Cash>
                      </div>
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
                                    readOnly={!canEdit}
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
                              {canEdit && (
                                <button
                                  type="button"
                                  onClick={() => arrayHelpers.remove(index)}
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
                      {canEdit && (
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
                                  onKeyPress={(e: any) => handleKeyPress(e)}
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
                                      'newTarget.symbol',
                                      symbol,
                                    );
                                  }}
                                  onKeyPress={(e: any) => handleKeyPress(e)}
                                  groupId={groupId ? groupId : ''}
                                  forModelSecurity={true}
                                />
                              ) : (
                                <AssetClassSelector
                                  name="newTarget.model_asset_class"
                                  id="symbol"
                                  availableAssetClasses={availableAssetClasses}
                                  onSelect={(symbol: any) => {
                                    props.setFieldValue(
                                      'newTarget.model_asset_class',
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
                          <AddButton
                            type="button"
                            onClick={() => {
                              arrayHelpers.push(props.values.newTarget);
                              props.setFieldValue('newTarget.symbol', {});
                            }}
                            disabled={
                              !props.isValid ||
                              (securityBased &&
                                Object.entries(props.values.newTarget.symbol)
                                  .length === 0) ||
                              (!securityBased &&
                                Object.entries(
                                  props.values.newTarget.model_asset_class,
                                ).length === 0)
                            }
                          >
                            <FontAwesomeIcon
                              icon={faPlusSquare}
                              color="var(--grey-darkest)"
                              size="lg"
                            />
                          </AddButton>
                        </Grid>
                      )}
                    </>
                  );
                }}
              />
              <ButtonContainer>
                {props.dirty && props.isValid && (
                  <Button
                    type="button"
                    onClick={() => {
                      props.handleSubmit();
                    }}
                  >
                    Save Model
                  </Button>
                )}
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
