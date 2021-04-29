import styled from '@emotion/styled';
import { P } from '../../styled/GlobalElements';

export const SummaryContainer = styled.div`
  text-align: left;
  margin-top: 25px;
`;

export const OrderContainer = styled.div`
  position: relative;
  border-radius: 4px;
  padding: 25px;
  margin-top: 30px;
  background: #f5f9ff;
  color: var(--brand-grey);
  h2 {
    margin-bottom: 20px;
  }
`;

export const ConfirmContainer = styled.div`
  text-align: left;
  a {
    margin-left: 20px;
    font-weight: 700;
    text-decoration: underline;
  }
`;

export const ErrorDetail = styled(P)`
  padding-left: 20px;
`;

export const ErrorAttributeSpan = styled.span`
  font-weight: 600;
  padding-right: 10px;
`;
