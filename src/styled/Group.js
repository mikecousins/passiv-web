import styled from '@emotion/styled';

export const Container = styled.section`
  div:first-of-type {
    position: relative;
    z-index: 3;
  }
`;

export const DashboardRow = styled.div`
  position: relative;
  div{
    align-items: center;
    text-align: center;
  }
  h2 {
    min-width: 20%;
    font-size: 22px;
    margin-top: -10px;
    letter-spacing: 0.01em;
  }
`;

export const ViewBtn = styled.div`
  background-color: #fff;
  margin: -20px 0;
  padding: 34px 40px 34px;
  padding-right: 20px;
  border-left: 1px solid #eee;
  display: block;
  width: 20%;
  a {
    font-size: 20px;
    font-weight: 900;
    line-height: 0.95;
    letter-spacing: 2px;
    color: #033ebc;
    display: block;
    text-decoration: none;
  }
  svg {
    padding-left: 3px;
  }
`;

export const tradeHeading = styled.h2`
  font-size: 40px;
  font-weight: bold;
  text-align: left;
  line-height: 1;
`;

export const WarningViewBtn = styled.div`
  background-color: #fff;
  margin: -20px -20px -21px 0;
  border-left: 1px solid #eee;
  display: block;
  width: 20%;
  a {
    background-color: orange;
    border-radius: 0 4px 4px 0;
    padding: 32px 40px 36px;
    font-size: 20px;
    font-weight: 900;
    line-height: 0.95;
    letter-spacing: 2px;
    color: #033ebc;
    display: block;
    text-decoration: none;
  }
  svg {
    padding-left: 3px;
  }
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 3px;
    background: #ffa600;
    left: -20px;
    bottom: -20px;
  }
`;

export const Symbol = styled.div`
  border: 1px solid #fff;
  display: inline-block;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: -0.3px;
  margin-top: 0px;
  padding: 4px 4px 2px;
`;

export const AllocateBtn= styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  font-size: 16px;
  font-weight: 700;
  padding: 8px 24px;
  border-radius: 4px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.37);
  background-color: #003ba2;
  color: #fff;
  text-transform: uppercase;
  cursor: pointer;
`;

export const TradesContainer = styled.div`
  position: relative;
  color: #003BA2;
  box-shadow: var(--box-shadow);
  border-radius: 0 0 4px 4px;
  padding: 20px;
  margin-bottom: 20px;
  margin-top: 0;
  background: #deeaff;
  h3 {
    color: #003BA2;
    font-size: 45px;
  }
  h2 {
    font-size: 40px;
  }
`;

export const TradeRow = styled.div`
  text-align: right;
  @media (min-width: 760px) {
    display: flex;
  }
`;

export const Heading = styled.div`
  h3 {
    font-size: 40px;
    font-weight: bold;
    text-align: right;
    line-height: 1;
  }
`;

export const ColumnSymbol = styled.div`
  min-width: 76%;
`;

export const ColumnUnits = styled.div`
  min-width: 12%;
`;
export const ColumnPrice = styled.div`
  min-width: 12%;
`;

export const TradeType = styled.div`
  h3 {
    text-align: right;
    margin-bottom: 20px;
    padding-top: 18px;
  }
  > div:not(:first-of-type)  {
    border-top: 1px solid #fff;
    margin-top: 12px;
    padding-top: 18px;
  }
`;

export const Order = styled.div`

`;
