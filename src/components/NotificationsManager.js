import React from 'react';
import { connect } from 'react-redux';

import CashNotifcationSettings from './CashNotificationSettings';
import DriftNotifcationSettings from './DriftNotificationSettings';

import styled from '@emotion/styled';
import { H2 } from '../styled/GlobalElements';
import ShadowBox from '../styled/ShadowBox';

const InputContainer = styled.div`
  padding-top: 10px;
  padding-bottom: 5px;
  font-size: 18px;
`;

const TextContainer = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
`;

export class NotificationsManager extends React.Component {
  state = {};
  render() {
    return (
      <ShadowBox>
        <div>
          <H2>Notifications</H2>
          <TextContainer>
            <InputContainer>
              <CashNotifcationSettings />
            </InputContainer>
          </TextContainer>
          <TextContainer>
            <InputContainer>
              <DriftNotifcationSettings />
            </InputContainer>
          </TextContainer>
        </div>
      </ShadowBox>
    );
  }
}

const select = state => ({});
const actions = {};

export default connect(select, actions)(NotificationsManager);
