import styled from '@emotion/styled';

export const InputContainer = styled.div`
  padding-bottom: 20px;
  font-size: 18px;
`;

export const Brokerage = styled.div`
  min-width: 15%;
`;

export const BrokerageTitle = styled.div`
  font-size: 20px;
  font-weight: 500;
`;

export const Name = styled.div`
  min-width: 20%;
  display: flex;
`;

export const Number = styled.div`
  min-width: 10%;
  text-align: center;
  display: flex;
`;

export const Type = styled.div`
  min-width: 10%;
  text-align: center;
  display: flex;
`;

export const PortfolioGroup = styled.div`
  min-width: 30%;
  text-align: center;
`;

export const AccountContainer = styled.div`
  border-top: 1px solid #eee;
  margin-top: 10px;
  padding-top: 10px;
  &:first-of-type {
    border: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
  p {
    margin-top: 5px;
    margin-left: 5px;
    font-size: 16px;
  }
`;
