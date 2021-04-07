import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { replace } from 'connected-react-router';
import { useHistory } from 'react-router-dom';
import { postData } from '../api';
import {
  selectCurrentGroup,
  selectCurrentGroupId,
  selectCurrentGroupSettings,
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
import { loadGroup } from '../actions';
import { toast } from 'react-toastify';

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

const MaxHeightSmallBtn = styled(SmallButton)`
  max-height: 40px;
`;

const SecuritiesNotInTarget = ({ targets }: Props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const currentGroup = useSelector(selectCurrentGroup);
  const currentTargets = useSelector(selectCurrentGroupTarget);
  const settings = useSelector(selectCurrentGroupSettings);
  const currentGroupId = useSelector(selectCurrentGroupId);

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

  if (!settings?.show_warning_for_new_assets_detected) {
    return <></>;
  } else {
    return (
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
                  <StyledGrid key={target.symbol.id} columns="1fr 200px 200px">
                    <div>
                      <span style={{ fontWeight: 600, marginRight: '20px' }}>
                        {target.symbol.symbol}
                      </span>{' '}
                      {target.symbol.description}
                    </div>
                    <MaxHeightSmallBtn
                      onClick={() => handleAddTarget(target, false)}
                    >
                      Add to Target
                    </MaxHeightSmallBtn>
                    <MaxHeightSmallBtn
                      style={{
                        background: 'transparent',
                        border: '1px solid var(--brand-blue)',
                        color: 'var(--brand-blue)',
                      }}
                      onClick={() => handleAddTarget(target, true)}
                    >
                      Exclude
                    </MaxHeightSmallBtn>
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
          <A
            onClick={() =>
              history.push(`/app/group/${currentGroupId}/settings`)
            }
          >
            Do not want to see this message again? Turn it off in your group
            settings.
          </A>
        </DontShowBtn>
      </ErrorContainer>
    );
  }
};

export default SecuritiesNotInTarget;
