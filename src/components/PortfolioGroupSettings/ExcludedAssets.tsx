import styled from '@emotion/styled';
import { faToggleOff, faToggleOn } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentGroupPositionsNotInTarget } from '../../selectors/groups';
import { H2 } from '../../styled/GlobalElements';
import { StateText, ToggleButton } from '../../styled/ToggleButton';

const Container = styled.div`
  margin-bottom: 37px;
  border-bottom: 1px solid #2a2d34;
  h2 {
    margin-bottom: 15px;
  }
  ul {
    margin-bottom: 37px;
  }
`;
const Positions = styled.li``;
const Symbol = styled.span`
  font-size: 18px;
  font-weight: 600;
  margin-right: 33px;
  + span {
    font-size: 18px;
  }
`;

const ExcludedAssets = () => {
  const positionsNotInTarget = useSelector(
    selectCurrentGroupPositionsNotInTarget,
  );

  let toggleButton = (
    <ToggleButton onClick={() => console.log('toggled')}>
      {/* <Tooltip label={tip}> */}
      <FontAwesomeIcon icon={true ? faToggleOn : faToggleOff} />
      {/* </Tooltip> */}
      <StateText>{true ? 'Excluded' : 'Not Excluded'}</StateText>
    </ToggleButton>
  );

  return (
    <Container>
      <H2>Excluded securities in this portfolio</H2>
      {positionsNotInTarget && positionsNotInTarget.length > 0 ? (
        <ul>
          {positionsNotInTarget.map((position) => {
            return (
              <Positions>
                <Symbol>{position.symbol.symbol}</Symbol>
                <span>{position.symbol.description}</span>
              </Positions>
            );
          })}
        </ul>
      ) : (
        <small>No excluded assets</small>
      )}
    </Container>
  );
};

export default ExcludedAssets;
