import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  Hits,
  SearchBox,
  Pagination,
  Highlight,
  ClearRefinements,
  RefinementList,
  Configure,
} from 'react-instantsearch-dom';

const searchClient = algoliasearch(
  'GV9J4Z0TDF',
  '437b4b0bb132ef0b0b0273484f35fd94',
);

const AlgoliaSearch = () => {
  return (
    <div className="ais-InstantSearch">
      <InstantSearch indexName="faq" searchClient={searchClient}>
        <div className="left-panel">
          {/* <ClearRefinements /> */}
          {/* <h2>Category: </h2>
          <RefinementList attribute="type" /> */}
          <Configure hitsPerPage={8} />
        </div>
        <div className="right-panel">
          <SearchBox />
          <Hits hitComponent={Hit} />
          <Pagination />
        </div>
      </InstantSearch>
    </div>
  );
};

function Hit(props: any) {
  return (
    <div>
      <div className="hit-title">
        <a href={`https://passiv.com/${props.hit.type}/${props.hit.slug}`}>
          <Highlight attribute="title" hit={props.hit} />
        </a>
      </div>
      {/* <div className="hit-slug">
        <Highlight attribute="slug" hit={props.hit} />
      </div> */}
      {/* <div className="hit-price">${props.hit.price}</div> */}
    </div>
  );
}

export default AlgoliaSearch;
