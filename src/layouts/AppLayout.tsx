import React from 'react';
import styled from '@emotion/styled';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Header from '../components/Header';
import SlideMenu from '../components/SlideMenu';
import GlobalStyle from '../styled/global';
import ScrollHelper from '../components/ScrollHelper';
import ReconnectMessage from '../components/ReconnectMessage';
import MaintenanceMessage from '../components/MaintenanceMessage';

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
  return (
    <div>
      <GlobalStyle />
      <Header />
      <Container>
        <SlideMenu />
        <Main>
          <MaintenanceMessage />
          <ReconnectMessage />
          {children}
        </Main>
      </Container>
      <ScrollHelper />
      <ToastContainer position={toast.POSITION.BOTTOM_RIGHT} />
    </div>
  );
};

export default AppLayout;
