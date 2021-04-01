import React, { useEffect, useState } from 'react';
import { A, H2, H3, P } from '../../styled/GlobalElements';
import { InputPrimary } from '../../styled/Form';
import faq from './faq.json';
import styled from '@emotion/styled';
import ShadowBox from '../../styled/ShadowBox';
import ContactForm from './ContactForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronRight,
  faTimes,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';
import algoliasearch from 'algoliasearch/lite';

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

const Type = styled(H3)`
  color: white;
  background-color: var(--brand-green);
  width: 100px;
  text-align: center;
  border-radius: 3rem;
  font-size: 18px;
  margin-bottom: 20px;
`;

const SearchBar = () => {
  const [search, setSearch] = useState('');
  const [hits, setHits] = useState([]);

  const searchClient = algoliasearch(
    'GV9J4Z0TDF',
    '437b4b0bb132ef0b0b0273484f35fd94',
  );
  const index = searchClient.initIndex('faq');

  const searchIt = async (val: string) => {
    setSearch(val);
    const result = await index?.search(search);
    if (result?.hits) {
      //@ts-ignore
      setHits(result.hits);
    }
  };

  // const renderFaq = (faq: faqObj) => {
  //   if (search === '') {
  //     return null;
  //   }

  //   return (
  //     <div>
  // <ShadowBox>
  //   <H3 title={faq.question} style={{ marginBottom: '10px' }}>
  //     {faq.question.substring(0, 100)}
  //   </H3>
  //   <P>{faq.resolution}</P>
  //   {faq.link.trim() !== '' && <a href={faq.link}> Learn more </a>}
  // </ShadowBox>
  //     </div>
  //   );
  // };

  // const filteredFaq = faq.filter((faq: any) => {
  //   return faq.question.toLowerCase().indexOf(search.toLowerCase()) !== -1;
  // });

  return (
    <div>
      <SearchContainer>
        <InputPrimary
          type="search"
          placeholder="Type keywords to search our site"
          value={search}
          onChange={(e: any) => {
            searchIt(e.target.value);
          }}
        />
        {search.length > 0 && (
          <button
            type="submit"
            onClick={() => {
              setSearch('');
              setHits([]);
            }}
          >
            <FontAwesomeIcon icon={faTimesCircle} />
          </button>
        )}
      </SearchContainer>
      {/* <div>
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
      </div> */}
      {hits.length > 0 &&
        hits.map((hit: any) => {
          return (
            <div>
              <ShadowBox>
                <Type>{hit.type}</Type>
                <a
                  href={
                    hit.type === 'blog'
                      ? `https://passiv.com/blog/${hit.slug}`
                      : `https://passiv.com/help/tutorials/${hit.slug}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none' }}
                >
                  <div>
                    <H2 style={{ marginBottom: '10px', fontSize: '25px' }}>
                      {hit.title}{' '}
                      <span>
                        <FontAwesomeIcon
                          icon={faChevronRight}
                          color="var(--brand-green)"
                          style={{ marginLeft: '10px' }}
                        />
                      </span>
                    </H2>
                  </div>
                </a>
                {/* <P>{faq.resolution}</P>
                {faq.link.trim() !== '' && <a href={faq.link}> Learn more </a>} */}
              </ShadowBox>
            </div>
          );
        })}
    </div>
  );
};

export default SearchBar;
