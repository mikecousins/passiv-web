import React from 'react';
import { Link } from 'react-router-dom';
import StockGroup from '../components/StockGroup';
import Stock from '../components/Stock';

const AccountGroupPage = () => (
  <div>
    <div className="mb-4 text-xl font-bold">
      Retirement Account Group
    </div>
    <div className="mb-4 py-2">
      <Link to="/" class="bg-green hover:bg-green-dark text-white font-bold py-2 px-4 rounded mb-4 mr-4 no-underline">
        Portfolio
      </Link>
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
