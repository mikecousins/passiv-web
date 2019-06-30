import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectHelpArticleSlug, selectHelpArticles } from '../selectors';
import { H1, P } from '../styled/GlobalElements';
import { Button } from '../styled/Button';
import { push } from 'connected-react-router';
import ReactMarkdown from 'react-markdown';
import styled from '@emotion/styled';

// COPY-PASTED FROM GLOBALELEMENTS.JS ...
// WOULD BE A WHOLE LOT NICER TO JUST USE THOSE COMPONENTS IN THE MARKDOWN RENDER
const MarkdownContainer = styled.div`
  font-size: 18px;
  h1 {
    font-size: 42px;
    font-weight: 500;
    line-height: 2.17;
    letter-spacing: -1.5px;
    color: #2a2d34;
    @media (max-width: 900px) {
      line-height: 1.3;
      margin-bottom: 20px;
    }
  }
  h2 {
    font-size: 30px;
    font-weight: 600;
    text-align: left;
    color: #232225;
    display: block;
  }
  h3 {
    font-size: 18px;
    font-weight: 900;
    line-height: 1.78;
    letter-spacing: 1px;
    color: #232225;
  }
  p {
    font-size: 18px;
    font-weight: 500;
    line-height: 1.5;
    margin: 0 0 12px;
  }
  ul,
  ol {
    padding-top: 5px;
    margin-left: 20px;
    list-style-type: disc;
    li {
      margin-bottom: 10px;
      line-height: 1.3;
    }
  }
  a {
    font-size: 18px;
    text-align: left;
    color: #1250be;
    cursor: pointer;
  }
`;

const VideoContainer = styled.div`
  padding: 20px 0 20px 0;
  text-align: center;
  /* margin: auto; */
`;

const HelpArticlePage = () => {
  const helpArticles = useSelector(selectHelpArticles);
  const helpArticleSlug = useSelector(selectHelpArticleSlug);
  const dispatch = useDispatch();

  let article = null;
  if (helpArticles !== undefined && helpArticles !== null) {
    let selectedArticle = helpArticles.find(
      (a: any) => a.slug === helpArticleSlug,
    );
    if (selectedArticle) {
      article = (
        <React.Fragment>
          <H1>{selectedArticle.title}</H1>
          <P>{selectedArticle.description}</P>
          {selectedArticle.video_url && (
            <VideoContainer>
              <iframe
                title={selectedArticle.title}
                src={selectedArticle.video_url}
                width="640"
                height="400"
                frameBorder="0"
                allow="autoplay; fullscreen"
                allowFullScreen
              />
            </VideoContainer>
          )}
          <MarkdownContainer>
            <ReactMarkdown source={selectedArticle.content} />
          </MarkdownContainer>
        </React.Fragment>
      );
    } else {
      article = <H1>Not Found</H1>;
    }
  } else {
    article = <H1>Loading</H1>;
  }

  return (
    <React.Fragment>
      <Button onClick={() => dispatch(push('/app/help'))}>Back to Help</Button>
      {article}
      <Button onClick={() => dispatch(push('/app/help'))}>Back to Help</Button>
    </React.Fragment>
  );
};

export default HelpArticlePage;
