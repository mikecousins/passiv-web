import styled from '@emotion/styled';

export const InputContainer = styled.div`
  padding-bottom: 20px;
  font-size: 18px;
`;

export const Brokerage = styled.div`
  min-width: 15%;
`;

export const Name = styled.div`
  min-width: 20%;
`;

export const Number = styled.div`
  min-width: 10%;
  text-align: center;
`;

export const Type = styled.div`
  min-width: 10%;
  text-align: center;
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
`;
