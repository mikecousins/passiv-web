import React from 'react';
import styled from '@emotion/styled';
import CashNotifcationSettings from './CashNotificationSettings';
import DriftNotifcationSettings from './DriftNotificationSettings';
import { H2 } from '../../styled/GlobalElements';
import ShadowBox from '../../styled/ShadowBox';

const InputContainer = styled.div`
  padding-top: 10px;
  padding-bottom: 5px;
  font-size: 18px;
`;
const DriftGroup = styled.div`
  padding-top: 15px;
  margin-top: 6px;
  padding-bottom: 5px;
  font-size: 18px;
  border-top: 1px solid #e8e8e8;
`;

const NotificationsManager = () => (
  <ShadowBox>
    <H2>Notifications</H2>
    <InputContainer>
      <CashNotifcationSettings />
    </InputContainer>
    <DriftGroup>
      <DriftNotifcationSettings />
    </DriftGroup>
  </ShadowBox>
);

export default NotificationsManager;
