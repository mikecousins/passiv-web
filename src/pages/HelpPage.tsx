import React from 'react';
import FAQ from '../components/Help/FAQ';
import Topics from '../components/Help/Topics';
import ContactForm from '../components/Help/ContactForm';
import HelpHeader from '../components/Help/HelpHeader';
import { selectLoggedIn, selectHelpArticles } from '../selectors';
import { useSelector } from 'react-redux';

const HelpPage = () => {
  const loggedIn = useSelector(selectLoggedIn);
  const articles = useSelector(selectHelpArticles);
  return (
    <React.Fragment>
      {loggedIn && (
        <React.Fragment>
          <HelpHeader />
          <ContactForm />
        </React.Fragment>
      )}
      <Topics articles={articles} />
      <FAQ />
    </React.Fragment>
  );
};

export default HelpPage;
