import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { postData } from '../api';
import {
  selectCurrentGroup,
  selectCurrentGroupExcludedAssets,
  selectCurrentGroupSettings,
} from '../selectors/groups';
import { SmallButton } from '../styled/Button';
import { A, H3, P } from '../styled/GlobalElements';
import Grid from '../styled/Grid';
import { ErrorContainer } from '../styled/Group';
import styled from '@emotion/styled';
import {
  faExclamationTriangle,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { loadGroup, loadModelPortfolios } from '../actions';
import { toast } from 'react-toastify';
import {
  selectModelPortfolios,
  selectModelUseByOtherGroups,
} from '../selectors/modelPortfolios';
import { Position } from '../types/groupInfo';

const Loading = styled.div`
  text-align: center;
  padding: 30px;
`;

const ListOfAssets = styled.ul`
  font-size: 1.3rem;
  text-align: left;
  margin: 30px;
`;

const StyledGrid = styled(Grid)`
  margin-bottom: 15px;
  align-items: center;
  @media (max-width: 900px) {
    margin-bottom: 30px;
  }
`;

const SymbolGrid = styled(Grid)`
  @media (max-width: 900px) {
    margin-bottom: 10px;
  }
`;

const Symbol = styled.div`
  font-weight: 600;
`;

const Description = styled.div``;

const DontShowBtn = styled.div`
  text-align: left;
  margin-top: 50px;
`;

const MaxHeightSmallBtn = styled(SmallButton)`
  padding: 11px;
  max-height: 45px;
`;

const ExcludeBtn = styled(MaxHeightSmallBtn)`
  background: transparent;
  border: 1px solid var(--brand-blue);
  color: var(--brand-blue);
`;

const ExcludeAll = styled.div`
  text-align: right;
  margin-bottom: 20px;
  button {
    min-width: 200px;
    color: var(--brand-green);
    border-color: var(--brand-green);
  }
  @media (max-width: 900px) {
    text-align: left;
  }
`;

const BoldSpan = styled.span`
  font-weight: 900;
`;

type Props = {
  targets: Position[];
};
const NewAssetsDetected = ({ targets }: Props) => {
  const dispatch = useDispatch();
  const [loadingId, setLoadingId] = useState('');
  const [allLoading, setAllLoading] = useState(false);
  const currentGroup = useSelector(selectCurrentGroup);
  const settings = useSelector(selectCurrentGroupSettings);
  const modelPortfolios = useSelector(selectModelPortfolios);
  const modelUseByOtherGroups = useSelector(selectModelUseByOtherGroups);
  const excludedAssets = useSelector(selectCurrentGroupExcludedAssets);

  const groupId = currentGroup?.id;

  const handleExcludeAsset = (targetId: string, excludeAll: boolean) => {
    let excluded: string[] = excludedAssets;
    if (excludeAll) {
      setAllLoading(true);
      const allTargetIds = targets.map((target) => target.symbol.id);
      excluded = excluded.concat(allTargetIds);
    } else {
      setLoadingId(targetId);
      excluded.push(targetId);
    }
    postData(`/api/v1/portfolioGroups/${groupId}/excludedassets/`, excluded)
      .then(() => {
        dispatch(loadGroup({ ids: [groupId] }));
      })
      .catch(() => {
        toast.error('Request failed. Please try again.');
      });
  };
  const handleAddToModel = (target: Position) => {
    setLoadingId(target.symbol.id);
    const modelId = currentGroup?.model_portfolio;
    const model = modelPortfolios.filter(
      (mdl) => mdl.model_portfolio.id === modelId,
    );
    const newTarget = {
      symbol: target.symbol,
      percent: '0',
    };
    model[0].model_portfolio_security = [
      ...model[0].model_portfolio_security,
      newTarget,
    ];
    postData(`/api/v1/modelPortfolio/${modelId}`, model[0])
      .then((res) => {
        postData(
          `api/v1/portfolioGroups/${groupId}/modelPortfolio/${modelId}`,
          {},
        )
          .then(() => {
            dispatch(loadGroup({ ids: [groupId] })); // need to load all groups to have an updated list of groups using a model in my models page
            dispatch(loadModelPortfolios());
            toast.success(
              `'${newTarget.symbol.symbol}' got added to '${model[0].model_portfolio.name}'`,
            );
          })
          .catch((err) => {
            if (err.response) {
              toast.error(err.response.data.detail);
            } else {
              toast.error('Cannot add target to model');
            }
          });
      })
      .catch((err) => {
        if (err.response) {
          toast.error(err.response.data.detail);
        } else {
          toast.error('Cannot add target to model');
        }
      });
  };

  if (!settings?.show_warning_for_new_assets_detected) {
    return <></>;
  } else {
    return (
      <ErrorContainer>
        <H3>
          <FontAwesomeIcon icon={faExclamationTriangle} /> New Assets Detected
        </H3>
        <P>
          We noticed that you added the following securities in your account and
          since these assets are not included in your model portfolio, they may
          impact your portfolio accuracy or trade calculations. You can either
          add them to your model portfolio* or exclude them.
        </P>
        {allLoading ? (
          <Loading>
            <FontAwesomeIcon icon={faSpinner} spin size="2x" />
          </Loading>
        ) : (
          <ListOfAssets>
            <ExcludeAll>
              <ExcludeBtn onClick={() => handleExcludeAsset('', true)}>
                Exclude All
              </ExcludeBtn>
            </ExcludeAll>
            {targets?.map((target) => {
              if (target.excluded) {
                return false;
              }
              if (target.symbol.id === loadingId) {
                return <FontAwesomeIcon icon={faSpinner} spin />;
              }
              return (
                <StyledGrid columns="1fr 180px 200px" key={target.symbol.id}>
                  <SymbolGrid columns="180px auto">
                    <Symbol>{target.symbol.symbol}</Symbol>{' '}
                    <Description>{target.symbol.description}</Description>
                  </SymbolGrid>
                  {!modelUseByOtherGroups && (
                    <MaxHeightSmallBtn
                      onClick={() => {
                        handleAddToModel(target);
                      }}
                    >
                      Add to Model
                    </MaxHeightSmallBtn>
                  )}
                  <ExcludeBtn
                    onClick={() => handleExcludeAsset(target.symbol.id, false)}
                  >
                    Exclude
                  </ExcludeBtn>
                </StyledGrid>
              );
            })}
          </ListOfAssets>
        )}

        <small>
          * The securities get added with <BoldSpan>0%</BoldSpan>. Scroll down
          and click Edit Model to change their allocation.
        </small>

        <DontShowBtn>
          <A onClick={() => dispatch(push(`/group/${groupId}/settings`))}>
            Do not want to see this message again? Turn it off in your portfolio
            settings.
          </A>
        </DontShowBtn>
      </ErrorContainer>
    );
  }
};

export default NewAssetsDetected;
