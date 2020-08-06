import styled from '@emotion/styled';
import ShadowBox from './ShadowBox';
import { H1, H2, P, A } from './GlobalElements';

export const aDarkStyle = {
  color: 'white',
};

export const VerticalPadding = styled.div`
  padding-top: 10px;
  padding-bottom: 10px;
`;

export const Container2Column = styled.div`
  @media (min-width: 900px) {
    display: flex;
    flex-wrap: wrap;
    > div {
      margin-right: 20px;
      height: 200px;
      width: 250px;
    }
  }
`;

export const Container1Column = styled.div`
  display: flex;
`;

export const GrowBox = styled.div`
  flex-grow: 1;
  color: #fff;
  padding-left: 30px;
  display: flex;
  align-items: center;
`;

export const LogoContainer = styled.div`
  padding: 6% 8%;
  img {
    max-width: 100%;
  }
`;

export const LinkContainer = styled.div`
  margin-top: 20px;
  margin-bottom: 10px;
`;

export const AuthBox = styled(ShadowBox)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-end;
  padding-bottom: 30px;
`;

export const OpenBox = styled(ShadowBox)`
  min-width: 400px;
  text-align: center;
  padding-bottom: 30px;
`;

export const AuthLink = styled(A)`
  font-weight: bold;
  font-size: 18px;
  letter-spacing: 0;
`;

export const AuthP = styled(P)`
  max-width: 715px;
  color: #fff;
  padding-bottom: 20px;
`;

export const H1DarkStyle = styled(H1)`
  color: #fff;
`;

export const H2DarkStyle = styled(H2)`
  color: #04a287;
  font-size: 22px;
  padding-bottom: 20px;
`;

export const PDarkStyle = styled(P)`
  color: #04a287;
  font-size: 18px;
  padding-bottom: 10px;
`;

export const ADarkStyle = styled(A)`
  color: #04a287;
`;
