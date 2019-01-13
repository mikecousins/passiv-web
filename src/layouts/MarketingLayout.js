import React from 'react';
import Header from '../components/MarketingHeader';
import Footer from '../components/MarketingFooter';

const MarketingLayout = (props) => (
  <div>
    <Header />
    {props.children}
    <Footer />
  </div>
);

export default MarketingLayout;
