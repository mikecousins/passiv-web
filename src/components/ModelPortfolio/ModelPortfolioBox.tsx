import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ModelAssetClass } from '../../types/modelAssetClass';
import NameInputAndEdit from '../NameInputAndEdit';
import AssetClassSelector from './AssetClassSelector';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClipboard,
  faClipboardCheck,
  faEllipsisV,
  faExchangeAlt,
  faLink,
  faTimesCircle,
  faToggleOff,
  faToggleOn,
} from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import {
  ModelAssetClassWithPercentage,
  ModelPortfolioDetailsType,
  TargetWithPercentage,
} from '../../types/modelPortfolio';
import { postData } from '../../api';
import { loadModelPortfolios } from '../../actions';
import { Formik, Form } from 'formik';
import SymbolSelector from '../PortfolioGroupTargets/TargetBar/SymbolSelector';
import { ToggleButton } from '../../styled/ToggleButton';
import Grid from '../../styled/Grid';
import { ToggleShow } from '../../pages/GoalDetailPage';
import { SmallButton } from '../../styled/Button';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { selectReferralCode } from '../../selectors/referrals';
import ListAssets from './ListAssets';

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

const ToggleShareButton = styled(ToggleButton)`
  font-size: inherit;
  margin-top: 10px;
`;
const MarginedFontAwesomeIcon = styled(FontAwesomeIcon)`
  margin-right: 15px;
`;

const KebabMenu = styled(ToggleShow)`
  padding: 10px;
  border: none;
  position: relative;
  top: -5px;
`;
const OptionsMenu = styled.div`
  border: 1px solid var(--brand-blue);
  width: 40%;
  margin-top: 5px;
  padding: 22px 20px 24px;
  background: #def2ff;
  border-radius: 4px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
  font-size: 18px;
  @media (max-width: 900px) {
    top: 112%;
  }
`;

const ChangeModelTypeBtn = styled(SmallButton)`
  background-color: transparent;
  color: black;
  :disabled {
    cursor: not-allowed;
  }
`;

type Props = {
  assetClasses: ModelAssetClass[];
  modelPortfolio: ModelPortfolioDetailsType;
  sharedModel: boolean;
};

