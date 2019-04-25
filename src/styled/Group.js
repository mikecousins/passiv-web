import styled from '@emotion/styled';

export const Container = styled.section`
  div:first-of-type {
    position: relative;
    z-index: 3;
  }
`;

export const DashboardRow = styled.div`
  position: relative;
  div {
    align-items: center;
    text-align: center;
    @media (max-width: 900px) {
      letter-spacing: 0.015em;
      font-size: 20px;
      margin-bottom: 12px;
    }
  }
  h2 {
    min-width: 20%;
    font-size: 22px;
    margin-top: -10px;
    letter-spacing: 0.01em;
    @media (max-width: 900px) {
      text-align: center;
      margin-top: 0;
      font-size: 26px;
      color: var(--brand-green);
      margin-bottom: 10px;
    }
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
  @media (max-width: 900px) {
    margin: 20px 0 0;
    padding: 16px 20px 20px;
    border: 1px solid var(--brand-blue);
    width: 100%;
    display: inline-block;
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
    @media (max-width: 900px) {
      display: none;
    }
  }
  @media (max-width: 900px) {
    margin: 20px 0 0;
    width: 100%;
    overflow: hidden;
    border-radius: 4px;
  }
`;

export const Symbol = styled.div`
  border: 1px solid var(--brand-grey);
  display: inline-block;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: -0.3px;
  margin-top: 0px;
  padding: 4px 4px 2px;
`;

export const AllocateBtn = styled.div`
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
  @media (max-width: 900px) {
    width: 100%;
    position: relative;
    padding: 24px;
    margin-bottom: 0;
  }
`;

export const TradesContainer = styled.div`
  position: relative;
  color: #003ba2;
  box-shadow: var(--box-shadow);
  border-radius: 4px;
  padding: 20px;
  margin-bottom: 20px;
  margin-top: 0;
  background: #deeaff;
  h3 {
    color: #003ba2;
    font-size: 25px;
    margin-bottom: 10px;
  }
`;
export const ErrorContainer = styled.div`
  position: relative;
  box-shadow: var(--box-shadow);
  border-radius: 4px;
  padding: 20px;
  margin-bottom: 20px;
  margin-top: 0;
  background: #ffb040;
  h3 {
    font-size: 25px;
    margin-bottom: 10px;
  }
`;

export const TradeRow = styled.div`
  text-align: left;
  @media (min-width: 900px) {
    display: flex;
  }
`;

export const Heading = styled.div`
  h3 {
    font-size: 40px;
    font-weight: bold;
    text-align: left;
    line-height: 1;
  }
`;

export const ColumnSymbol = styled.div`
  min-width: 76%;
  color: var(--brand-grey);
  @media (max-width: 900px) {
    line-height: 1.2;
  }
`;

export const ColumnSymbolSmall = styled.div`
  min-width: 12%;
  color: var(--brand-grey);
  @media (max-width: 900px) {
    line-height: 1.2;
    margin-bottom: 10px;
  }
`;

export const ColumnUnits = styled.div`
  min-width: 12%;
  color: var(--brand-grey);
  @media (max-width: 900px) {
    margin-bottom: 16px;
  }
`;
export const ColumnPrice = styled.div`
  min-width: 12%;
  color: var(--brand-grey);
  @media (max-width: 900px) {
    margin-bottom: 16px;
  }
`;

export const ColumnAction = styled.div`
  min-width: 12%;
  color: var(--brand-grey);
  @media (max-width: 900px) {
    margin-bottom: 16px;
  }
`;

export const ColumnStatus = styled.div`
  min-width: 12%;
  color: var(--brand-grey);
  @media (max-width: 900px) {
    margin-bottom: 16px;
  }
`;

export const TradeType = styled.div`
  h3 {
    font-size: 32px;
    font-weight: 900;
    text-align: left;
    margin-bottom: 5px;
    padding-top: 18px;
  }
  > div:not(:first-of-type) {
    border-top: 1px solid #fff;
    margin-top: 12px;
    padding-top: 18px;
  }
`;

export const ColumnErrorSymbol = styled.div`
  min-width: 50%;
  color: var(--brand-grey);
  @media (max-width: 900px) {
    line-height: 1.2;
  }
`;

export const ColumnErrorDescription = styled.div`
  min-width: 17%;
  color: var(--brand-grey);
  @media (max-width: 900px) {
    margin-bottom: 16px;
  }
`;

export const ErrorTitle = styled.div`
  display: inline-block;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: -0.3px;
  margin-top: 0px;
  padding: 4px 4px 2px;
`;

export const Order = styled.div``;
