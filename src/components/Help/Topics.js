import React from 'react';
import styled from '@emotion/styled';
import ShadowBox from '../../styled/ShadowBox';
import { H2, H3, P } from '../../styled/GlobalElements';
import { Button } from '../../styled/Button';
import { Questions } from '../../styled/Help';

const Container = styled.div``;

export class Topics extends React.Component {
  render() {
    const questions = this.props.articles.map(article => (
      <ShadowBox key={article.slug}>
        <H3>{article.title}</H3>
        <P>{article.description}</P>
        <Button
          onClick={() => this.props.push(`/app/help/topic/${article.slug}`)}
        >
          Read More
        </Button>
      </ShadowBox>
    ));
    return (
      <Container>
        <H2 margin="40px 0 25px">Help Topics</H2>
        <Questions>{this.props.articles ? questions : <P>LOL</P>}</Questions>
      </Container>
    );
  }
}
export default Topics;
