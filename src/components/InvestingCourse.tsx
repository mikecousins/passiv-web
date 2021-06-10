import React from 'react';
import { useSelector } from 'react-redux';
import ShadowBox from '../styled/ShadowBox';
import { H2, P, A } from '../styled/GlobalElements';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { HideButton } from './ContextualMessageWrapper';
import { selectIsPaid } from '../selectors/subscription';
import styled from '@emotion/styled';

import courseGraphic from '../assets/images/courseGraphic.png';

const H2styled = styled(H2)`
  font-weight: normal;
  font-size: 44px;
  margin-bottom: 25px;
  letter-spacing: 0.44px;
`;

const Pstyled = styled(P)`
  max-width: 840px;
`;

const TakeCourse = styled(A)`
  background: var(--brand-blue);
  padding: 14px 24px 16px;
  color: #fff;
  border-radius: 4px;
  text-decoration: none;
  margin-top: 35px;
  display: inline-block;
  svg {
    margin-left: 5px;
  }
`;

const ShadowBoxwImage = styled(ShadowBox)`
  background: url(${courseGraphic}) no-repeat 98% bottom
    var(--brand-light-green);
  background-size: 300px;
  padding: 40px;
  @media (max-width: 900px) {
    padding-bottom: 120px;
  }
`;

const InvestingCourse = () => {
  const isPaid = useSelector(selectIsPaid);
  return (
    <React.Fragment>
      <ShadowBoxwImage>
        <HideButton name={'investing_course'} xButton={true} />
        <H2styled>Take a free Investing Course</H2styled>
        <Pstyled>Learning to invest doesn't have to be daunting.</Pstyled>
        <Pstyled>
          Passiv has partnered with{' '}
          <A
            href="https://compoundconfidence.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Compound Confidence
          </A>{' '}
          to produce a short investing course to help you get started. If you
          get a lunch break, then you have enough time to take the course!
        </Pstyled>
        <Pstyled>
          This 35-minute course will teach you the basics that you need to know
          in order to start investing passively, and it's available for free to
          all Passiv members!
        </Pstyled>
        <Pstyled>
          <TakeCourse
            href={
              isPaid
                ? 'https://go.compoundconfidence.com/passiv-elite-discount'
                : 'https://go.compoundconfidence.com/passiv-community-discount'
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            Take the Course{' '}
            <FontAwesomeIcon icon={faExternalLinkAlt} size="sm" />
          </TakeCourse>
        </Pstyled>
      </ShadowBoxwImage>
    </React.Fragment>
  );
};

export default InvestingCourse;
