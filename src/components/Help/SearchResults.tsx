import styled from '@emotion/styled';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { A, P, H2, H3 } from '../../styled/GlobalElements';
import ShadowBox from '../../styled/ShadowBox';
import { SearchResultsType } from '../../types/help';

const Card = styled(ShadowBox)`
  height: 100%;
`;

const Type = styled(H3)`
  color: var(--brand-green);
  text-transform: uppercase;
  font-size: 18px;
  margin-bottom: 20px;
`;

const Title = styled(H2)`
  margin-bottom: 10px;
  font-size: 25px;
`;

const ReadMore = styled(A)`
  text-decoration: none;
  color: var(--brand-blue);
  font-weight: 600;
`;

type Props = {
  hit: SearchResultsType;
};

const SearchResults = ({ hit }: Props) => {
  return (
    <div>
      <Card>
        <Type>{hit.type}</Type>
        <Title>{hit.title} </Title>
        <P>{hit.resolution}</P>
        {hit.type === 'faq' ? (
          hit.slug.trim() !== '' && (
            <ReadMore href={hit.slug} target="_blank" rel="noopener noreferrer">
              Learn More <FontAwesomeIcon icon={faExternalLinkAlt} size="sm" />
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
            Read More <FontAwesomeIcon icon={faExternalLinkAlt} size="sm" />
          </ReadMore>
        )}
      </Card>
    </div>
  );
};

export default SearchResults;
