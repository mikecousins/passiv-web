import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { deleteData, postData } from '../../api';
import {
  ModelAssetClassDetailsType,
  ModelAssetClass,
} from '../../types/modelAssetClass';
import { selectReferralCode } from '../../selectors/referrals';
import { selectModelAssetClasses } from '../../selectors/modelAssetClasses';
import {
  selectCurrentModelPortfolio,
  selectGroupInfoForModelPortfolio,
  selectGroupsUsingAModel,
} from '../../selectors/modelPortfolios';
import { loadGroups, loadModelPortfolios } from '../../actions';
import ModelPortoflioBox from './ModelPortfolioBox';
import AssetClassesBox from './AssetClassesBox';
import {
  faAngleLeft,
  faClipboard,
  faClipboardCheck,
  faExclamationCircle,
  faExclamationTriangle,
  faInfoCircle,
  faSpinner,
  faStopwatch,
  faToggleOff,
  faToggleOn,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import ShadowBox from '../../styled/ShadowBox';
import Grid from '../../styled/Grid';
import { H3 } from '../../styled/GlobalElements';
import { StateText, ToggleButton } from '../../styled/ToggleButton';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import {
  InputBox,
  ReadOnlyInput,
  IconBox,
} from '../SettingsManager/APIAccessSettings';
import Dialog from '@reach/dialog';
import {
  ActionContainer,
  H2Margin,
  DeleteBtn,
} from '../ModelAssetClass/AssetClass';
import { Button } from '../../styled/Button';
import Tooltip from '../Tooltip';
import { selectAssetClassFeature } from '../../selectors/features';

export const BackButton = styled.div`
  padding: 30px 10px;
  margin-bottom: 20px;
  display: block;
  a {
    font-size: 20px;
    font-weight: 900;
    line-height: 0.95;
    color: #033ebc;
    display: block;
    text-decoration: none;
    letter-spacing: 0.05rem;
  }
  @media (max-width: 900px) {
    margin-bottom: 50px;
    padding: 16px 20px 20px;
    text-align: center;
    width: 100%;
    border: 1px solid var(--brand-blue);
    display: inline-block;
    a {
      font-size: 18px;
    }
  }
`;

const ToggleBtn = styled(FontAwesomeIcon)`
  color: var(--brand-blue);
  font-size: 30px;
`;

export const ResponsiveGrid = styled(Grid)`
  @media (max-width: 900px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const ToggleModelTypeBtn = styled(ToggleButton)`
  margin: 5px 0;
  :disabled {
    svg {
      color: grey;
      cursor: not-allowed;
    }
  }
`;

const Text = styled(StateText)`
  padding: 0;
  font-size: 20px;
  font-weight: 400;
`;

const ToggleShareBtn = styled(ToggleButton)`
  margin-top: 10px;
  svg {
    color: var(--brand-blue);
  }
`;

const DeleteContainer = styled.div`
  float: right;
  font-size: 18px;
`;

const DeleteModelExplanation = styled.div`
  font-size: 1.2rem;
  text-align: center;
  ul {
    margin-top: 20px;
    li {
      margin-bottom: 10px;
    }
  }
`;

const SetShareModelContainer = styled.div`
  padding: 0px 20px 15px;
  border-radius: 0 0 4px 4px;
  margin-top: 10px;
`;

const ShareLinkContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  margin-left: 5px;
`;

const ComingSoonTag = styled.div`
  font-weight: 900;
  font-size: 30px;
  color: rgb(4 163 134);
  vertical-align: top;
  background: #dbfcf6;
  padding: 22px 0 0 18px;
  border-radius: 4px 4px 0 0;
  svg {
    vertical-align: top;
  }
`;
type ModelTypeProps = {
  assetClassFeature: boolean;
};
const ModelType = styled.div<ModelTypeProps>`
  background: ${(props) => !props.assetClassFeature && '#dbfcf6'};
  padding: 18px 20px 16px 20px;
  border-radius: 0 0 4px 4px;
  button:disabled svg,
  button,
  h3 {
    color: ${(props) => !props.assetClassFeature && '#07a485'};
  }
`;

const ModelPortfolio = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  let currentModelPortfolio: any = useSelector(selectCurrentModelPortfolio);

  const modelId = currentModelPortfolio!?.model_portfolio.id;

  const modelAssetClasses: ModelAssetClassDetailsType[] = useSelector(
    selectModelAssetClasses,
  );

  const assetClasses: ModelAssetClass[] = modelAssetClasses.map((obj) => {
    return obj.model_asset_class;
  });

  const group = useSelector(selectGroupInfoForModelPortfolio);

  const groupInfo = group.groupInfo;
  const editMode = group.edit;
  const applyMode = group.apply;

  const groupsUsingModel = useSelector(selectGroupsUsingAModel)?.[
    currentModelPortfolio?.model_portfolio?.id
  ]?.groups;

  const [share, setShare] = useState(
    currentModelPortfolio?.model_portfolio.share_portfolio,
  );
  const [securityBased, setSecurityBased] = useState(
    currentModelPortfolio !== null
      ? currentModelPortfolio?.model_portfolio.model_type === 0
      : true,
  );

  const [deleteDialog, setDeleteDialog] = useState(false);

  const [copied, setCopied] = useState(false);
  const referralCode = useSelector(selectReferralCode);

  const assetClassFeature = useSelector(selectAssetClassFeature);

  const [modelTypeChanged, setModelTypeChanged] = useState(false);

  const SHARE_URL = `https://passiv.com/app/shared-model-portfolio/${modelId}?share=${referralCode}`;

  let haveAssetsInModel = false;
  if (
    securityBased &&
    currentModelPortfolio!?.model_portfolio_security.length > 0
  ) {
    haveAssetsInModel = true;
  } else if (
    !securityBased &&
    currentModelPortfolio!?.model_portfolio_asset_class.length > 0
  ) {
    haveAssetsInModel = true;
  }

  const handleDeleteModel = () => {
    deleteData(`/api/v1/modelPortfolio/${modelId}`).then(() => {
      dispatch(loadModelPortfolios());
      dispatch(loadGroups());
      history.replace('/app/models');
    });
  };

  const handleChangeModelType = () => {
    if (currentModelPortfolio) {
      if (securityBased) {
        currentModelPortfolio.model_portfolio.model_type = 1;
      } else {
        currentModelPortfolio.model_portfolio.model_type = 0;
      }
    }
    postData(`/api/v1/modelPortfolio/${modelId}`, currentModelPortfolio)
      .then(() => {
        setSecurityBased(!securityBased);
        toast.success('Model type changed successfully', {
          autoClose: 3000,
        });
        dispatch(loadModelPortfolios());
      })
      .catch(() => {
        toast.error('Unable to change the model type', {
          autoClose: 3000,
        });
      });
  };

  const handleToggleShareBtn = () => {
    if (currentModelPortfolio !== null) {
      currentModelPortfolio.model_portfolio.share_portfolio = !share;
    }
    postData(`/api/v1/modelPortfolio/${modelId}`, currentModelPortfolio!)
      .then(() => {
        setShare(!share);
        dispatch(loadModelPortfolios());
      })
      .catch(() => {
        dispatch(loadModelPortfolios());
        toast.error('Change Share Model Failed', { autoClose: 3000 });
      });
  };

  return (
    <>
      {currentModelPortfolio === null ? (
        <FontAwesomeIcon icon={faSpinner} spin />
      ) : (
        currentModelPortfolio && (
          <>
            <ShadowBox>
              <BackButton>
                <Link
                  to={
                    groupInfo
                      ? `/app/group/${groupInfo.groupId}`
                      : '/app/models'
                  }
                >
                  <FontAwesomeIcon icon={faAngleLeft} size="lg" /> Back to{' '}
                  {groupInfo ? groupInfo.name : 'My Models'}
                </Link>
              </BackButton>

              <ResponsiveGrid columns="4fr 2fr">
                <ModelPortoflioBox
                  modelPortfolio={currentModelPortfolio}
                  assetClasses={assetClasses}
                  securityBased={securityBased}
                  modelTypeChanged={modelTypeChanged}
                />
                <div>
                  {!assetClassFeature && (
                    <ComingSoonTag>
                      <FontAwesomeIcon icon={faStopwatch} size="sm" /> Coming
                      Soon ...
                    </ComingSoonTag>
                  )}

                  <ModelType assetClassFeature={assetClassFeature}>
                    <H3>
                      Model Type{' '}
                      {haveAssetsInModel && assetClassFeature && (
                        <Tooltip label="This setting is disabled if you already have securities in this model.">
                          <FontAwesomeIcon
                            icon={faExclamationCircle}
                            size="sm"
                          />
                        </Tooltip>
                      )}
                    </H3>
                    <ToggleModelTypeBtn
                      onClick={() => {
                        if (editMode || applyMode) {
                          setModelTypeChanged(true);
                        } else {
                          handleChangeModelType();
                        }
                      }}
                      disabled={haveAssetsInModel || !assetClassFeature}
                    >
                      {
                        <React.Fragment>
                          <Text>Security</Text>
                          <ToggleBtn
                            icon={securityBased ? faToggleOff : faToggleOn}
                            style={{ margin: '0 10px' }}
                          />
                          <Text>Asset Class</Text>
                        </React.Fragment>
                      }
                    </ToggleModelTypeBtn>
                  </ModelType>
                  {securityBased && (
                    <>
                      <SetShareModelContainer>
                        <H3>
                          Share Model{' '}
                          <Tooltip label="Share your model portfolio link with your friends and earn cash when they upgrade to Elite.">
                            <FontAwesomeIcon icon={faInfoCircle} size="sm" />
                          </Tooltip>
                        </H3>
                        <>
                          {' '}
                          <ToggleShareBtn onClick={handleToggleShareBtn}>
                            {share ? (
                              <React.Fragment>
                                <ToggleBtn icon={faToggleOn} />
                              </React.Fragment>
                            ) : (
                              <React.Fragment>
                                <ToggleBtn icon={faToggleOff} />
                              </React.Fragment>
                            )}
                            {share ? ' On' : ' Off'}
                          </ToggleShareBtn>
                          <br />
                          {share && (
                            <ShareLinkContainer>
                              <InputBox>
                                <ReadOnlyInput
                                  value={SHARE_URL}
                                  readOnly={true}
                                />
                              </InputBox>
                              <IconBox>
                                <CopyToClipboard
                                  text={SHARE_URL}
                                  onCopy={() => {
                                    setCopied(true);
                                  }}
                                >
                                  {copied ? (
                                    <FontAwesomeIcon
                                      icon={faClipboardCheck}
                                      size="lg"
                                    />
                                  ) : (
                                    <FontAwesomeIcon
                                      icon={faClipboard}
                                      size="lg"
                                    />
                                  )}
                                </CopyToClipboard>
                              </IconBox>
                            </ShareLinkContainer>
                          )}
                          <br />
                        </>
                      </SetShareModelContainer>
                    </>
                  )}
                  {!securityBased && (
                    <AssetClassesBox
                      assetClasses={modelAssetClasses}
                      modelId={modelId}
                    />
                  )}
                </div>
              </ResponsiveGrid>
            </ShadowBox>

            <DeleteContainer>
              <button onClick={() => setDeleteDialog(true)}>
                <FontAwesomeIcon icon={faTrashAlt} /> Delete
              </button>
            </DeleteContainer>

            <Dialog
              isOpen={deleteDialog}
              onDismiss={() => setDeleteDialog(false)}
              aria-labelledby="dialog1Title"
              aria-describedby="dialog1Desc"
              style={{ borderRadius: '4px' }}
            >
              <H2Margin>
                Are you sure you want to delete{' '}
                <span style={{ fontWeight: 'bold' }}>
                  {currentModelPortfolio!.model_portfolio.name}
                </span>{' '}
                ?
              </H2Margin>
              {groupsUsingModel?.length > 0 && (
                <DeleteModelExplanation>
                  <FontAwesomeIcon icon={faExclamationTriangle} />
                  The following groups are using this model and would get reset:
                  <ul>
                    {groupsUsingModel.map((group: any) => {
                      return <li key={group.id}>{group.name}</li>;
                    })}
                  </ul>
                </DeleteModelExplanation>
              )}

              <ActionContainer>
                <DeleteBtn onClick={handleDeleteModel}>Delete</DeleteBtn>
                <Button onClick={() => setDeleteDialog(false)}>Cancel</Button>
              </ActionContainer>
            </Dialog>
            <Dialog
              isOpen={modelTypeChanged}
              onDismiss={() => setModelTypeChanged(false)}
              aria-labelledby="dialog1Title"
              aria-describedby="dialog1Desc"
              style={{ borderRadius: '4px' }}
            >
              <H2Margin>
                Are you sure you want to change the model type ?
              </H2Margin>
              <ActionContainer>
                <DeleteBtn
                  onClick={() => {
                    handleChangeModelType();
                    setModelTypeChanged(false);
                  }}
                >
                  OK
                </DeleteBtn>
                <Button onClick={() => setModelTypeChanged(false)}>
                  Cancel
                </Button>
              </ActionContainer>
            </Dialog>
          </>
        )
      )}
    </>
  );
};

export default ModelPortfolio;
