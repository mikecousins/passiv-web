import React from 'react';
import {
  aDarkStyle,
  LinkContainer,
  AuthP,
  VerticalPadding,
} from '../../styled/Setup';
import { Link } from 'react-router-dom';
import { postData } from '../../api';

import WealthicaBrokerageSearchBar from './WealthicaBrokerageSearchBar';

type Props = {
  onInstitutionDataInit: any;
  onboarding: boolean | undefined;
};

const WealthicaSelectBrokerage = ({
  onInstitutionDataInit,
  onboarding,
}: Props) => {
  const onSelectedBrokerage = (brokerageID: string) => {
    postData(`/api/v1/wealthica/connect`, {
      external_brokerage_id: brokerageID,
    })
      .then((response) => {
        onInstitutionDataInit(response.data);
      })
      .catch(() => {
        onInstitutionDataInit(null);
      });
  };

  let back_url = '';

  if (onboarding) {
    back_url = '/app/connect';
  } else {
    back_url = '/app/settings/connect';
  }

  return (
    <React.Fragment>
      <AuthP>
        Wealthica is a 3rd party account aggregator. The Wealthica API allows
        you to connect accounts from brokerages that are not currently supported
        by the Passiv app.
      </AuthP>
      <WealthicaBrokerageSearchBar onSelectedBrokerage={onSelectedBrokerage} />
      <LinkContainer>
        <VerticalPadding>
          <Link style={aDarkStyle} to={back_url}>
            Back
          </Link>
        </VerticalPadding>
      </LinkContainer>
    </React.Fragment>
  );
};

export default WealthicaSelectBrokerage;
