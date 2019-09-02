import React from 'react';

import { P, H3, WarningBox } from '../styled/GlobalElements';

type Props = {
  cardState: string;
  cardDetails: any;
};

export const CreditCardDetails = ({ cardState, cardDetails }: Props) => (
  <React.Fragment>
    <H3>Payment Card</H3>
    {cardState !== 'VALID' && (
      <WarningBox>
        <P>Your credit card has been declined, please update it.</P>
      </WarningBox>
    )}
    <P>
      {cardDetails.brand} {cardDetails.lastFourDigits} - expires{' '}
      {cardDetails.expiryMonth}/{cardDetails.expiryYear}
    </P>
  </React.Fragment>
);

export default CreditCardDetails;
