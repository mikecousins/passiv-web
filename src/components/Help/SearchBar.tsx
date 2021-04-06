import React, { useEffect, useState } from 'react';
import { A, H2, H3, P } from '../../styled/GlobalElements';
import { InputPrimary } from '../../styled/Form';
import styled from '@emotion/styled';
import ShadowBox from '../../styled/ShadowBox';
import ContactForm from './ContactForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import algoliasearch from 'algoliasearch/lite';
import Grid from '../../styled/Grid';
import algoliaLogo from '../../assets/images/search-by-algolia-light-background.svg';
import { useDebouncedEffect } from '../PortfolioGroupTargets/TargetBar/SymbolSelector';

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

const AlgoliaLogo = styled.div`
  background: url(${algoliaLogo}) no-repeat;
  background-size: contain;
  width: 100px;
  height: 20px;
  margin: 0 0 10px auto;
  display: block;
`;

const Options = styled.div`
  background-color: #f1f1f1;
  padding: 20px;
  margin-bottom: 40px;
`;

const NumOfResults = styled(P)``;

const Filter = styled(Grid)`
  margin-top: 10px;
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

const Title = styled(H2)`
  margin-bottom: 10px;
  font-size: 25px;
`;

const ReadMore = styled(A)`
  text-decoration: none;
  color: var(--brand-green);
  font-weight: 600;
`;

const SearchBar = () => {
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [hits, setHits] = useState([]);
  const [indices, setIndices] = useState([
    { type: 'tutorials', active: true },
    { type: 'general', active: true },
    { type: 'blogs', active: true },
  ]);

  const [active, setActive] = useState(['tutorial', 'general', 'blog']);

  const searchClient = algoliasearch(
    'GV9J4Z0TDF',
    '437b4b0bb132ef0b0b0273484f35fd94',
  );

  // useEffect(() => {
  //   searchIt();
  // }, [indices]);

  useDebouncedEffect(
    () => {
      searchIt();
    },
    500,
    [search],
  );

  const searchIt = async () => {
    if (search.trim() === '') {
      setHits([]);
      return;
    }
    let queries = [];
    queries = indices
      .map((index) => {
        if (index.active) {
          return {
            indexName: index.type,
            query: search,
          };
        } else {
          return;
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
    setLoading(false);
  };

  const handleChangeFilter = (index: string) => {
    // let indicesCopy = [...indices];
    // indicesCopy = indices.map((element) => {
    //   if (element.type === index) {
    //     return { type: index, active: !element.active };
    //   }
    //   return element;
    // });
    // setIndices(indicesCopy);
    let activeCopy = [...active];
    const position = activeCopy.indexOf(index);
    if (position !== -1) {
      activeCopy.splice(position, 1);
    } else {
      activeCopy.push(index);
    }
    setActive(activeCopy);
  };

  return (
    <div>
      <SearchContainer>
        <InputPrimary
          type="search"
          placeholder="Type keywords to search our site"
          value={search}
          onChange={(e: any) => {
            setLoading(true);
            setSearch(e.target.value);
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

      <AlgoliaLogo></AlgoliaLogo>

      <Options>
        {search.trim() !== '' && (
          <NumOfResults>{hits.length} results</NumOfResults>
        )}
        <div>
          <H3>Filter By:</H3>
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
        </div>
      </Options>
      {loading && search.trim() !== '' && (
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <FontAwesomeIcon icon={faSpinner} spin size="2x" />
        </div>
      )}
      {hits.length > 0 ? (
        hits.map((hit: any) => {
          if (!active.includes(hit.type)) {
            return;
          }
          return (
            <div>
              <ShadowBox>
                <Type>{hit.type}</Type>
                <Title>{hit.title} </Title>
                <P>{hit.resolution}</P>
                {hit.type === 'general' ? (
                  hit.slug.trim() !== '' && (
                    <ReadMore
                      href={hit.slug}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Learn More
                    </ReadMore>
                  )
                ) : (
                  <ReadMore
                    href={
                      hit.type === 'blog'
                        ? `https://passiv.com/blog/${hit.slug}`
                        : `https://passiv.com/help/tutorials/${hit.slug}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Read More
                  </ReadMore>
                )}
              </ShadowBox>
            </div>
          );
        })
      ) : search.trim() !== '' ? (
        <ShadowBox>
          <H2 style={{ marginBottom: '10px', fontSize: '25px' }}>No results</H2>
          <P>
            Please try another term or{' '}
            <A onClick={() => setSearch('')}>send us a message.</A>
          </P>
        </ShadowBox>
      ) : (
        <ContactForm />
      )}
    </div>
  );
};

export default SearchBar;
