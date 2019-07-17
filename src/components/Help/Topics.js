import React from 'react';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { push } from 'connected-react-router';
import ShadowBox from '../../styled/ShadowBox';
import { H2, H3, P, A } from '../../styled/GlobalElements';
import { Questions } from '../../styled/Help';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';
import styled from '@emotion/styled';

const Container = styled.div``;

const Topics = ({ articles }) => {
  const dispatch = useDispatch();
  let questions = null;
  if (articles) {
    questions = articles.map(article => (
      <ShadowBox key={article.slug}>
        <H3>{article.title}</H3>
        <P>{article.description}</P>
        <A onClick={() => dispatch(push(`/app/help/topic/${article.slug}`))}>
          Read More
        </A>
      </ShadowBox>
    ));
  }
  return (
    <Container>
      <H2 margin="40px 0 25px">Help Topics</H2>
      <Questions>
        {articles ? questions : <FontAwesomeIcon icon={faSpinner} spin />}
      </Questions>
    </Container>
  );
};

export default Topics;
