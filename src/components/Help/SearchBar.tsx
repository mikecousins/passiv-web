import React, { useState } from 'react';
import { A, H3, P } from '../../styled/GlobalElements';
import { InputPrimary } from '../../styled/Form';
import faq from './faq.json';
import styled from '@emotion/styled';
import ShadowBox from '../../styled/ShadowBox';
import ContactForm from './ContactForm';

type faqObj = {
  question: string;
  resolution: string;
  keyword: string;
  link: string;
};

const Wrap = styled.div``;

const SearchContainer = styled.div`
  margin-right: 50px;
`;

const Search = styled(InputPrimary)`
  width: 100%;
  border: 3px solid var(--brand-green);
  padding: 15px;
  height: 70px;
  border-radius: 3rem;
  outline: none;
  color: black;
`;

const FAQContainer = styled.div``;

const SearchBar = () => {
  const [search, setSearch] = useState('');

  const renderFaq = (faq: faqObj) => {
    if (search === '') {
      return null;
    }

    return (
      <div>
        <ShadowBox>
          <H3 title={faq.question} style={{ marginBottom: '10px' }}>
            {faq.question.substring(0, 100)}
          </H3>
          <P>{faq.resolution}</P>
          {faq.link.trim() !== '' && <a href={faq.link}> Learn more </a>}
        </ShadowBox>
      </div>
    );
  };

  const filteredFaq = faq.filter((faq: any) => {
    return faq.question.toLowerCase().indexOf(search.toLowerCase()) !== -1;
  });

  return (
    <Wrap>
      <SearchContainer>
        <Search
          type="search"
          placeholder="Type keywords to search our site"
          value={search}
          onChange={(e: any) => setSearch(e.target.value)}
        />
      </SearchContainer>
      <div>
        <FAQContainer>
          {filteredFaq.map((faq) => {
            return renderFaq(faq);
          })}
          {filteredFaq.length === 0 || search.length === 0 ? (
            <ContactForm />
          ) : (
            <A onClick={() => setSearch('')}>
              Cannot find what you're looking for? Send us a message!
            </A>
          )}
        </FAQContainer>
      </div>
    </Wrap>
  );
};

export default SearchBar;
