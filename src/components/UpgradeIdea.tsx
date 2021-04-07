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
          <ASmall
            href="https://www.questrade.com/self-directed-investing/tools/partners/passiv"
            target="_blank"
            rel="noopener noreferrer"
          >
            Questrade
          </ASmall>{' '}
          offers Passiv Elite as a free tool for Questrade customers. It's
          available for free as long as you keep your Questrade account
          connected to Passiv.
        </PSmall>
        <PSmall>
          You’ll get access to all basic features plus the option to{' '}
          <ASmall
            href="https://passiv.com/help/tutorials/how-to-use-one-click-trades/"
            target="_blank"
            rel="noopener noreferrer"
          >
            place orders through Passiv
          </ASmall>{' '}
          in just one click.
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
