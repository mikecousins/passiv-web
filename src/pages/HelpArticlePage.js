import React, { Component } from 'react';
import { connect } from 'react-redux';
import FAQ from '../components/Help/FAQ';
import ContactForm from '../components/Help/ContactForm';
import HelpHeader from '../components/Help/HelpHeader';
import { selectHelpArticleSlug, selectHelpArticles } from '../selectors';
import { H1, P } from '../styled/GlobalElements';
import { Button } from '../styled/Button';
import { push } from 'connected-react-router';
import ReactMarkdown from 'react-markdown';
// const ReactMarkdown = require('react-markdown')

class HelpArticlePage extends Component {
  render() {
    let article = null;
    if (this.props.helpArticles !== null) {
      let selectedArticle = this.props.helpArticles.find(
        a => a.slug === this.props.helpArticleSlug,
      );
      if (selectedArticle) {
        article = (
          <React.Fragment>
            <H1>{selectedArticle.title}</H1>
            {selectedArticle.video_url && (
              <iframe
                src={selectedArticle.video_url}
                width="640"
                height="360"
                frameborder="0"
                allow="autoplay; fullscreen"
                allowfullscreen
              />
            )}
            <ReactMarkdown source={selectedArticle.content} />
          </React.Fragment>
        );
      } else {
        article = (
          <React.Fragment>
            <H1>Not Found</H1>
          </React.Fragment>
        );
      }
    } else {
      article = (
        <React.Fragment>
          <H1>Loading</H1>
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <Button onClick={() => this.props.push('/app/help')}>
          Back to Help
        </Button>
        {article}
      </React.Fragment>
    );
  }
}

const actions = {
  push: push,
};

const select = state => ({
  helpArticles: selectHelpArticles(state),
  helpArticleSlug: selectHelpArticleSlug(state),
});

export default connect(
  select,
  actions,
)(HelpArticlePage);
