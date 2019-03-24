import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { connect } from 'react-redux';
import { H1 } from '../../styled/GlobalElements';
import ShadowBox from '../../styled/ShadowBox';

export const HeaderContainer = styled.div`
  h1 {
    margin-bottom: 10px;
  }
`;

export class HelpHeader extends React.Component {
  render() {
    return (
      <HeaderContainer>
        <H1>How Can we Help You?</H1>
      </HeaderContainer>
    )
  }
}
export default HelpHeader;

