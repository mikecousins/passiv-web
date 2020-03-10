import React from 'react';
import styled from '@emotion/styled';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Header from '../components/Header';
import SlideMenu from '../components/SlideMenu';
import GlobalStyle from '../styled/global';
import ScrollHelper from '../components/ScrollHelper';

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

export const AppLayout = ({ children }: Props) => (
  <div>
    <GlobalStyle />
    <Header />
    <Container>
      <SlideMenu />
      <Main>{children}</Main>
    </Container>
    <ScrollHelper />
    <ToastContainer position={toast.POSITION.BOTTOM_RIGHT} />
  </div>
);

export default AppLayout;
