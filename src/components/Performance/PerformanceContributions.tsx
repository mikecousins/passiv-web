import React from 'react';
import { CashReturn, SubHeader } from './Performance';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { selectContributions } from '../../selectors/performance';
import { Contributions } from '../../types/performance';

type Props = {
  selectedTimeframe: string;
};

export const PerformanceContributions = (props: Props) => {
  const contributions: Contributions | null = useSelector(selectContributions);
  const positive = contributions === null || !(contributions.contributions < 0);

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
