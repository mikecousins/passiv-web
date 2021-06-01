import styled from '@emotion/styled';
import { push } from 'connected-react-router';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectHasQuestradeConnection } from '../../selectors';
import { Button } from '../../styled/Button';
import { H1, H2, P } from '../../styled/GlobalElements';
import Grid from '../../styled/Grid';
import ShadowBox from '../../styled/ShadowBox';
import { Description } from './Intro';

const Cards = styled(Grid)`
  margin-top: 20px;
`;

const Card = styled(ShadowBox)`
  padding: 0;
  @media (max-width: 900px) {
    padding: 0px;
  }
`;

type HeaderProps = {
  type: string;
};

const Header = styled.div<HeaderProps>`
  background-color: ${(props) =>
    props.type === 'elite' ? 'var(--brand-green)' : '#2a2d34'};
  color: white;
  text-align: center;
  padding: 15px 10px 20px;
  border-radius: 4px 4px 0px 0px;
  h2 {
    color: white;
    text-align: center;
    margin-bottom: 10px;
  }
  span {
    font-size: 20px;
    font-weight: bold;
  }
  p {
    margin-top: 10px;
    font-size: 18px;
  }
`;

const PlanDetails = styled.ul`
  padding: 40px 32px;
  line-height: 3em;
  li {
    position: relative;
    padding-left: 20px;
    ::after {
      content: '✓';
      position: absolute;
      left: 0;
    }
  }
  .not-active {
    color: grey;
    ::after {
      display: none;
    }
  }
`;

const ButtonContainer = styled.div`
  text-align: center;
  margin: 20px 0px;
  button {
    text-transform: uppercase;
    font-weight: 600;
    font-size: 20px;
    letter-spacing: 0.02em;
    padding: 17px 62px 15px;
    text-align: center;
  }
`;

const Skip = styled.div`
  text-align: right;
  button {
    color: var(--brand-blue);
    font-weight: 600;
  }
`;

const ChooseMembership = () => {
  const dispatch = useDispatch();
  const hasQuestradeConnection = useSelector(selectHasQuestradeConnection);

  const Features = [
    'Automated calculations',
    'Cash & dividend notifications',
    'Keep stock picks separate',
    'Multi-account portfolios',
    'Connect multiple brokerage logins',
    'One-click trades',
    'Advanced currency handling',
    'Create tax-efficient portfolios',
  ];

  return (
    <div>
      <H1>
        {hasQuestradeConnection
          ? 'Congratulations!!'
          : 'Upgrade your membership'}
      </H1>
      <Description>
        {hasQuestradeConnection
          ? 'You are eligible for a FREE upgrade to Passiv Elite with your Questrade account!'
          : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}
      </Description>
      <Cards columns="3fr 3fr">
        <Card>
          <Header type="community">
            <H2> Community User </H2>
            <span>$0/month</span>
            <P>Free Forever </P>
          </Header>
          <PlanDetails>
            {Features.map((feature, index) => {
              return (
                <li className={index > 4 ? 'not-active' : ''}>{feature}</li>
              );
            })}
          </PlanDetails>
        </Card>
        <Card>
          <Header type="elite">
            <H2>Elite Member</H2>
            <span>$99/year</span>
            <P>$0 for Questrade Clients*</P>
          </Header>
          <PlanDetails>
            {Features.map((feature, index) => {
              return <li>{feature}</li>;
            })}
          </PlanDetails>
          <ButtonContainer>
            <Button onClick={() => dispatch(push('/questrade-offer'))}>
              {hasQuestradeConnection ? 'Get Elite For Free' : 'Get Elite'}
            </Button>
          </ButtonContainer>
        </Card>
      </Cards>
      <Skip>
        <button onClick={() => dispatch(push('/welcome?step=3'))}>
          Skip for now
        </button>
      </Skip>
    </div>
  );
};

export default ChooseMembership;
