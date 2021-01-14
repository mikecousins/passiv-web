import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, SmallButton } from '../styled/Button';
import { H2, A } from '../styled/GlobalElements';
import { selectCurrencies } from '../selectors/currencies';
import {
  selectPreferredCurrency,
  selectCurrentGroupAccounts,
} from '../selectors/groups';
import { CashRestriction as CashRestrictionType } from '../types/account';
import Number from './Number';
import { postData, deleteData } from '../api';
import { loadGroup, loadAccounts } from '../actions';
import { toast } from 'react-toastify';
import {
  selectCurrentGroupId,
  selectCurrentGroupCashRestrictions,
} from '../selectors/groups';
import { Formik, Field } from 'formik';
import { restrictionTypes } from '../common';

import styled from '@emotion/styled';

import { Form } from '../styled/Form';

const CashManagementBox = styled.div`
  margin-top: 30px;
  margin-bottom: 35px;
`;

const CashForm = styled(Form)`
  max-width: 100%;
`;

export const CashRestrictionBox = styled.div`
  padding: 12px 0 5px;
`;

export const CashRow = styled.div`
  text-align: left;
  padding-bottom: 10px;
  @media (min-width: 900px) {
    display: flex;
  }
`;

export const Heading = styled.div`
  h3 {
    font-size: 40px;
    font-weight: bold;
    text-align: left;
    line-height: 1;
  }
`;

export const ColumnBase = styled.div`
  min-width: 20%;
  padding: 10px;
  color: var(--brand-grey);
  @media (max-width: 900px) {
    line-height: 1.2;
  }
  text-align: center;
`;

export const ColumnAccount = styled(ColumnBase)``;

export const ColumnType = styled(ColumnBase)``;

export const ColumnCurrency = styled(ColumnBase)`
  text-align: center;
`;

export const ColumnAmount = styled(ColumnBase)`
  text-align: center;
`;

export const ColumnDelete = styled(ColumnBase)`
  text-align: center;
`;

const StyledFieldBase = styled(Field)`
  width: 100%;
`;

const StyledSelect = styled(StyledFieldBase)`
  padding: 11px 52px 10px 14px;
  display: inline-block;
  background-color: #fff;
  border-radius: 0;
  border: 1px solid #000;
  -webkit-appearance: none;
  background-image: linear-gradient(45deg, #0000 50%, #fff 50%),
    linear-gradient(135deg, #fff 50%, #0000 50%),
    linear-gradient(to right, #2a2d34, #2a2d34);
  background-position: calc(100% - 20px) calc(1em + 2px),
    calc(100% - 15px) calc(1em + 2px), 100% 0;
  background-size: 8px 5px, 5px 5px, 2.5em 3.5em;
  background-repeat: no-repeat;
`;

const StyledNumeric = styled(StyledFieldBase)`
  font-size: 1em;
  height: 38px;
  width: 100px;
  margin-bottom: 0px;
  text-align: right;
  width: calc(100% - 20px);
`;

const NumericPrefixBox = styled.div`
  border: 1px solid black;
  font-size: 18px;
  padding: 0 5px 0 5px;
  height: 100%;
`;

const NumericPrefix = styled.div`
  display: inline-block;
  width: 20px;
`;

const CancelButton = styled(A)`
  margin-left: 10px;
`;

const Title = styled.div`
  text-align: center;
  font-weight: 600;
`;

