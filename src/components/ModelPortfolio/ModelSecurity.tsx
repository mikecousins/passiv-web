import React, { useState, useEffect } from 'react';
import { ModelAssetClass } from '../../types/modelAssetClass';
import { selectCurrentModelPortfolioId } from '../../selectors/modelPortfolio';
import NameInputAndEdit from '../NameInputAndEdit';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEllipsisH,
  faEllipsisV,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { ModelPortfolioDetailsType } from '../../types/modelPortfolio';
import { postData } from '../../api';
import { useDispatch, useSelector } from 'react-redux';
import { loadModelPortfolio, loadModelPortfolios } from '../../actions';
import { Formik, Form } from 'formik';
import SymbolSelector from '../PortfolioGroupTargets/TargetBar/SymbolSelector';
import { ToggleShow } from '../../pages/GoalDetailPage';

const Box = styled.div`
  border: 1px solid #bfb6b6;
  margin-right: 50px;
  padding: 10px;
  margin-bottom: 20px;
  @media (max-width: 900px) {
    margin-right: 0;
  }
`;

const StyledContainer = styled.div`
  background: #fff;
  display: inline-block;
  position: relative;
  top: -24px;
  padding: 0 15px;
  margin-bottom: -7px;
`;

const FormContainer = styled.div`
  border-bottom: 1px solid var(--brand-blue);
  margin: 20px;
`;

const Percentage = styled.div`
  display: inline-block;
  @media (max-width: 740px) {
    margin-bottom: 10px;
  }
`;

const PercentageLabel = styled.label`
  color: var(--brand-blue);
  font-weight: 600;
  font-size: 26px;
  margin-right: 10px;
`;

const PercentageInput = styled.input`
  max-width: 70px;
  color: var(--brand-blue);
  font-weight: 600;
  font-size: 26px;
`;

const StyledName = styled.span`
  font-weight: 600;
  font-size: 30px;
`;

type Props = {
  assetClasses: ModelAssetClass[];
  modelPortfolio: ModelPortfolioDetailsType;
};

const ModelSecurity = ({ assetClasses, modelPortfolio }: Props) => {
  const dispatch = useDispatch();

  const modelPortfolioId = useSelector(selectCurrentModelPortfolioId);

  const [modelPortfolioName, setModelPortfolioName] = useState('');
  const [editName, setEditName] = useState(false);
  const [notAssetError, setNotAssetError] = useState(false);

  const getRemainingPercent = () => {
    const allocatedPercent = modelPortfolio.model_portfolio_security.reduce(
      (sum, sec) => {
        return sum + sec.percent;
      },
      0,
    );
    return 100 - allocatedPercent;
  };

  useEffect(() => {
    setModelPortfolioName(modelPortfolio.model_portfolio.name);
  }, [modelPortfolio]);

  // remove the error after 5 seconds
  useEffect(() => {
    setTimeout(() => setNotAssetError(false), 5000);
  }, [notAssetError]);

  const finishEditingName = () => {
    if (
      modelPortfolioName !== modelPortfolio.model_portfolio.name &&
      modelPortfolioName!.trim().length > 0
    ) {
      modelPortfolio.model_portfolio.name = modelPortfolioName;
      postData(`/api/v1/modelPortfolio/${modelPortfolioId}`, modelPortfolio)
        .then(() => {
          dispatch(loadModelPortfolio({ id: modelPortfolioId }));
          dispatch(loadModelPortfolios());
        })
        .catch(() => {
          // dispatch(loadModelPortfolio({ id: modelPortfolioId }));
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

  const handleDelete = (id: string) => {
    modelPortfolio.model_portfolio_security.forEach((sec, index) => {
      if (sec.symbol.id === id) {
        modelPortfolio.model_portfolio_security.splice(index, 1);
        postData(`/api/v1/modelPortfolio/${modelPortfolioId}`, modelPortfolio)
          .then(() => {
            dispatch(loadModelPortfolio({ id: modelPortfolioId }));
          })
          .catch(() => {
            dispatch(loadModelPortfolio({ id: modelPortfolioId }));
            toast.error('Deletion Failed', { autoClose: 3000 });
          });
      }
    });
  };

  return (
    <Box>
      <NameInputAndEdit
        value={modelPortfolioName}
        edit={editName}
        editBtnTxt={'Edit Name'}
        onChange={(e: any) => setModelPortfolioName(e.target.value)}
        onKeyPress={(e: any) => e.key === 'Enter' && finishEditingName()}
        onClickDone={() => finishEditingName()}
        onClickEdit={() => setEditName(true)}
        StyledName={StyledName}
        StyledContainer={StyledContainer}
      />
      <ul
        style={{
          margin: '40px 20px',
        }}
      >
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
            {getRemainingPercent()}% Cash
          </span>
        </li>
        {modelPortfolio.model_portfolio_security.map((sec) => {
          return (
            <li
              style={{
                borderLeft: '5px solid var(--brand-green)',
                lineHeight: '30px',
                padding: '10px',
                marginBottom: '20px',
              }}
              key={sec.symbol.id}
            >
              <span style={{ fontSize: '26px' }}>
                {sec.percent}% {sec.symbol.symbol}
              </span>
              <button
                onClick={() => handleDelete(sec.symbol.id)}
                style={{ marginLeft: '50px', position: 'relative' }}
              >
                <FontAwesomeIcon
                  icon={faTimesCircle}
                  size="sm"
                  style={{ position: 'relative' }}
                />
              </button>
            </li>
          );
        })}
      </ul>

      <FormContainer>
        <Formik
          initialValues={{
            securityId: '',
            percent: 0,
          }}
          initialStatus={{ submitted: false }}
          onSubmit={(values, actions) => {
            modelPortfolio.model_portfolio_security.push({
              symbol: {
                id: values.securityId!,
              },
              percent: values.percent,
            });
            postData(
              `/api/v1/modelPortfolio/${modelPortfolioId}`,
              modelPortfolio,
            )
              .then(() => {
                dispatch(loadModelPortfolio({ id: modelPortfolioId }));
                actions.resetForm();
              })
              .catch(() => {
                dispatch(loadModelPortfolio({ id: modelPortfolioId }));
                getRemainingPercent();
                setNotAssetError(true);
                actions.resetForm();
              });
            actions.setSubmitting(false);
            actions.setStatus({ submitted: true });
          }}
        >
          {(props) => (
            <Form onSubmit={props.handleSubmit}>
              <Percentage>
                <PercentageInput
                  id="percent"
                  name="percent"
                  type="number"
                  onChange={props.handleChange}
                  value={props.values.percent}
                  min="0"
                  max={getRemainingPercent()}
                  required
                />
                <PercentageLabel htmlFor="percentage">%</PercentageLabel>
              </Percentage>
              <SymbolSelector
                name="securityId"
                id="securityId"
                value={null}
                onSelect={props.handleChange}
                allSymbols={true}
                forModelSecurity={true}
              />
              <button type="submit" style={{ display: 'none' }}></button>
            </Form>
          )}
        </Formik>
      </FormContainer>
      {notAssetError && (
        <span style={{ color: 'red', padding: 'inherit' }}>
          Please select from the list of available asset classes and try again.
        </span>
      )}
    </Box>
  );
};

export default ModelSecurity;
