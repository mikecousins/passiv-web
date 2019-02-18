import styled from '@emotion/styled';

export const Container = styled.section`
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
  background-color: #001c55;
  color: #fff;
  border-radius: 4px;
  > div {
    margin-bottom: 20px;
    background: none;
    text-align: right;
  }
`;

export const TradeRow = styled.div`
  display: flex;
  margin-bottom: 16px;
`;

export const Heading = styled.div`
  width: 25%;
  h3 {
    color: #fff;
    font-size: 40px;
    font-weight: bold;
    text-align: left;
    line-height: 1;
  }
`;

export const ColumnSymbol = styled.div`
  min-width: 45%;
`;

export const ColumnUnits = styled.div`
  min-width: 15%;
`;
export const ColumnPrice = styled.div`
  min-width: 15%;
`;
