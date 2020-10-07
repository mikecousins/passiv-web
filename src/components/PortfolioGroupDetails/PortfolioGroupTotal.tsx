import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSpinner,
  faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import ShadowBox from '../../styled/ShadowBox';
import {
  Title,
  Total,
  Center,
  CashGroup,
  CashType,
} from '../../styled/PortfolioGroupDetails';
import Number from '../Number';
import { Error } from '../../types/groupInfo';
import { Currency } from '../../types/currency';
import { selectCurrencies } from '../../selectors/currencies';
import {
  selectCurrentGroupSettings,
  selectCurrentGroupId,
} from '../../selectors/groups';
import CurrencySelector from '../CurrencySelector';
import { putData } from '../../api';
import { loadGroup } from '../../actions';

type Props = {
  error?: Error | null;
  equity?: any;
  currency?: Currency | null;
};

const PortfolioGroupTotal = ({ error, equity }: Props) => {
  const settings = useSelector(selectCurrentGroupSettings);
  const currencies = useSelector(selectCurrencies);
  const groupId = useSelector(selectCurrentGroupId);
  const dispatch = useDispatch();
  if (!currencies || !settings) {
    return null;
  }
  let equityValue = null;
  if (error) {
    equityValue = (
      <Center>
        <FontAwesomeIcon icon={faExclamationTriangle} />
      </Center>
    );
  } else {
    equityValue =
      equity !== null ? (
        <Number value={equity} currency />
      ) : (
        <FontAwesomeIcon icon={faSpinner} spin />
      );
  }

  return (
    <ShadowBox background="#04a287">
      <Total>
        <Title>Total Value</Title>
        <CashGroup>
          {!error && (
            <CashType>
              <CurrencySelector
                value={settings.preferred_currency}
                options={currencies}
                onChange={(newCurrency: string) => {
                  settings.preferred_currency = newCurrency;
                  putData(
                    `/api/v1/portfolioGroups/${groupId}/settings/`,
                    settings,
                  )
                    .then(() => {
                      dispatch(loadGroup({ ids: [groupId] }));
                    })
                    .catch(() => {
                      toast.error('Failed to update settings');
                    });
                }}
              />
            </CashType>
          )}
          {equity !== undefined && <CashType>{equityValue}</CashType>}
        </CashGroup>
      </Total>
    </ShadowBox>
  );
};

export default PortfolioGroupTotal;
