import React from 'react';
import { CashReturn, SubHeader } from './Performance';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { selectContributions } from '../../selectors/performance';

type Props = {
  selectedTimeframe: string;
};

export const PerformanceContributions = (props: Props) => {
  let contributions = useSelector(selectContributions);
  let positive = contributions === null || !(contributions.contributions < 0);

  const contributionsData = {
    contributions: 35000.0,
    date: '2019-01-23T22:53:28.886309Z',
    currency: 'CAD',
  };

  return (
    <React.Fragment>
      <SubHeader>Contributions</SubHeader>
      <br />
      <CashReturn className={positive ? 'positive' : 'negative'}>
        ${contributions?.contributions}{' '}
        {positive ? (
          <FontAwesomeIcon icon={faCaretUp} />
        ) : (
          <FontAwesomeIcon icon={faCaretDown} />
        )}
      </CashReturn>
    </React.Fragment>
  );
};

export default PerformanceContributions;
