import React from 'react';
import { useSelector } from 'react-redux';
import styled from '@emotion/styled';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../components/Header';
import SlideMenu from '../components/SlideMenu';
import GlobalStyle from '../styled/global';
import ScrollHelper from '../components/ScrollHelper';
import { selectShowOnboardingApp } from '../selectors/app';

const Container = styled.div`
  display: flex;
`;

const Main = styled.main`
  min-height: 90vh;
  position: relative;
  padding: 114px 30px 30px;
  max-width: 1410px;
  width: 100%;
  @media (max-width: 900px) {
    padding: 95px 15px;
  }
`;

interface Props {
  children: JSX.Element;
}

export const AppLayout = ({ children }: Props) => {
  const showOnboardingApp = useSelector(selectShowOnboardingApp);
  return (
    <div>
      <GlobalStyle />
      <Header />
      <Container>
        {!showOnboardingApp && <SlideMenu />}
        <Main>{children}</Main>
      </Container>
      <ScrollHelper />
    </div>
  );
};

export default AppLayout;
