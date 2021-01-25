import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
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

const DontShowBtn = styled.div`
  text-align: left;
  margin-top: 50px;
`;

const SecuritiesNotInTarget = ({ targets }: Props) => {
  const currentGroup = useSelector(selectCurrentGroup);
  const currentTargets = useSelector(selectCurrentGroupTarget);

  const dispatch = useDispatch();

  const handleAddTarget = (target: any, exclude: boolean) => {
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

    postData(`/api/v1/portfolioGroups/${currentGroup?.id}/targets/`, targets!)
      .then(() => {
        dispatch(loadGroup({ ids: [currentGroup?.id] }));
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
            they may impact your portfolio accuracy or trade calculations.
          </P>
          <ListOfAssets>
            {targets!.map((target: any) => {
              return (
                <Grid
                  style={{ marginBottom: '10px' }}
                  columns="1fr 200px 200px"
                >
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
                </Grid>
              );
            })}
          </ListOfAssets>
        </H3>
        <DontShowBtn>
          <A onClick={hideMsgBtn}>Do not display this message again</A>
        </DontShowBtn>
      </ErrorContainer>
    </ContextualMessageWrapper>
  );
};

export default SecuritiesNotInTarget;
