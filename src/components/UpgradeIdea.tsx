import React from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { P, A, Edit } from '../styled/GlobalElements';
import ShadowBox from '../styled/ShadowBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';
import { Button } from '../styled/Button';

import styled from '@emotion/styled';

const IdeaBox = styled(ShadowBox)`
  color: var(--brand-grey);
  width: 100%;
`;

const IdeaRow = styled.div`
  display: flex;
`;

const DetailRow = styled.div`
  padding-top: 20px;
`;

const IconBox = styled.div`
  font-size: 4em;
`;

const CopyBox = styled.div`
  padding-top: 18px;
  padding-left: 30px;
`;

const PSmall = styled(P)`
  font-size: 16px;
`;

const ASmall = styled(A)`
  font-size: 16px;
`;

type Props = {
  showSkipLink?: boolean;
  skipLocation?: string;
};

const UpgradeIdea = ({ showSkipLink, skipLocation }: Props) => {
  const dispatch = useDispatch();

  return (
    <IdeaBox>
      <IdeaRow>
        <IconBox>
          <FontAwesomeIcon icon={faLightbulb} />
        </IconBox>
        <CopyBox>
          <P>
            Did you know that your account is eligible for a{' '}
            <strong>free</strong> upgrade to Passiv Elite?
          </P>
        </CopyBox>
      </IdeaRow>

      <DetailRow>
        <PSmall>
          Questrade is offering free subscriptions for one year, with no
          commitment on your part. We don't even need your credit card!
        </PSmall>
        <PSmall>
          After upgrading, you'll be able to place all your trades through
          Passiv in a single click. You can access{' '}
          <ASmall href="/pricing" target="_blank" rel="noopener noreferrer">
            all features
          </ASmall>{' '}
          just by accepting this offer.
        </PSmall>
        <Button onClick={() => dispatch(push('/app/questrade-offer'))}>
          Upgrade Now
        </Button>
        {showSkipLink && (
          <Edit
            onClick={() =>
              dispatch(push(skipLocation ? skipLocation : '/app/dashboard'))
            }
          >
            Skip
          </Edit>
        )}
      </DetailRow>
    </IdeaBox>
  );
};

export default UpgradeIdea;
