import React, { useState } from 'react';
import { A, H3, P } from '../../styled/GlobalElements';
import { InputPrimary } from '../../styled/Form';
import faq from './faq.json';
import styled from '@emotion/styled';
import ShadowBox from '../../styled/ShadowBox';
import ContactForm from './ContactForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

type faqObj = {
  question: string;
  resolution: string;
  keyword: string;
  link: string;
};

const SearchContainer = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  input[type='search'] {
    padding-right: 50px;
    width: 100%;
    border: 3px solid var(--brand-green);
    padding: 15px;
    height: 70px;
    border-radius: 3rem;
    outline: none;
    color: black;
  }

  button[type='submit'] {
    margin-left: -50px;
    position: relative;
    top: 15px;
    width: 40px;
    height: 36px;
    text-align: center;
    font-size: 20px;
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
    <div>
      <SearchContainer>
        <InputPrimary
          type="search"
          placeholder="Type keywords to search our site"
          value={search}
          onChange={(e: any) => setSearch(e.target.value)}
        />
        {search.length > 0 && (
          <button type="submit" onClick={() => setSearch('')}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        )}
      </SearchContainer>
      <div>
        <div>
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
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
