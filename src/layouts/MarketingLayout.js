import React from 'react';
import Header from '../components/MarketingHeader';
import Footer from '../components/MarketingFooter';

const MarketingLayout = (props) => (
  <div className="container mx-auto shadow bg-grey-lightest pb-2">
    <Header />
    {props.children}
    <Footer />
  </div>
);

export default MarketingLayout;
