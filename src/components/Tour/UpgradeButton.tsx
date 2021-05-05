import React from 'react';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  selectShowQuestradeOffer,
  selectSubscription,
} from '../../selectors/subscription';

const UpgradeButton = () => {
  const showQuestradeOffer = useSelector(selectShowQuestradeOffer);
  const subscription = useSelector(selectSubscription);

  const EliteUpgradeBtn = styled(Link)`
    border-radius: 0.5rem;
    background-color: var(--brand-green);
    padding: 10px;
    color: white;
    font-size: 15px;
    font-weight: 900;
    text-decoration: none;
  `;

  return (
    <>
      {showQuestradeOffer ? (
        <EliteUpgradeBtn to="/questrade-offer">
          Upgrade to Elite
        </EliteUpgradeBtn>
      ) : (
        subscription?.type === 'free' && (
          <EliteUpgradeBtn to="/settings">Upgrade to Elite</EliteUpgradeBtn>
        )
      )}
    </>
  );
};

export default UpgradeButton;
