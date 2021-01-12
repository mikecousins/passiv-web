import React, { useState } from 'react';
import { H1, H2, P } from '../../styled/GlobalElements';
import { InputPrimary } from '../../styled/Form';
import faq from './faq.json';
import Grid from '../../styled/Grid';
import styled from '@emotion/styled';
import ShadowBox from '../../styled/ShadowBox';

type faqObj = {
  question: string;
  resolution: string;
  keyword: string;
};

const FAQContainer = styled.div`
  width: 70%;
  justifycontent: 'center' @media (max-width: 900px) {
    width: 100%;
  }
`;

const SearchBar = () => {
  const [search, setSearch] = useState('');

  const renderFaq = (faq: faqObj) => {
    if (search === '') {
      return null;
    }

    return (
      <div>
        <ShadowBox>
          <H2 margin="40px 0 25px" title={faq.question}>
            {faq.question.substring(0, 100)}
          </H2>
          <P>{faq.resolution}</P>
        </ShadowBox>
      </div>
    );
  };

  const filteredFaq = faq.filter((faq: any) => {
    return faq.question.toLowerCase().indexOf(search.toLowerCase()) !== -1;
  });

  return (
    <div className="banner">
      <main style={{ marginTop: '20rem' }}></main>
      <div className="container">
        <div className="row">
          <div className="search-box">
            <InputPrimary
              type="search"
              placeholder="How can we help you?"
              style={{
                display: '-ms-flexbox',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundPosition: '50px 50px',
                border: '1px solid #ccc',
              }}
              onChange={(e: any) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="row-2-20">
          <FAQContainer>
            {filteredFaq.map((faq) => {
              return renderFaq(faq);
            })}
          </FAQContainer>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
