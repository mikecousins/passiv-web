import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { RebalanceAlert } from '../../styled/Rebalance';
import { useSelector } from 'react-redux';
import { selectPathname } from '../../selectors/router';
import styled from '@emotion/styled';
import PreLoadLink from '../PreLoadLink';

const ColorBox = styled.div``;

const IndentColorBox = styled(ColorBox)`
  a {
    padding: 8px 15px 6px 20px;
    margin: -4px 0 6px;
  }
`;

const BetaTag = styled.span`
  border: 1px solid var(--brand-green);
  border-radius: 25px;
  padding: 2px 4px 1px;
  margin-left: 6px;
  font-weight: 500;
  font-size: 11px;
  margin-top: 0px;
  vertical-align: top;
  display: inline-block;
  color: var(--brand-green);
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
  const pathnameFull = useSelector(selectPathname);

  const fixPathname = (pathname: string): string => {
    if (pathname[pathname.length - 1] === '/') {
      return pathname.slice(0, pathname.length - 1);
    }
    return pathname;
  };

  const pathname: string = fixPathname(pathnameFull);

  if (spinnerLoading === undefined) {
    spinnerLoading = false;
  }
  if (hideArrow === undefined) {
    hideArrow = false;
  }
  let selected = pathname === linkPath;
  if (
    pathname.startsWith(linkPath) &&
    (pathname.split('/').reverse()[0] === 'settings' ||
      pathname.includes('performance'))
  ) {
    selected = true;
  }
  if (pathname.includes('goal') && linkPath.includes('goal')) {
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
    <>
      <PreLoadLink path={linkPath}>
        {indicator}
        {indent ? name : <strong>{name}</strong>}
        {beta && <BetaTag>BETA</BetaTag>}
      </PreLoadLink>
    </>
  );

  if (indent) {
    return <IndentColorBox className={colorClass}>{link}</IndentColorBox>;
  } else {
    return <ColorBox className={colorClass}>{link}</ColorBox>;
  }
};

export default SideBarLink;
