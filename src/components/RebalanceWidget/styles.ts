import styled from '@emotion/styled';
import { P, A } from '../../styled/GlobalElements';
import ShadowBox from '../../styled/ShadowBox';
import { TradeRow } from '../../styled/Group';

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

export const ModifiedTradeRow = styled(TradeRow)`
  margin-bottom: 10px;
`;

export const IdeaBox = styled(ShadowBox)`
  color: var(--brand-grey);
  width: 100%;
`;

export const IdeaRow = styled.div`
  display: flex;
`;

export const DetailRow = styled.div`
  padding-top: 20px;
`;

export const IconBox = styled.div`
  font-size: 4em;
`;

export const CopyBox = styled.div`
  padding-top: 18px;
  padding-left: 30px;
`;

export const PSmall = styled(P)`
  font-size: 16px;
`;

export const ASmall = styled(A)`
  font-size: 16px;
`;

export const ErrorDetail = styled(P)`
  padding-left: 20px;
`;

export const ErrorAttributeSpan = styled.span`
  font-weight: 600;
  padding-right: 10px;
`;
