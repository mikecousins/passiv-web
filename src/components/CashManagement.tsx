import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, SmallButton } from '../styled/Button';
import { H2, A, P } from '../styled/GlobalElements';
import { selectCurrencies } from '../selectors/currencies';
import {
  selectPreferredCurrency,
  selectCurrentGroupAccounts,
  selectCurrentGroupInfoLoading,
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { DeleteContainer } from './ModelPortfolio/ModelPortfolio';
import Grid from '../styled/Grid';

const CashManagementBox = styled.div`
  h2 {
    font-size: 28px;
    margin-bottom: 20px;
  }
`;

const CashForm = styled(Form)`
  max-width: 100%;
`;

export const CashRestrictionBox = styled.div`
  padding: 12px 0 25px;
`;

export const CashRow = styled.div`
  text-align: left;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-column-gap: 10px;
  @media (max-width: 900px) {
    grid-template-columns: 1.5fr 1.5fr 1.5fr 1.5fr;
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
  padding: 10px;
  color: var(--brand-grey);
  text-align: left;
  @media (max-width: 900px) {
    line-height: 1.2;
  }
`;

const StyledFieldBase = styled(Field)`
  max-width: 80%;
  @media (max-width: 900px) {
    width: 50%;
  }
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

const AddRuleBtn = styled(Button)`
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 600;
`;

const AddRuleBtn2 = styled(A)`
  font-size: 18px;
  font-weight: 600;
  margin-left: 10px;
  text-decoration: underline;
`;

const Title = styled.div`
  text-align: left;
  font-weight: 900;
  font-size: 18px;
  text-decoration: underline;
  text-underline-offset: 5px;
`;

const NoCashRules = styled(P)`
  margin: 10px 0;
  text-align: center;
`;

const CashManagement = () => {
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const accounts = useSelector(selectCurrentGroupAccounts);
  const cashRestrictions: CashRestrictionType[] = useSelector(
    selectCurrentGroupCashRestrictions,
  );
  const currencies = useSelector(selectCurrencies);
  const groupId = useSelector(selectCurrentGroupId);
  const preferredCurrency = useSelector(selectPreferredCurrency);
  const groupInfoLoading = useSelector(selectCurrentGroupInfoLoading);

  useEffect(() => {
    setLoading(groupInfoLoading);
  }, [groupInfoLoading]);

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
            toast.error(
              `Failed to add cash management rule: ${error.response.data.detail}`,
            );

            actions.setSubmitting(false);
          });
      }}
      render={(props) => (
        <CashForm onSubmit={props.handleSubmit}>
          <CashRow>
            <ColumnBase>
              <StyledSelect as="select" name="account">
                {accounts &&
                  accounts.map((account) => (
                    <option value={account.id} key={account.id}>
                      {account.name}
                    </option>
                  ))}
              </StyledSelect>
            </ColumnBase>
            <ColumnBase>
              <StyledSelect as="select" name="type">
                {restrictionTypes.map((restrictionType) => (
                  <option value={restrictionType.id} key={restrictionType.id}>
                    {restrictionType.name}
                  </option>
                ))}
              </StyledSelect>
            </ColumnBase>
            <ColumnBase>
              <StyledSelect as="select" name="currency">
                {currencies &&
                  currencies.map((currency) => (
                    <option value={currency.id} key={currency.id}>
                      {currency.code}
                    </option>
                  ))}
              </StyledSelect>
            </ColumnBase>
            <ColumnBase>
              <NumericPrefixBox>
                <NumericPrefix>$</NumericPrefix>
                <StyledNumeric type="number" name="amount" />
              </NumericPrefixBox>
            </ColumnBase>
            <ColumnBase>
              <SmallButton type="submit">Submit</SmallButton>
              <CancelButton
                onClick={() => {
                  cancelEditing();
                }}
              >
                Cancel
              </CancelButton>
            </ColumnBase>
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
            <CashRow
              key={cashRestriction.id}
              style={{
                border: '1px solid #f1f1f1',
                padding: '10px',
                marginBottom: '20px',
                background: '#f1f1f1',
              }}
            >
              <ColumnBase>{account && account.name}</ColumnBase>
              <ColumnBase>{type && type.name}</ColumnBase>
              <ColumnBase>
                <span title={currency != null ? currency.name : ''}>
                  {currency && currency.code}
                </span>
              </ColumnBase>
              <ColumnBase>
                {
                  <Number
                    value={cashRestriction.amount}
                    currency={currency ? currency.code : undefined}
                  />
                }
              </ColumnBase>
              <ColumnBase>
                <DeleteContainer style={{ float: 'left' }}>
                  <button onClick={() => deleteRestriction(cashRestriction)}>
                    <FontAwesomeIcon icon={faTrashAlt} /> Delete
                  </button>
                </DeleteContainer>
              </ColumnBase>
            </CashRow>
          );
        })}
      </React.Fragment>
    );
  } else {
    if (!editing) {
      cashRestrictionsContent = (
        <NoCashRules>
          There are no cash rules defined.{' '}
          <AddRuleBtn2
            onClick={() => {
              startEditing();
            }}
            disabled={!canManageCash()}
          >
            Add Rule
          </AddRuleBtn2>
        </NoCashRules>
      );
    }
  }

  let cashRestrictionsRendered = (
    <CashRestrictionBox>
      {(editing || cashRestrictions.length > 0) && (
        <CashRow style={{ marginBottom: '10px' }}>
          <ColumnBase>
            <Title>Account</Title>
          </ColumnBase>
          <ColumnBase>
            <Title>Rule</Title>
          </ColumnBase>
          <ColumnBase>
            <Title>Currency</Title>
          </ColumnBase>
          <ColumnBase>
            <Title>Amount</Title>
          </ColumnBase>
          <ColumnBase></ColumnBase>
        </CashRow>
      )}
      {cashRestrictionsContent}
      {editing ? form : null}
    </CashRestrictionBox>
  );

  return (
    <CashManagementBox className="tour-cash-management">
      <H2>Cash Management</H2>
      {loading ? (
        <FontAwesomeIcon icon={faSpinner} spin size="lg" />
      ) : (
        <>
          {cashRestrictionsRendered}
          {!editing && cashRestrictions.length > 0 && (
            <div>
              <AddRuleBtn
                onClick={() => {
                  startEditing();
                }}
                disabled={!canManageCash()}
              >
                Add Rule
              </AddRuleBtn>
            </div>
          )}
        </>
      )}
    </CashManagementBox>
  );
};

export default CashManagement;
