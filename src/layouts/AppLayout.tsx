import React from 'react';
import styled from '@emotion/styled';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Header from '../components/Header';
import SlideMenu from '../components/SlideMenu';
import GlobalStyle from '../styled/global';
import ScrollHelper from '../components/ScrollHelper';
import ShadowBox from '../styled/ShadowBox';
import { H2, P, BulletUL } from '../styled/GlobalElements';
import { selectQuestradeDowntimeFeature } from '../selectors/features';
import { useSelector } from 'react-redux';

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

const GlobalMessage = styled(ShadowBox)``;

interface Props {
  children: JSX.Element;
}

export const AppLayout = ({ children }: Props) => {
  const showDowntime = useSelector(selectQuestradeDowntimeFeature);
  return (
    <div>
      <GlobalStyle />
      <Header />
      <Container>
        <SlideMenu />
        <Main>
          {showDowntime && (
            <GlobalMessage>
              <H2>Notice</H2>
              <P>
                We are currently experiencing an issue connecting to the
                following brokerages:
              </P>
              <BulletUL>
                <li>Questrade</li>
              </BulletUL>
              <P>
                Your dashboard may show missing or incorrect data for these
                brokerages, and you may not be able to make new connections
                until the issue is fixed. We apologize for the issue, please try
                again later.
              </P>
              <P>Thank you for your patience!</P>
            </GlobalMessage>
          )}
          {children}
        </Main>
      </Container>
      <ScrollHelper />
      <ToastContainer position={toast.POSITION.BOTTOM_RIGHT} />
    </div>
  );
};

export default AppLayout;
