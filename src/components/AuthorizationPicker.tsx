import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectBrokerages } from '../selectors';
import { postData } from '../api';
import { Button } from '../styled/Button';
import { StepButton } from '../styled/SignupSteps';
import { Select } from '../styled/Form';
import styled from '@emotion/styled';
import { toast } from 'react-toastify';

const SelectAuth = styled(Select)`
  margin-left: 6px;
`;

type Props = {
  allowSelect?: boolean;
  allowSelectBrokerage?: boolean;
  allowSelectType?: boolean;
  updateBrokerageAuthorizationId?: string | null;
  brokerage?: string;
  type?: string;
  name?: string;
  isDemo?: boolean;
};

const AuthorizationPicker = ({
  allowSelect = true,
  allowSelectBrokerage = true,
  allowSelectType = true,
  updateBrokerageAuthorizationId = null,
  brokerage: _brokerage = '',
  type: _type = '',
  name = 'Connect',
  isDemo,
}: Props) => {
  const brokerages = useSelector(selectBrokerages);
  const [brokerage, setBrokerage] = useState(_brokerage);
  const [type, setType] = useState(_type);

  const startAuthorization = () => {
    if (updateBrokerageAuthorizationId === null) {
      postData(`/api/v1/brokerages/${brokerage}/authorize/`, {
        type: type,
      })
        .then((response) => {
          window.location = response.data.url;
        })
        .catch(() => {
          toast.error('Brokerage authorization failed');
        });
    } else {
      postData(
        `/api/v1/brokerages/${brokerage}/authorize/${updateBrokerageAuthorizationId}`,
        { type: type },
      )
        .then((response) => {
          window.location = response.data.url;
        })
        .catch(() => {
          toast.error('Brokerage authorization failed');
        });
    }
  };

  let brokerageOptions = null;
  if (brokerages) {
    brokerageOptions = brokerages.map((brokerage, index) => {
      return (
        <option key={brokerage.id} value={brokerage.id}>
          {brokerage.name}
        </option>
      );
    });
  }

  let types = null;
  if (brokerages && brokerage) {
    types = brokerages!
      .find((x) => x.id === brokerage)!
      .authorization_types.map((type) => {
        return (
          <option key={type.type} value={type.type}>
            {type.type}
          </option>
        );
      });
  }

  let submitButton = <Button disabled>Connect</Button>;
  if (brokerage && type) {
    if (allowSelect) {
      submitButton = (
        <Button onClick={() => startAuthorization()} disabled={isDemo}>
          {name}
        </Button>
      );
    } else {
      submitButton = (
        <StepButton onClick={() => startAuthorization()}>{name}</StepButton>
      );
    }
  }

  return (
    <React.Fragment>
      {allowSelect && (
        <div>
          {allowSelectBrokerage && (
            <SelectAuth
              value={brokerage}
              onChange={(event) => {
                setBrokerage(event.target.value);
              }}
            >
              <option disabled value="">
                Choose your brokerage
              </option>
              {brokerageOptions}
            </SelectAuth>
          )}
          {allowSelectType && (
            <SelectAuth
              value={type}
              onChange={(event) => {
                setType(event.target.value);
              }}
            >
              <option disabled value="">
                Select an access level
              </option>
              {types}
            </SelectAuth>
          )}
        </div>
      )}
      {submitButton}
    </React.Fragment>
  );
};

export default AuthorizationPicker;
