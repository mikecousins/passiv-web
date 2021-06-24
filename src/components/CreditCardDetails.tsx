import React from 'react';
import styled from '@emotion/styled';
import { P, H3, WarningBox } from '../styled/GlobalElements';

type Props = {
  cardState: string;
  cardDetails: any;
};

const H3Card = styled(H3)`
  color: #fff;
  padding-bottom: 3px;
`;

const CreditCardDetails = ({ cardState, cardDetails }: Props) => (
  <React.Fragment>
    <H3Card>Payment Card</H3Card>
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
