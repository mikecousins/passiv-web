import React from 'react';
import styled from '@emotion/styled';
import GlobalStyle from '../global-styles';
import Header from '../components/Header';
import SideBar from '../components/SideBar';

const Container = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
`;

const Main = styled.main`
  min-height: 90vh;
  position: relative;
  padding: 30px;
`;

const AppLayout = (props) => (
  <div>
    <GlobalStyle />
    <Header />
    <Container>
      <SideBar />
      <Main>
        {props.children}
      </Main>
    </Container>
  </div>
);

export default AppLayout;
