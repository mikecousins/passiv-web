import React from 'react';
import styled from '@emotion/styled';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from '../components/Header';
import SideBar from '../components/SideBar';

import GlobalStyle from '../styled/global';



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
    <ToastContainer position={toast.POSITION.BOTTOM_RIGHT} />
  </div>
);

export default AppLayout;
