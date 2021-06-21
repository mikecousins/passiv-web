import React from 'react';
import { useSelector } from 'react-redux';
import styled from '@emotion/styled';
import Grid from '../styled/Grid';
import NotificationMessage from './NotificationMessage';
import { P, A, H1 } from '../styled/GlobalElements';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { selectIsPaid } from '../selectors/subscription';

import priceIcon from '../assets/images/price-icon.svg';
import timeIcon from '../assets/images/time-icon.svg';
import easyIcon from '../assets/images/easy-icon.svg';

const Pstyled = styled(P)`
  max-width: 840px;
`;

const TakeCourse = styled(A)`
  background: var(--brand-blue);
  padding: 14px 34px 16px;
  color: #fff;
  border-radius: 3px;
  text-decoration: none;
  margin: 35px 0px;
  display: inline-block;
  svg {
    margin-left: 5px;
  }
`;

const Icons = styled(Grid)`
  max-width: 840px;
  align-items: center;
  text-align: center;
  @media (max-width: 900px) {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 50px;
  }
`;

type IconProps = {
  image: string;
};

const Icon = styled.div<IconProps>`
  background: url(${(props) => props.image}) no-repeat;
  background-size: contain;
  width: 100px;
  height: 100px;
  margin: 0 auto;
  margin-bottom: 5px;
  @media (max-width: 900px) {
    width: 70px;
    height: 70px;
  }
`;

const Desc = styled(H1)`
  font-weight: bold;
  font-size: 30px;
  line-height: 150%;
  letter-spacing: 0.2px;
  text-align: center;
  .cross {
    position: relative;
    display: inline-block;
  }
  .cross::before,
  .cross::after {
    content: '';
    width: 100%;
    position: absolute;
    right: 0;
    top: 45%;
  }
  .cross::before {
    border-bottom: 6px solid var(--brand-green);
    -webkit-transform: skewY(-20deg);
    transform: skewY(-20deg);
  }

  @media (max-width: 900px) {
    font-size: 22px;
  }
`;

const InvestingCourse = () => {
  const isPaid = useSelector(selectIsPaid);
  return (
    <NotificationMessage
      error={false}
      title="Learn how to invest for free"
      alwaysOpen={true}
      closeBtn={true}
      contextualMessageName="investing_course"
    >
      <div>
        <Pstyled>
          Learning to invest doesn’t have to be daunting! Passiv has Partnered
          with{' '}
          <A
            href="https://compoundconfidence.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Compound Confidence
          </A>{' '}
          to produce an investing mini-course to teach you the basics that you
          need to start investing passively.
        </Pstyled>
        <Icons columns="repeat(3, 1fr)">
          <div>
            <Icon image={priceIcon}></Icon>
            <Desc>
              <span className="cross">$25</span> FREE
            </Desc>
          </div>
          <div>
            <Icon image={timeIcon}></Icon>
            <Desc>Only 35 Mins</Desc>
          </div>
          <div>
            <Icon image={easyIcon}></Icon>
            <Desc>Made Easy</Desc>
          </div>
        </Icons>
        <TakeCourse
          href={
            isPaid
              ? 'https://go.compoundconfidence.com/passiv-elite-discount'
              : 'https://go.compoundconfidence.com/passiv-community-discount'
          }
          target="_blank"
          rel="noopener noreferrer"
        >
          Take the Course <FontAwesomeIcon icon={faExternalLinkAlt} size="sm" />
        </TakeCourse>
      </div>
    </NotificationMessage>
  );
};

export default InvestingCourse;
