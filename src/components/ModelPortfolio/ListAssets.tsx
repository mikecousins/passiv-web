import React from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMinusCircle,
  faPlus,
  faPlusCircle,
  faTimes,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';
import {
  FormContainer,
  Percentage,
  PercentageInput,
  PercentageLabel,
} from './ModelPortfolioBox';
import SymbolSelector from '../PortfolioGroupTargets/TargetBar/SymbolSelector';
import AssetClassSelector from './AssetClassSelector';
import styled from '@emotion/styled';
import Grid from '../../styled/Grid';
import { Button, SmallButton } from '../../styled/Button';
import { Table } from '../../styled/GlobalElements';
import { TransparentButton } from '../../pages/MyModelPortfoliosPage';

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
  model: any;
  securityBased: Boolean;
};

const ListAssets = ({ model, securityBased }: Props) => {
  const handleDelete = (id: string) => {
    model.map((mdl: any, index: number) => {
      if (securityBased && mdl.symbol.id === id) {
        model.splice(index, 1);
        return;
      } else if (!securityBased && mdl.model_asset_class.id === id) {
        model.splice(index, 1);
        return;
      }
    });
  };
  return (
    <>
      <Formik
        initialValues={{
          targets: model,
          newTarget: {
            percent: 0,
            symbol: {},
          },
        }}
        initialStatus={{ submitted: false }}
        onSubmit={(values, actions) => {
          // if (securityBased) {
          //   modelPortfolio.model_portfolio_security.push({
          //     symbol: {
          //       id: values.assetId!,
          //     },
          //     percent: values.percent.toFixed(3),
          //   });
          // } else {
          //   modelPortfolio.model_portfolio_asset_class.push({
          //     model_asset_class: {
          //       id: values.assetId!,
          //     },
          //     percent: values.percent.toFixed(3),
          //   });
          // }
          // postData(
          //   `/api/v1/modelPortfolio/${modelPortfolio.model_portfolio.id}`,
          //   modelPortfolio,
          // )
          //   .then(() => {
          //     dispatch(loadModelPortfolios());
          //     actions.resetForm();
          //   })
          //   .catch(() => {
          //     dispatch(loadModelPortfolios());
          //     getRemainingPercent();
          //     setNotAssetError(true);
          //     actions.resetForm();
          //   });
          // actions.setSubmitting(false);
          // actions.setStatus({ submitted: true });
          console.log('submitted values', values);
        }}
      >
        {(props) => (
          <Form onSubmit={props.handleSubmit}>
            <FieldArray
              name="targets"
              render={(arrayHelpers) => (
                <>
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
                        >
                          <FontAwesomeIcon icon={faTimes} size="lg" />
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
                      onClick={() => arrayHelpers.push(props.values.newTarget)}
                    >
                      <FontAwesomeIcon
                        icon={faPlus}
                        color="var(--brand-blue)"
                        size="lg"
                      />
                    </button>
                  </Grid>

                  <br />
                </>
              )}
            />
            <ButtonContainer>
              <Button type="submit">Save Model</Button>
              <ApplyModelBtn>Apply to Retirement Plan</ApplyModelBtn>
            </ButtonContainer>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ListAssets;