const CashManagement = () => {
  const [editing, setEditing] = useState(false);

  const accounts = useSelector(selectCurrentGroupAccounts);
  const cashRestrictions: CashRestrictionType[] = useSelector(
    selectCurrentGroupCashRestrictions,
  );
  const currencies = useSelector(selectCurrencies);
  const groupId = useSelector(selectCurrentGroupId);
  const preferredCurrency = useSelector(selectPreferredCurrency);

  const startEditing = () => {
    setEditing(true);
  };

  const cancelEditing = () => {
    setEditing(false);
  };

  const canManageCash = () => {
    return true;
  };

  const reloadGroupAndAccounts = () => {
    dispatch(loadGroup({ ids: [groupId] }));
    dispatch(loadAccounts());
  };

  const getCurrency = (currencyId: string) =>
    currencies && currencies.find((c) => c.id === currencyId);
  const getAccount = (accountId: string) =>
    accounts && accounts.find((a) => a.id === accountId);
  const getType = (typeId: string) =>
    restrictionTypes.find((r) => r.id === typeId);

  const dispatch = useDispatch();

  const deleteRestriction = (restriction: CashRestrictionType) => {
    deleteData(
      `/api/v1/accounts/${restriction.account}/cashRestrictions/${restriction.id}/`,
    )
      .then(() => {
        reloadGroupAndAccounts();
      })
      .catch(() => {
        toast.error('Failed to delete cash restriction.');
      });
  };

  let form = (
    <Formik
      key={'cashRestriction'}
      initialValues={{
        account: accounts != null && accounts.length > 0 ? accounts[0].id : '',
        type: restrictionTypes[0].id,
        currency: preferredCurrency != null ? preferredCurrency.id : '',
        amount: '',
      }}
      onSubmit={(values, actions) => {
        postData(`/api/v1/accounts/${values.account}/cashRestrictions/`, {
          account: values.account,
          type: values.type,
          currency: values.currency,
          amount: values.amount,
        })
          .then((response) => {
            actions.setSubmitting(false);
            setEditing(false);
            reloadGroupAndAccounts();
          })
          .catch((error) => {
            if (error.response.data.code && error.response.data.code === 1057) {
              toast.error('Failed to add cash management rule');
            }

            actions.setSubmitting(false);
          });
      }}
      render={(props) => (
        <CashForm onSubmit={props.handleSubmit}>
          <CashRow>
            <ColumnAccount>
              <StyledSelect as="select" name="account">
                {accounts &&
                  accounts.map((account) => (
                    <option value={account.id} key={account.id}>
                      {account.name}
                    </option>
                  ))}
              </StyledSelect>
            </ColumnAccount>
            <ColumnType>
              <StyledSelect as="select" name="type">
                {restrictionTypes.map((restrictionType) => (
                  <option value={restrictionType.id} key={restrictionType.id}>
                    {restrictionType.name}
                  </option>
                ))}
              </StyledSelect>
            </ColumnType>
            <ColumnCurrency>
              <StyledSelect as="select" name="currency">
                {currencies &&
                  currencies.map((currency) => (
                    <option value={currency.id} key={currency.id}>
                      {currency.code}
                    </option>
                  ))}
              </StyledSelect>
            </ColumnCurrency>
            <ColumnAmount>
              <NumericPrefixBox>
                <NumericPrefix>$</NumericPrefix>
                <StyledNumeric type="number" name="amount" />
              </NumericPrefixBox>
            </ColumnAmount>
            <ColumnDelete>
              <SmallButton type="submit">Submit</SmallButton>
            </ColumnDelete>
          </CashRow>
        </CashForm>
      )}
    />
  );

  let cashRestrictionsContent = null;

  if (cashRestrictions.length > 0) {
    cashRestrictionsContent = (
      <React.Fragment>
        {cashRestrictions.map((cashRestriction: CashRestrictionType) => {
          const account = getAccount(cashRestriction.account);
          const currency = getCurrency(cashRestriction.currency);
          const type = getType(cashRestriction.type);
          return (
            <CashRow key={cashRestriction.id}>
              <ColumnAccount>{account && account.name}</ColumnAccount>
              <ColumnType>{type && type.name}</ColumnType>
              <ColumnCurrency>
                <span title={currency != null ? currency.name : ''}>
                  {currency && currency.code}
                </span>
              </ColumnCurrency>
              <ColumnAmount>
                {<Number value={cashRestriction.amount} currency />}
              </ColumnAmount>
              <ColumnDelete>
                <A onClick={() => deleteRestriction(cashRestriction)}>Delete</A>
              </ColumnDelete>
            </CashRow>
          );
        })}
      </React.Fragment>
    );
  } else {
    if (!editing) {
      cashRestrictionsContent = (
        <CashRow>There are no cash rules defined.</CashRow>
      );
    }
  }

  let cashRestrictionsRendered = (
    <CashRestrictionBox>
      {(editing || cashRestrictions.length > 0) && (
        <CashRow>
          <ColumnAccount>
            <Title>Account</Title>
          </ColumnAccount>
          <ColumnType>
            <Title>Rule</Title>
          </ColumnType>
          <ColumnCurrency>
            <Title>Currency</Title>
          </ColumnCurrency>
          <ColumnAmount>
            <Title>Amount</Title>
          </ColumnAmount>
          <ColumnDelete></ColumnDelete>
        </CashRow>
      )}
      {cashRestrictionsContent}
      {editing ? form : null}
    </CashRestrictionBox>
  );

  return (
    <CashManagementBox className="tour-cash-management">
      <H2>Cash Management</H2>
      {cashRestrictionsRendered}
      {editing ? (
        <div>
          <CancelButton
            onClick={() => {
              cancelEditing();
            }}
          >
            Cancel
          </CancelButton>
        </div>
      ) : (
        <div>
          <Button
            onClick={() => {
              startEditing();
            }}
            disabled={!canManageCash()}
          >
            Add Rule
          </Button>
        </div>
      )}
    </CashManagementBox>
  );
};

export default CashManagement;
