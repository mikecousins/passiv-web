import React, { Component } from 'react';
import CredentialsManager from '../components/CredentialsManager';
import SubscriptionManager from '../components/SubscriptionManager';
import ConnectionsManager from '../components/ConnectionsManager';
import styled from '@emotion/styled';

const SettingContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	> div {
		flex: 1;
		min-width: 48%;
		padding: 30px;
		font-size: 18px;
		&:first-of-type {
			margin-right: 3%;
		}
	}
	h2 {
		margin-bottom: 20px;
	}
`;

class SettingsPage extends Component {

  render() {
    return (
    <React.Fragment>
    	<SettingContainer>
      	<CredentialsManager />

      	<SubscriptionManager />

      	<ConnectionsManager />

    	</SettingContainer>

    </React.Fragment>
    );
  }
};

export default SettingsPage;
