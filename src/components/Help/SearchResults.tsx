import styled from '@emotion/styled';
import React from 'react';
import { A, P, H2, H3 } from '../../styled/GlobalElements';
import ShadowBox from '../../styled/ShadowBox';

const Card = styled(ShadowBox)`
  height: 100%;
`;

const Type = styled(H3)`
  color: var(--brand-green);
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
  color: var(--brand-blue);
  font-weight: 600;
`;

type Props = {
  hit: {
    type: string;
    title: string;
    resolution: string;
    slug: string;
  };
};

const SearchResults = ({ hit }: Props) => {
  return (
    <div>
      <Card>
        <Type>{hit.type}</Type>
        <Title>{hit.title} </Title>
        <P>{hit.resolution}</P>
        {hit.type === 'general' ? (
          hit.slug.trim() !== '' && (
            <ReadMore href={hit.slug} target="_blank" rel="noopener noreferrer">
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
      </Card>
    </div>
  );
};

export default SearchResults;
