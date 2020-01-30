import React from 'react';
import styled from '@emotion/styled';
import CashNotifcationSettings from './CashNotificationSettings';
import DriftNotifcationSettings from './DriftNotificationSettings';
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

const NotificationsManager = () => (
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

export default NotificationsManager;
