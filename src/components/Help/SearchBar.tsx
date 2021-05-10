import React, { useState } from 'react';
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
import SearchResults from './SearchResults';

const Header = styled(H2)`
  line-height: 150%;
  letter-spacing: 3.2px;
  text-transform: uppercase;
  margin-bottom: 10px;
`;

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

const ResultsContainer = styled.div`
  background-color: #f1f1f1;
  padding: 20px;
  margin-bottom: 40px;
`;

const Options = styled.div`
  margin-bottom: 30px;
`;

const NumOfResults = styled(P)``;

const Filter = styled(Grid)`
  margin-top: 10px;
`;

type FilterItemType = {
  active: boolean;
};

const FilterItem = styled.button<FilterItemType>`
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  text-transform: uppercase;
  background-color: ${(props) =>
    props.active ? 'var(--brand-green)' : 'transparent'};
  color: ${(props) => (props.active ? 'black' : 'var(--brand-green)')};
  border: ${(props) =>
    props.active ? 'none' : '1px solid var(--brand-green)'};
  border-radius: 3rem;
  padding: 10px;
`;

const ResultsGrid = styled(Grid)`
  grid-auto-flow: row;
  overflow: hidden;
`;

const SearchBar = () => {
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [hits, setHits] = useState([]);

  const allIndices = ['tutorial', 'general', 'blog'];
  const [active, setActive] = useState(allIndices);

  const searchClient = algoliasearch(
    'GV9J4Z0TDF',
    '437b4b0bb132ef0b0b0273484f35fd94',
  );

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
    queries = allIndices.map((index) => {
      return {
        indexName: index,
        query: search,
      };
    });

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
    let activeCopy = [...active];
    const position = activeCopy.indexOf(index);
    if (position !== -1) {
      activeCopy.splice(position, 1);
    } else {
      activeCopy.push(index);
    }
    setActive(activeCopy);
  };

  const filteredHits = hits.filter((hit: any) => active.includes(hit.type));

  return (
    <div>
      <Header>Search</Header>
      <SearchContainer>
        <InputPrimary
          type="search"
          placeholder="Type to look for helpful resources"
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

      <ResultsContainer>
        <Options>
          {search.trim() !== '' && (
            <NumOfResults>{filteredHits.length} results</NumOfResults>
          )}
          <>
            <H3>Filter By:</H3>
            <Filter columns="200px 200px 200px">
              {allIndices.map((index) => {
                return (
                  <FilterItem
                    onClick={() => handleChangeFilter(index)}
                    active={active.includes(index)}
                  >
                    {index}
                  </FilterItem>
                );
              })}
            </Filter>
          </>
        </Options>
        {loading && search.trim() !== '' && (
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <FontAwesomeIcon icon={faSpinner} spin size="2x" />
          </div>
        )}
        {filteredHits.length > 0 ? (
          <ResultsGrid columns="1fr 1fr">
            {filteredHits.map((hit: any, index: number) => {
              if (!active.includes(hit.type)) {
                return false;
              }
              return <SearchResults hit={hit} />;
            })}
          </ResultsGrid>
        ) : (
          <div></div>
          // <ShadowBox>
          //   <H2 style={{ marginBottom: '10px', fontSize: '25px' }}>
          //     No results
          //   </H2>
          //   <P>
          //     Please try another term or{' '}
          //     <A onClick={() => setSearch('')}>send us a message.</A>
          //   </P>
          // </ShadowBox>
        )}
      </ResultsContainer>
    </div>
  );
};

export default SearchBar;
