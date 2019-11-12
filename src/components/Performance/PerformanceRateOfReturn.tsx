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

const TimespanStyle = styled.span`
  padding: 5px;
  background-color: #cccccc !important;
  margin: 5px;
  color: black;
  font-weight: bold;
  font-size: 10pt;
  text-align: center;
`;

const GreenPercent = styled.span`
  padding: 10px;
  background-color: #04a287 !important;
  margin: 5px;
  color: white;
  font-weight: bold;
`;

const MarginBottom = styled.div`
  margin-bottom: 25px;
`;

const WhiteChange = styled.span`
  padding: 10px;
  background-color: #ffffff !important;
  margin: 5px;
  color: #04a287;
  font-weight: bold;
`;

// Below doesn't work right now
const AlignLeft = styled.div`
  text-align: left !important;
`;

export const TimespanSelector = (props: any) => {
  return <TimespanStyle>{props.name}</TimespanStyle>;
};

export const PerformanceRateOfReturn = () => {
  return (
    <React.Fragment>
      <SubHeader>
        Rate of Return
        <TimespanSelector name="1Y" />
        <TimespanSelector name="YTD" />
        <TimespanSelector name="30D" />
      </SubHeader>
      <br /> <br />
      <MarginBottom>
        <GreenPercent>
          6.83% <FontAwesomeIcon icon={faCaretUp} />
        </GreenPercent>
        <WhiteChange>
          $18,745 <FontAwesomeIcon icon={faCaretUp} />
        </WhiteChange>
      </MarginBottom>
    </React.Fragment>
  );
};

export default PerformanceRateOfReturn;
