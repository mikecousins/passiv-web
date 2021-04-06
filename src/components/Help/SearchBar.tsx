import React, { useEffect, useState } from 'react';
import { A, H2, H3, P } from '../../styled/GlobalElements';
import { InputPrimary } from '../../styled/Form';
import styled from '@emotion/styled';
import ShadowBox from '../../styled/ShadowBox';
import ContactForm from './ContactForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import algoliasearch from 'algoliasearch/lite';
import Grid from '../../styled/Grid';

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

const Filter = styled(Grid)`
  margin-bottom: 40px;
  margin-left: 20px;
`;

type FilterItemType = {
  active: boolean;
};

const FilterItem = styled.button<FilterItemType>`
  font-size: 15px;
  font-weight: 600;
  text-transform: capitalize;
  background-color: ${(props) =>
    props.active ? 'var(--brand-green)' : 'transparent'};
  color: ${(props) => (props.active ? 'white' : 'var(--brand-green)')};
  border: ${(props) =>
    props.active ? 'none' : '1px solid var(--brand-green)'};
  border-radius: 3rem;
  padding: 5px;
`;

const Type = styled(H3)`
  color: grey;
  text-transform: capitalize;
  font-size: 18px;
  margin-bottom: 20px;
`;

const SearchBar = () => {
  const [search, setSearch] = useState('');
  const [hits, setHits] = useState([]);
  const [indices, setIndices] = useState([
    { type: 'general', active: true },
    { type: 'blogs', active: true },
    { type: 'tutorials', active: true },
  ]);

  const searchClient = algoliasearch(
    'GV9J4Z0TDF',
    '437b4b0bb132ef0b0b0273484f35fd94',
  );

  const searchIt = async (val: string) => {
    setSearch(val);
    let queries = [];
    queries = indices
      .map((index) => {
        if (index.active) {
          return {
            indexName: index.type,
            query: search,
          };
        }
      })
      .filter((query) => query !== undefined);

    let combinedHits = [];
    //@ts-ignore
    searchClient.multipleQueries(queries).then(({ results }) => {
      combinedHits = results.map((result: any) => {
        return result.hits;
      });
      setHits(combinedHits.flat());
    });
  };

  const handleChangeFilter = (index: string) => {
    let indicesCopy = [...indices];
    indicesCopy = indices.map((element) => {
      if (element.type === index) {
        return { type: index, active: !element.active };
      }
      return element;
    });
    setIndices(indicesCopy);
  };

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
      <Filter columns="100px 100px 100px">
        {indices.map((index) => {
          return (
            <FilterItem
              onClick={() => handleChangeFilter(index.type)}
              active={index.active}
            >
              {index.type}
            </FilterItem>
          );
        })}
      </Filter>
      {hits.length > 0 ? (
        hits.map((hit: any) => {
          return (
            <div>
              <ShadowBox>
                <Type>{hit.type}</Type>
                <div>
                  <H2 style={{ marginBottom: '10px', fontSize: '25px' }}>
                    {hit.title}{' '}
                  </H2>
                </div>
                <P>{hit.resolution}</P>
                {hit.type === 'general' ? (
                  hit.slug.trim() !== '' && (
                    <a
                      href={hit.slug}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        textDecoration: 'none',
                        color: 'var(--brand-green)',
                        fontWeight: 600,
                      }}
                    >
                      Learn More
                    </a>
                  )
                ) : (
                  <a
                    href={
                      hit.type === 'blog'
                        ? `https://passiv.com/blog/${hit.slug}`
                        : `https://passiv.com/help/tutorials/${hit.slug}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      textDecoration: 'none',
                      color: 'var(--brand-green)',
                      fontWeight: 600,
                    }}
                  >
                    Read More
                  </a>
                )}
              </ShadowBox>
            </div>
          );
        })
      ) : (
        <ContactForm />
      )}
    </div>
  );
};

export default SearchBar;
