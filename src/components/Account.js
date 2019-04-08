import React from 'react';
import { connect } from 'react-redux';

import { Table, H3, P } from '../styled/GlobalElements';
import styled from '@emotion/styled';

const InputContainer = styled.div`
  padding-bottom: 20px;
  font-size: 18px;
`;

const Brokerage = styled.div`
  min-width: 20%;
`;

const Name = styled.div`
  min-width: 20%;
`;

const Number = styled.div`
  min-width: 20%;
  text-align: center;
`;

const Type = styled.div`
  min-width: 20%;
  text-align: center;
`;

const PortfolioGroup = styled.div`
  min-width: 20%;
  text-align: center;
`;

const AccountContainer = styled.div`
  border-top: 1px solid #eee;
  margin-top: 10px;
  padding-top: 10px;
  &:first-of-type {
    border: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`;

class Account extends React.Component {
  render() {
    const { account } = this.props;

    return (
      <React.Fragment>
        <Table>
          <Brokerage>
            <H3>Brokerage</H3>
            <P>Questrade</P>
          </Brokerage>
          <Name>
            <H3>Name</H3>
            <P> {account.name} </P>
          </Name>
          <Number>
            <H3>Number</H3>
            <P> {account.number} </P>
          </Number>
          <Type>
            <H3>Type</H3>
            <P> TFSA </P>
          </Type>
          <PortfolioGroup>
            <H3>Portfolio Group</H3>
            <P> Retirement Group </P>
          </PortfolioGroup>
        </Table>
      </React.Fragment>
    );
  }
}

export default connect()(Account);