const ModelPortoflioBox = ({
  assetClasses,
  modelPortfolio,
  sharedModel,
}: Props) => {
  const dispatch = useDispatch();
  const referralCode = useSelector(selectReferralCode);
  const [modelPortfolioName, setModelPortfolioName] = useState(
    modelPortfolio.model_portfolio.name,
  );
  const [securityBased, setSecurityBased] = useState(
    modelPortfolio.model_portfolio.model_type === 0,
  );
  const [share, setShare] = useState(
    modelPortfolio.model_portfolio.share_portfolio,
  );
  const [editName, setEditName] = useState(false);
  const [notAssetError, setNotAssetError] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [copied, setCopied] = useState(false);
  const SHARE_URL = `https://passiv.com/app/model-portfolio/${modelPortfolio.model_portfolio.id}/share/${referralCode}`;

  let model: any[] = modelPortfolio.model_portfolio_asset_class;
  if (securityBased) {
    model = modelPortfolio.model_portfolio_security;
  }
  const nameChanged =
    modelPortfolio.model_portfolio.name.trim() !== modelPortfolioName.trim();

  console.log('name changed?', nameChanged);

  const getAvailableAssetClasses = () => {
    const usedAssetClasses = model.map((astCls) => {
      return astCls.model_asset_class.id;
    });
    // filter out the asset classes that have been already added to the model portfolio from the available asset classes
    const assetClassesAvailable = assetClasses.filter(
      (ast) => !usedAssetClasses.includes(ast.id),
    );

    return assetClassesAvailable;
  };

  const getRemainingPercent = () => {
    //@ts-ignore
    const allocatedPercent = model.reduce((sum: number, asset: any) => {
      return (+sum + +asset.percent).toFixed(3);
    }, '0');
    return (100 - +allocatedPercent).toFixed(3);
  };

  // remove the error after 5 seconds
  useEffect(() => {
    setTimeout(() => setNotAssetError(false), 5000);
  }, [notAssetError]);

  const changeModel = () => {
    console.log(modelPortfolio);
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
  };
  const finishEditingName = () => {
    if (
      modelPortfolioName !== modelPortfolio.model_portfolio.name &&
      modelPortfolioName!.trim().length > 0
    ) {
      modelPortfolio.model_portfolio.name = modelPortfolioName;
      changeModel();
    } else {
      setModelPortfolioName(modelPortfolio.model_portfolio.name);
    }
    setEditName(false);
  };

  const handleDelete = (id: string) => {
    model.map((mdl: any, index: number) => {
      if (securityBased && mdl.symbol.id === id) {
        modelPortfolio.model_portfolio_security.splice(index, 1);
        return;
      } else if (!securityBased && mdl.model_asset_class.id === id) {
        modelPortfolio.model_portfolio_asset_class.splice(index, 1);
        return;
      }
    });
    changeModel();
  };

  const handleToggleBtn = () => {
    modelPortfolio.model_portfolio.share_portfolio = !share;
    postData(
      `/api/v1/modelPortfolio/${modelPortfolio.model_portfolio.id}`,
      modelPortfolio,
    )
      .then(() => {
        setShare(!share);
        dispatch(loadModelPortfolios());
      })
      .catch(() => {
        dispatch(loadModelPortfolios());
        toast.error('Change Share Model Failed', { autoClose: 3000 });
      });
  };

  const handleChangeModel = () => {
    if (securityBased) {
      modelPortfolio.model_portfolio.model_type = 1;
    } else {
      modelPortfolio.model_portfolio.model_type = 0;
    }
    postData(
      `/api/v1/modelPortfolio/${modelPortfolio!?.model_portfolio.id}`,
      modelPortfolio,
    )
      .then(() => {
        dispatch(loadModelPortfolios());
      })
      .catch(() => {
        toast.error('Unable to change the model', {
          autoClose: 3000,
        });
      });
  };

  return (
    <Box>
      <Grid columns={sharedModel ? '1fr' : '10px 1fr'}>
        {!sharedModel && (
          <div>
            <KebabMenu onClick={() => setShowOptions(!showOptions)}>
              <FontAwesomeIcon icon={faEllipsisV} />
            </KebabMenu>
          </div>
        )}
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
        />
      </Grid>
      <div>
        {showOptions && (
          <OptionsMenu>
            {securityBased && (
              <>
                {' '}
                <ToggleShareButton onClick={handleToggleBtn}>
                  {share ? (
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
                {share && (
                  <div
                    style={{
                      marginTop: '10px',
                      marginLeft: '5px',
                    }}
                  >
                    <CopyToClipboard
                      text={SHARE_URL}
                      onCopy={() => {
                        setCopied(true);
                      }}
                    >
                      {copied ? (
                        <MarginedFontAwesomeIcon icon={faClipboardCheck} />
                      ) : (
                        <MarginedFontAwesomeIcon icon={faClipboard} />
                      )}
                    </CopyToClipboard>{' '}
                    Copy link to share model
                    {/* ^v1/modelPortfolio/%(uuid_pk)s/share/%(referral_code)s/?$ */}
                  </div>
                )}
                <br />
              </>
            )}
            <ChangeModelTypeBtn
              onClick={handleChangeModel}
              disabled={model.length > 0}
            >
              <MarginedFontAwesomeIcon icon={faExchangeAlt} />
              {securityBased ? 'Use Asset Classes' : 'Use Securities'}
            </ChangeModelTypeBtn>
          </OptionsMenu>
        )}
      </div>
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
        <ListAssets model={model} securityBased={securityBased} />
      </ul>
      {!sharedModel && (
        <FormContainer>
          <Formik
            initialValues={{
              assetId: '',
              percent: 0,
            }}
            initialStatus={{ submitted: false }}
            onSubmit={(values, actions) => {
              if (securityBased) {
                modelPortfolio.model_portfolio_security.push({
                  symbol: {
                    id: values.assetId!,
                  },
                  percent: values.percent.toFixed(3),
                });
              } else {
                modelPortfolio.model_portfolio_asset_class.push({
                  model_asset_class: {
                    id: values.assetId!,
                  },
                  percent: values.percent.toFixed(3),
                });
              }
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
                    required
                  />
                  <PercentageLabel htmlFor="percentage">%</PercentageLabel>
                </Percentage>
                {securityBased ? (
                  <SymbolSelector
                    name="assetId"
                    id="assetId"
                    value={null}
                    onSelect={props.handleChange}
                    allSymbols={true}
                    forModelSecurity={true}
                  />
                ) : (
                  <AssetClassSelector
                    name="assetId"
                    id="assetId"
                    assetClassesAvailable={getAvailableAssetClasses()}
                    onSelect={props.handleChange}
                  />
                )}
                <button type="submit" style={{ display: 'none' }}></button>
              </Form>
            )}
          </Formik>
        </FormContainer>
      )}

      {notAssetError && (
        <span style={{ color: 'red', padding: 'inherit' }}>
          Please select from the list of available asset classes and try again.
        </span>
      )}
    </Box>
  );
};

export default ModelPortoflioBox;
