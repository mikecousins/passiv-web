import { CardElement } from '@stripe/react-stripe-js';
import styled from '@emotion/styled';

const Card = styled(CardElement)`
  display: block;
  margin: 10px 0 20px 0;
  padding: 10px 14px;
  box-shadow: rgba(50, 50, 93, 0.14902) 0px 1px 3px,
    rgba(0, 0, 0, 0.0196078) 0px 1px 0px;
  border: 0;
  border-radius: 4px;
  outline: 0;
  background: white;
`;

export default Card;
