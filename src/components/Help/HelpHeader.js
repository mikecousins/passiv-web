import React from 'react';
import styled from '@emotion/styled';
import { H1 } from '../../styled/GlobalElements';

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

