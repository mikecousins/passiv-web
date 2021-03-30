import React from 'react';
import { useSelector } from 'react-redux';
import ShadowBox from '../styled/ShadowBox';
import {
  H1DarkStyle,
  H2DarkStyle,
  PDarkStyle,
  ADarkStyle,
} from '../styled/Setup';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { HideButton } from './ContextualMessageWrapper';
import { selectIsPaid } from '../selectors/subscription';

const InvestingCourse = () => {
  const isPaid = useSelector(selectIsPaid);
  return (
    <React.Fragment>
      <ShadowBox background="#2a2d34">
        <H1DarkStyle>Take a free Investing Course</H1DarkStyle>
        <H2DarkStyle>
          Learning to invest doesn't have to be daunting.
        </H2DarkStyle>
        <PDarkStyle>
          Passiv has partnered with{' '}
          <ADarkStyle
            href="https://compoundconfidence.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Compound Confidence
          </ADarkStyle>{' '}
          to produce a short investing course to help you get started. If you
          get a lunch break, then you have enough time to take the course!
        </PDarkStyle>
        <PDarkStyle>
          This 35-minute course will teach you the basics that you need to know
          in order to start investing passively, and it's available for free to
          all Passiv members!
        </PDarkStyle>
        <PDarkStyle>
          <ADarkStyle
            href={
              isPaid
                ? 'https://go.compoundconfidence.com/passiv-elite-discount'
                : 'https://go.compoundconfidence.com/passiv-community-discount'
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            Take the Course <FontAwesomeIcon icon={faExternalLinkAlt} />
          </ADarkStyle>
        </PDarkStyle>
        <HideButton name={'investing_course'} text={'Skip'} />
      </ShadowBox>
    </React.Fragment>
  );
};

export default InvestingCourse;
