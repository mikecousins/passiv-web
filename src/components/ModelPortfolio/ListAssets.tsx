import React from 'react';
import { Formik, Form, FieldArray, ErrorMessage } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare, faTimes } from '@fortawesome/free-solid-svg-icons';
import SymbolSelector from '../PortfolioGroupTargets/TargetBar/SymbolSelector';
import AssetClassSelector from './AssetClassSelector';
import styled from '@emotion/styled';
import Grid from '../../styled/Grid';
import { Button } from '../../styled/Button';
import { postData } from '../../api';
import { loadModelPortfolios } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { selectGroupIdForModelPortfolio } from '../../selectors/modelPortfolios';

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

type Props = {
  modelPortfolio: any;
  securityBased: Boolean;
};

const ListAssets = ({ modelPortfolio, securityBased }: Props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  let model: any[] = modelPortfolio.model_portfolio_asset_class;
  const groupId = useSelector(selectGroupIdForModelPortfolio);

  if (securityBased) {
    model = modelPortfolio.model_portfolio_security;
  }

  return (
    <MainContainer>
      <Formik
        initialValues={{
          targets: model,
          newTarget: {
            percent: 0,
            symbol: {},
          },
        }}
        enableReinitialize
        initialStatus={{ submitted: false }}
        // validate={(values) => {
        //   const errors: any = {};
        //   const cashPercentage =
        //     100 -
        //     values.targets.reduce((total: number, target: any) => {
        //       if (!target.deleted && target.percent) {
        //         return total + parseFloat(target.percent);
        //       }
        //       return total;
        //     }, 0);
        //   const roundedCashPercentage =
        //     Math.round(cashPercentage * 1000) / 1000;
        //   if (roundedCashPercentage < 0) {
        //     errors.cash = 'Too low';
        //   }
        //   return errors;
        // }}
        onSubmit={(values, actions) => {
          if (securityBased) {
            modelPortfolio.model_portfolio_security = values.targets;
          } else {
            modelPortfolio.model_portfolio_asset_class = values.targets;
          }
          const modelId = modelPortfolio.model_portfolio.id;
          postData(`/api/v1/modelPortfolio/${modelId}`, modelPortfolio)
            .then(() => {
              dispatch(loadModelPortfolios());
              actions.resetForm();
              history.push(
                `/app/model-setting/group/${
                  groupId && groupId
                }/model/${modelId}`,
              );
            })
            .catch(() => {
              dispatch(loadModelPortfolios());
            });
          actions.setSubmitting(false);
          actions.setStatus({ submitted: true });
        }}
      >
        {(props) => (
          <Form onSubmit={props.handleSubmit}>
            <FieldArray
              name="targets"
              render={(arrayHelpers) => {
                // calculate the desired cash percentage
                const cashPercentage =
                  100 -
                  props.values.targets.reduce((total: number, target: any) => {
                    if (!target.deleted && target.percent) {
                      return total + parseFloat(target.percent);
                    }
                    return total;
                  }, 0);

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
                    {props.values.targets.map((target: any, index: number) => {
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
                              />
                              <PercentageLabel htmlFor="percentage">
                                %
                              </PercentageLabel>
                            </Percentage>
                            <Symbol>
                              <span
                                style={{ fontWeight: 600, marginRight: '20px' }}
                              >
                                {props.values.targets[index].symbol?.symbol}
                              </span>
                              {props.values.targets[index].symbol?.description}
                            </Symbol>

                            <br></br>
                          </FormContainer>
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
                        </Grid>
                      );
                    })}
                    <Grid columns="1fr 50px" style={{ marginTop: '30px' }}>
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
                          allSymbols={true}
                          forModelSecurity={true}
                        />
                      </FormContainer>
                      <button
                        type="button"
                        onClick={() =>
                          arrayHelpers.push(props.values.newTarget)
                        }
                        title="Add security to model"
                      >
                        <FontAwesomeIcon
                          icon={faPlusSquare}
                          color="var(--grey-darkest)"
                          size="lg"
                        />
                      </button>
                    </Grid>

                    <br />
                    <ErrorMessage name="targets" component="div" />
                  </>
                );
              }}
            />
            <ButtonContainer>
              <Button
                type="submit"
                disabled={props.isSubmitting || !props.isValid || !props.dirty}
              >
                Save Model
              </Button>
              {/* <ApplyModelBtn>Apply to Retirement Plan</ApplyModelBtn> */}
            </ButtonContainer>
          </Form>
        )}
      </Formik>
    </MainContainer>
  );
};

export default ListAssets;
