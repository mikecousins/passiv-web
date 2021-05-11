import React from 'react';
import styled from '@emotion/styled';
import AuthorizationPicker from './AuthorizationPicker';
import { H3 } from '../styled/GlobalElements';
import { Authorization } from '../types/authorization';

export const Order = styled.div`
  text-align: center;
  select {
    padding: 10px;
    margin: 12px 0;
  }
`;

export const LeftOrder = styled(Order)`
  text-align: left;
`;

type Props = {
  type?: string;
  authorization?: Authorization;
  align?: string;
  isDemo?: boolean;
  name?: string;
  hideTitle?: boolean;
};

const ConnectionUpdate = ({
  type,
  authorization,
  align,
  isDemo,
  name,
  hideTitle,
}: Props) => {
  const allowSelectType = type === undefined ? true : false;
  const defaultType = type === undefined ? authorization?.type : type;

  const picker = (
    <React.Fragment>
      {!hideTitle && <H3>Update/Refresh Connection</H3>}
      <AuthorizationPicker
        allowSelectBrokerage={false}
        brokerage={authorization?.brokerage.id}
        updateBrokerageAuthorizationId={authorization?.id}
        allowSelectType={allowSelectType}
        type={defaultType}
        name={name}
        isDemo={isDemo}
      />
    </React.Fragment>
  );
  if (align && align === 'left') {
    return <LeftOrder>{picker}</LeftOrder>;
  } else {
    return <Order>{picker}</Order>;
  }
};

export default ConnectionUpdate;
