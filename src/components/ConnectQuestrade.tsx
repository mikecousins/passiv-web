import React from 'react';
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

const ConnectQuestrade = () => {
  return (
    <React.Fragment>
      <ShadowBox background="#2a2d34">
        <H1DarkStyle>Connect your Questrade account</H1DarkStyle>
        <H2DarkStyle>
          Passiv offers a real-time data connection to Questrade.
        </H2DarkStyle>
        <PDarkStyle>
          By linking your Questrade account to Passiv, you will receive Passiv
          Elite at no cost and gain the ability to place trades with a single
          click.
        </PDarkStyle>
        <HideButton name={'connect_questrade'} />
      </ShadowBox>
    </React.Fragment>
  );
};

export default ConnectQuestrade;
