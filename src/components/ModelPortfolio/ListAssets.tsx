import React from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import {
  FormContainer,
  Percentage,
  PercentageInput,
  PercentageLabel,
} from './ModelPortfolioBox';
import SymbolSelector from '../PortfolioGroupTargets/TargetBar/SymbolSelector';
import AssetClassSelector from './AssetClassSelector';

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
            symbol: {
              description: '',
            },
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
                      <FormContainer>
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
                        {props.values.targets[index].symbol?.description}
                        <br></br>
                      </FormContainer>
                    );
                  })}
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
                        icon={faPlusCircle}
                        color="var(--brand-blue)"
                      />
                    </button>
                  </div>

                  <br />
                </>
              )}
            />
            <button type="submit">Save Model</button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ListAssets;
