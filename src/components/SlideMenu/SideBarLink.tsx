import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { RebalanceAlert } from '../../styled/Rebalance';
import { useSelector } from 'react-redux';
import { selectPathname } from '../../selectors/router';
import styled from '@emotion/styled';

const ColorBox = styled.div``;

const IndentColorBox = styled(ColorBox)`
  a {
    margin-top: -8px;
    padding: 10px 15px 10px 20px;
  }
`;

const BetaTag = styled.span`
  border: 1px solid white;
  border-radius: 3px;
  padding: 1px 3px 0 3px;
  margin-left: 5px;
`;

type Props = {
  name: string;
  linkPath: string;
  rebalance?: boolean;
  hasAccounts?: boolean;
  loading?: boolean;
  setupComplete?: boolean;
  spinnerLoading?: boolean;
  hideArrow?: boolean;
  indent?: boolean;
  beta?: boolean;
};

const SideBarLink = ({
  name,
  linkPath,
  rebalance,
  hasAccounts,
  loading,
  setupComplete,
  spinnerLoading,
  hideArrow,
  indent,
  beta = false,
}: Props) => {
  const pathname = useSelector(selectPathname);

  if (spinnerLoading === undefined) {
    spinnerLoading = false;
  }
  if (hideArrow === undefined) {
    hideArrow = false;
  }
  // let selected = pathname.startsWith(linkPath);
  let selected = pathname === linkPath;
  if (
    pathname.startsWith(linkPath) &&
    (pathname.split('/').reverse()[0] === 'settings' ||
      pathname.includes('performance'))
  ) {
    selected = true;
  }

  let colorClass = undefined;
  if (selected) {
    colorClass = 'active';
  }
  if (indent === undefined) {
    indent = false;
  }

  let indicator = null;
  if (loading && spinnerLoading) {
    indicator = (
      <RebalanceAlert>
        <FontAwesomeIcon icon={faSpinner} spin style={{ color: 'white' }} />
      </RebalanceAlert>
    );
  } else {
    if (setupComplete === undefined) {
      indicator = <RebalanceAlert />;
    } else {
      if (setupComplete && rebalance) {
        indicator = (
          <RebalanceAlert>
            <span style={{ background: 'blue' }} />
          </RebalanceAlert>
        );
      } else if (!setupComplete && hasAccounts) {
        indicator = (
          <RebalanceAlert>
            <span style={{ background: 'orange' }} />
          </RebalanceAlert>
        );
      } else if (!hasAccounts) {
        indicator = (
          <RebalanceAlert>
            <span style={{ background: 'orange' }} />
          </RebalanceAlert>
        );
      }
    }
  }

  const link = (
    <Link to={linkPath}>
      {indicator}
      {indent ? name : <strong>{name}</strong>}
      {!hideArrow && <FontAwesomeIcon icon={faAngleRight} />}
      {beta && <BetaTag>BETA</BetaTag>}
    </Link>
  );

  if (indent) {
    return <IndentColorBox className={colorClass}>{link}</IndentColorBox>;
  } else {
    return <ColorBox className={colorClass}>{link}</ColorBox>;
  }
};

export default SideBarLink;
