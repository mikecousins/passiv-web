import React from 'react';
import BitbuyCredentialsManager from '../components/SettingsManager/BitbuyCredentialsManager';
import KrakenCredentialsManager from '../components/SettingsManager/KrakenCredentialsManager';
import UnocoinCredentialsManager from '../components/SettingsManager/UnocoinCredentialsManager';

type Props = {
  brokerageName: string;
};

const BrokeragesAuthPage = ({ brokerageName }: Props) => {
  switch (brokerageName) {
    case 'Kraken':
      return <KrakenCredentialsManager />;
    case 'BitBuy':
      return <BitbuyCredentialsManager />;
    case 'UnoCoin':
      return <UnocoinCredentialsManager />;
    default:
      break;
  }
};

export default BrokeragesAuthPage;
