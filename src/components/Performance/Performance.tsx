import React from 'react';
import { useSelector } from 'react-redux';
import { selectGroupedAccounts } from '../../selectors/groups';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp } from '@fortawesome/free-solid-svg-icons';
import TotalHoldings from '../TotalHoldings';

const Header = styled.div`
  font-size: 20pt;
`;

const SubHeader = styled.div`
  font-size: 14pt;
`;

const GreenPercent = styled.span`
  padding: 10px;
  background-color: #39c733 !important;
  margin: 5px;
  color: white;
  font-weight: bold;
`;

const WhiteChange = styled.span`
  padding: 10px;
  background-color: #ffffff !important;
  margin: 5px;
  color: #39c733;
  font-weight: bold;
`;

// Below doesn't work right now
const AlignLeft = styled.div`
  text-align: left !important;
`;

export const Performance = () => {
  const accounts = useSelector(selectGroupedAccounts);
  let totalAssets: number = 0;

  if (!accounts) {
    return null;
  }
  // accounts.map(group =>
  //   group.accounts.map(account => totalAssets += account.worth),
  // );
  return (
    <div>
      <Header>Performance:</Header> <br />
      <AlignLeft>
        <TotalHoldings />
      </AlignLeft>
      <SubHeader>All Time</SubHeader> <br />
      <br />
      <GreenPercent>
        18.73% <FontAwesomeIcon icon={faCaretUp} />
      </GreenPercent>
      <WhiteChange>
        $51,745 <FontAwesomeIcon icon={faCaretUp} />
      </WhiteChange>
      <br />
      <br />
      <br />
      <SubHeader>Last 30 days</SubHeader> <br />
      <br />
      <GreenPercent>
        0.79% <FontAwesomeIcon icon={faCaretUp} />
      </GreenPercent>
      <WhiteChange>
        $2,437 <FontAwesomeIcon icon={faCaretUp} />
      </WhiteChange>
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default Performance;
