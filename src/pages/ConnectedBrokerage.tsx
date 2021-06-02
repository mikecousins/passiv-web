import styled from '@emotion/styled';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectRouter } from '../selectors/router';

import goldStar from '../assets/images/gold-star.png';
import { H1 } from '../styled/GlobalElements';
import { Description } from '../components/Onboarding /Intro';
import ShadowBox from '../styled/ShadowBox';
import { Button } from '../styled/Button';
import { push } from 'connected-react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';
import { Continue } from './BrokeragesOauthPage';

const Container = styled(ShadowBox)`
  background-color: var(--brand-light-green);
  padding: 50px;
  * {
    text-align: center;
  }
`;

const Star = styled.div`
  background: url(${goldStar}) no-repeat;
  background-size: contain;
  width: 75px;
  height: 75px;
  margin: 0 auto;
  margin-bottom: 20px;
  transform: rotate(18deg);
  @media (max-width: 900px) {
    width: 60px;
    height: 60px;
  }
`;

const ActionContainer = styled.div`
  margin-top: 44px;
  @media (max-width: 900px) {
    button {
      margin: 10px auto;
    }
  }
`;

const ConnectMore = styled(Button)`
  background-color: var(--brand-green);
  font-weight: 600;
  text-align: center;
  letter-spacing: 0.25px;
  margin-right: 35px;
`;

const ConnectedBrokerage = () => {
  const dispatch = useDispatch();
  const router = useSelector(selectRouter);
  // const status = router.location.query.status;
  const brokerageName = router.location.query.brokerage;

  /* TODO do a check to see if is part of onBoarding */

  let result = (
    <>
      <Star></Star>
      <H1>Connection Complete</H1>
      <Description>
        Thanks for connecting your {brokerageName} account! Connect another
        brokerage or move on to the next step!
      </Description>
      <ActionContainer>
        <ConnectMore onClick={() => dispatch(push('/welcome?step=1'))}>
          Connect Another Account
        </ConnectMore>
        <Continue onClick={() => dispatch(push('/welcome?step=2'))}>
          Continue to Next Step
          <FontAwesomeIcon icon={faLongArrowAltRight} size="lg" />
        </Continue>
      </ActionContainer>
    </>
  );

  // if (status === '2' && brokerageName === 'Questrade') {
  //   result = (
  //     <div>
  //       <P>
  //         Congratulations!! You are eligible for a FREE upgrade to Passiv Elite
  //         with your Questrade account!
  //       </P>
  //       <P>
  //         <A
  //           href="https://www.questrade.com/self-directed-investing/tools/partners/passiv"
  //           target="_blank"
  //           rel="noopener noreferrer"
  //         >
  //           Questrade
  //         </A>{' '}
  //         offers Passiv Elite as a free tool for Questrade customers. It's
  //         available for free as long as you keep your Questrade account
  //         connected to Passiv.
  //       </P>
  //       <P>
  //         You’ll get access to all basic features plus the option to{' '}
  //         <A
  //           href="https://passiv.com/help/tutorials/how-to-use-one-click-trades/"
  //           target="_blank"
  //           rel="noopener noreferrer"
  //         >
  //           place orders through Passiv
  //         </A>{' '}
  //         in just one click.
  //       </P>
  //       <Button onClick={() => dispatch(push('/questrade-offer'))}>
  //         Upgrade Now
  //       </Button>
  //     </div>
  //   );
  // }

  return <Container>{result}</Container>;
};

export default ConnectedBrokerage;
