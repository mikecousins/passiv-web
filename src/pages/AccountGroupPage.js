import React from 'react';
import StockGroup from '../components/StockGroup';
import Stock from '../components/Stock';

const AccountGroupPage = () => (
  <div>
    <div className="mb-4 text-xl font-bold">
      Retirement Account Group
    </div>
    <StockGroup name="Canada">
      <Stock name="VCN" />
      <Stock name="XIC" />
    </StockGroup>
    <StockGroup name="USA">
      <Stock name="XUU" />
    </StockGroup>
    <StockGroup name="Europe/Asia">
      <Stock name="XEF" />
    </StockGroup>
    <StockGroup name="Emerging">
      <Stock name="XEC" />
    </StockGroup>
    <StockGroup name="Bonds">
      <Stock name="ZAG" />
    </StockGroup>
  </div>
);

export default AccountGroupPage;
