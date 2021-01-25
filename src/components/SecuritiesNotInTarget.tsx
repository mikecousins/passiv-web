import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { replace } from 'connected-react-router';
import { postData } from '../api';
import {
  selectCurrentGroup,
  selectCurrentGroupTarget,
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
import { loadGroup, loadSettings } from '../actions';
import { toast } from 'react-toastify';
import { ContextualMessageWrapper } from './ContextualMessageWrapper';

type Props = {
  targets: any;
};

const ListOfAssets = styled.ul`
  font-size: 1.3rem;
  text-align: left;
  margin: 30px;
`;

const StyledGrid = styled(Grid)`
  margin-bottom: 15px;
  @media (max-width: 900px) {
    margin-bottom: 30px;
  }
`;

const DontShowBtn = styled.div`
  text-align: left;
  margin-top: 50px;
`;

const SecuritiesNotInTarget = ({ targets }: Props) => {
  const [loading, setLoading] = useState(false);
  const currentGroup = useSelector(selectCurrentGroup);
  const currentTargets = useSelector(selectCurrentGroupTarget);
  const dispatch = useDispatch();

  const handleAddTarget = (target: any, exclude: boolean) => {
    setLoading(true);
    const groupId = currentGroup?.id;
    const newTarget = {
      symbol: target.symbol.id,
      percent: 0,
      fullSymbol: target.symbol,
      is_supported: true,
      is_excluded: exclude,
    };
    const targets = currentTargets;
    //@ts-ignore
    targets?.push(newTarget);

    postData(`/api/v1/portfolioGroups/${groupId}/targets/`, targets!)
      .then(() => {
        dispatch(loadGroup({ ids: [groupId] }));
        if (!exclude) {
          dispatch(replace(`/app/group/${groupId}?edit=true`));
          setTimeout(() => {
            window.scrollTo({
              top: document.documentElement.scrollHeight,
              behavior: 'smooth',
            });
          }, 1500);
        }
        setTimeout(() => setLoading(false), 1500);
        toast.success(
          `'${newTarget.fullSymbol.symbol}' got ${
            exclude ? 'excluded from your target' : 'added to your target'
          }.`,
        );
      })
      .catch((error) => {
        toast.error(
          `Failed to edit targets: ${
            error.response && error.response.data.detail
          }`,
        );
        setLoading(false);
      });
  };

  const hideMsgBtn = () => {
    postData(`/api/v1/contextualMessages`, {
      name: ['new_assets_detected'],
    })
      .then(() => {
        dispatch(loadSettings());
      })
      .catch(() => {
        toast.error(`Failed to hide contextual message "new_assets_detected".`);
      });
  };

  return (
    <ContextualMessageWrapper name={'new_assets_detected'}>
      <ErrorContainer>
        <H3>
          <FontAwesomeIcon icon={faExclamationTriangle} /> New Assets Detected
          <P>
            We noticed that you added the following securities in your account
            and since these assets are not included in your target portfolio,
            they may impact your portfolio accuracy or trade calculations. You
            can either add them to your target portfolio* or exclude them.
          </P>
          {loading ? (
            <FontAwesomeIcon icon={faSpinner} spin />
          ) : (
            <ListOfAssets>
              {targets!.map((target: any) => {
                return (
                  <StyledGrid columns="1fr 200px 200px">
                    <div>
                      <span style={{ fontWeight: 600, marginRight: '20px' }}>
                        {target.symbol.symbol}
                      </span>{' '}
                      {target.symbol.description}
                    </div>
                    <SmallButton onClick={() => handleAddTarget(target, false)}>
                      Add to Target
                    </SmallButton>
                    <SmallButton
                      style={{
                        background: 'transparent',
                        border: '1px solid var(--brand-blue)',
                        color: 'var(--brand-blue)',
                      }}
                      onClick={() => handleAddTarget(target, true)}
                    >
                      Exclude
                    </SmallButton>
                  </StyledGrid>
                );
              })}
            </ListOfAssets>
          )}
        </H3>
        <small>
          * The securities get added with{' '}
          <span style={{ fontWeight: 900 }}>0%</span> but you can go to the
          bottom and change them.
        </small>
        <DontShowBtn>
          <A onClick={hideMsgBtn}>Do not display this message again</A>
        </DontShowBtn>
      </ErrorContainer>
    </ContextualMessageWrapper>
  );
};

export default SecuritiesNotInTarget;
