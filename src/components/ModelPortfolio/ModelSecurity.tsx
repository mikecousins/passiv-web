import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLink,
  faPen,
  faTimesCircle,
  faToggleOff,
  faToggleOn,
} from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { ModelPortfolioDetailsType } from '../../types/modelPortfolio';
import { postData } from '../../api';
import { useDispatch } from 'react-redux';
import { loadModelPortfolios } from '../../actions';
import { Formik, Form } from 'formik';
import SymbolSelector from '../PortfolioGroupTargets/TargetBar/SymbolSelector';
import DropDownOptions from '../DropDownOptions';
import { ToggleButton } from '../../styled/ToggleButton';

const Box = styled.div`
  border: 1px solid #bfb6b6;
  margin-right: 50px;
  padding: 10px;
  margin-bottom: 20px;
  @media (max-width: 900px) {
    margin-right: 0;
  }
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

const MarginedFontAwesomeIcon = styled(FontAwesomeIcon)`
  margin-right: 10px;
`;

const ToggleShareButton = styled(ToggleButton)`
  font-size: inherit;
  margin-top: 10px;
`;

type Props = {
  modelPortfolio: ModelPortfolioDetailsType;
};

const ModelSecurity = ({ modelPortfolio }: Props) => {
  const dispatch = useDispatch();

  const [modelPortfolioName, setModelPortfolioName] = useState(
    modelPortfolio.model_portfolio.name,
  );
  const [editName, setEditName] = useState(false);
  const [notAssetError, setNotAssetError] = useState(false);
  const [shareModel, setShareModel] = useState(
    modelPortfolio.model_portfolio.share_portfolio,
  );

  const getRemainingPercent = () => {
    const allocatedPercent = modelPortfolio.model_portfolio_security.reduce(
      (sum, sec) => {
        return (+sum + +sec.percent).toFixed(3);
      },
      '0',
    );

    return (100 - +allocatedPercent).toFixed(3);
  };

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

  const handleDelete = (id: string) => {
    modelPortfolio.model_portfolio_security.forEach((sec, index) => {
      if (sec.symbol.id === id) {
        modelPortfolio.model_portfolio_security.splice(index, 1);
        postData(
          `/api/v1/modelPortfolio/${modelPortfolio.model_portfolio.id}`,
          modelPortfolio,
        )
          .then(() => {
            dispatch(loadModelPortfolios());
          })
          .catch(() => {
            dispatch(loadModelPortfolios());
            toast.error('Deletion Failed', { autoClose: 3000 });
          });
      }
    });
  };

  const handleToggleBtn = () => {
    modelPortfolio.model_portfolio.share_portfolio = !shareModel;
    postData(
      `/api/v1/modelPortfolio/${modelPortfolio.model_portfolio.id}`,
      modelPortfolio,
    )
      .then(() => {
        setShareModel(!shareModel);
        dispatch(loadModelPortfolios());
      })
      .catch(() => {
        dispatch(loadModelPortfolios());
        toast.error('Change Share Model Failed', { autoClose: 3000 });
      });
  };

  return (
    <Box>
      <DropDownOptions
        value={modelPortfolioName}
        edit={editName}
        onChange={(e: any) => setModelPortfolioName(e.target.value)}
        onKeyPress={(e: any) => e.key === 'Enter' && finishEditingName()}
        StyledName={StyledName}
      >
        {!editName ? (
          <button onClick={() => setEditName(true)}>
            <MarginedFontAwesomeIcon icon={faPen} />
            Edit Name
          </button>
        ) : (
          <button onClick={() => setEditName(false)}>
            <MarginedFontAwesomeIcon icon={faPen} />
            Finish Editing
          </button>
        )}
        <br />
        <ToggleShareButton onClick={handleToggleBtn}>
          {shareModel ? (
            <React.Fragment>
              <MarginedFontAwesomeIcon icon={faToggleOn} />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <MarginedFontAwesomeIcon icon={faToggleOff} />
            </React.Fragment>
          )}
          Share Model Portfolio
        </ToggleShareButton>
        <br />
        {shareModel && (
          <p style={{ marginTop: '10px' }}>
            <MarginedFontAwesomeIcon icon={faLink} /> Share Model Link: {}{' '}
          </p>
        )}
      </DropDownOptions>
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
              percent: values.percent.toFixed(3),
            });
            postData(
              `/api/v1/modelPortfolio/${modelPortfolio.model_portfolio.id}`,
              modelPortfolio,
            )
              .then(() => {
                dispatch(loadModelPortfolios());
                actions.resetForm();
              })
              .catch(() => {
                dispatch(loadModelPortfolios());
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
                  // min={0}
                  // max={+getRemainingPercent()}
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
