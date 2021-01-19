import styled from '@emotion/styled';
import {
  faExclamationTriangle,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { SmallButton } from '../styled/Button';
import { H1, P, Table } from '../styled/GlobalElements';
import { ColumnWarning } from '../styled/Group';

type Props = {
  targets: any;
};

const WarningDiv = styled(ColumnWarning)`
  margin: 20px !important;
  background-color: ;
`;

const CloseButton = styled.div`
  text-align: right;
`;

const ListOfAssets = styled.ul`
  font-size: 1.3rem;
  text-align: left;
  margin: 30px;
`;

const DontShowBtn = styled.div`
  text-align: left;
`;

const SecuritiesNotInTarget = ({ targets }: Props) => {
  return (
    <>
      <WarningDiv>
        <CloseButton>
          <button>
            <FontAwesomeIcon icon={faTimesCircle} />
          </button>
        </CloseButton>
        <H1>
          <FontAwesomeIcon icon={faExclamationTriangle} />
          Warning
        </H1>
        <P>
          We noticed that you added the following securities in your account and
          since these assets are not included in your target portfolio, they may
          impact your portfolio accuracy or trade calculations.
        </P>
        <ListOfAssets>
          {targets!.map((sec: any) => {
            return (
              <Table style={{ marginBottom: '10px' }}>
                <div>
                  <span style={{ fontWeight: 600 }}>
                    {sec.universal_symbol.symbol}
                  </span>{' '}
                  - {sec.universal_symbol.description}
                </div>
                <SmallButton
                  style={{
                    float: 'right',
                  }}
                >
                  Add to Portfolio
                </SmallButton>
              </Table>
            );
          })}
        </ListOfAssets>

        <DontShowBtn>
          <SmallButton
            style={{
              background: 'transparent',
              color: 'var(--brand-blue)',
              border: '1px solid var(--brand-blue)',
            }}
          >
            Do not show this message again
          </SmallButton>
        </DontShowBtn>
      </WarningDiv>
    </>
  );
};

export default SecuritiesNotInTarget;
