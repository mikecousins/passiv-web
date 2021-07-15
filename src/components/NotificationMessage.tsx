import React, { useState } from 'react';
import styled from '@emotion/styled';
import {
  faChevronDown,
  faChevronUp,
  faExclamationTriangle,
  faInfoCircle,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { H2, Table } from '../styled/GlobalElements';
import { postData } from '../api';
import { useDispatch } from 'react-redux';
import { loadSettings } from '../actions';
import { toast } from 'react-toastify';

type ContainerProps = {
  error: boolean;
};
export const Container = styled.div<ContainerProps>`
  position: relative;
  box-shadow: var(--box-shadow);
  border-radius: 4px;
  padding: 20px 20px 10px 20px;
  margin-bottom: 50px;
  margin-top: 0;
  background: ${(props) =>
    props.error ? 'var(--brand-light-orange)' : 'white'};
  border-bottom: 6px solid
    ${(props) => (props.error ? 'var(--brand-orange)' : 'var(--brand-green)')};
  &:after {
    content: '';
    position: absolute;
    right: 0;
    bottom: 0;
    width: 0;
    height: 0;
    border-bottom: 60px solid
      ${(props) => (props.error ? 'var(--brand-orange)' : 'var(--brand-green)')};
    border-left: 60px solid transparent;
  }
  p,
  a {
    font-size: 22px;
  }
`;

const CloseBtn = styled.button`
  float: right;
`;

type HeadProps = {
  open: boolean;
  alwaysOpen: boolean;
  marginTop: boolean;
};
const Head = styled(Table)<HeadProps>`
  align-items: center;
  cursor: ${(props) => !props.alwaysOpen && 'pointer'};
  margin-bottom: ${(props) => (props.open ? '20px' : '0px')};
  margin-top: ${(props) => (props.marginTop ? '30px' : '0px')};
`;

const Title = styled(H2)`
  font-weight: 900;
  line-height: 35px;
  letter-spacing: 0.44px;
  margin-bottom: 10px;
  font-size: 30px;
  svg {
    margin-right: 10px;
  }
`;

const ChevronBtn = styled.button`
  svg {
    margin-right: 50px;
    font-size: 25px;
    font-weight: 900;
    align-content: center;
  }
`;

const Body = styled.div`
  padding: 0px 40px 0px;
`;

type Props = {
  error: boolean;
  title: string;
  alwaysOpen: boolean;
  closeBtn?: boolean;
  contextualMessageName?: string;
  children: JSX.Element;
};

const NotificationMessage = ({
  error,
  title,
  alwaysOpen,
  closeBtn,
  contextualMessageName,
  children,
}: Props) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(alwaysOpen ? true : false);

  return (
    <Container error={error}>
      {closeBtn && (
        <CloseBtn
          //TODO use HideButton component instead (on onboarding branch)
          onClick={() => {
            postData(`/api/v1/contextualMessages`, {
              name: [contextualMessageName],
            })
              .then((response) => {
                dispatch(loadSettings());
              })
              .catch((error) => {
                toast.error(
                  `Failed to hide contextual message ${contextualMessageName}`,
                );
              });
          }}
        >
          <FontAwesomeIcon icon={faTimes} size="2x" />
        </CloseBtn>
      )}

      <Head
        onClick={() => {
          if (!alwaysOpen) {
            setOpen(!open);
          }
        }}
        open={open}
        alwaysOpen={alwaysOpen}
        marginTop={closeBtn ? closeBtn : false}
      >
        <div>
          <Title>
            {error ? (
              <FontAwesomeIcon
                icon={faExclamationTriangle}
                color="var(--brand-orange)"
              />
            ) : (
              <FontAwesomeIcon icon={faInfoCircle} color="var(--brand-green)" />
            )}
            {title}
          </Title>
        </div>
        {!alwaysOpen && (
          <ChevronBtn>
            <FontAwesomeIcon
              icon={open ? faChevronUp : faChevronDown}
              size="lg"
            />
          </ChevronBtn>
        )}
      </Head>
      <Body>{open && children}</Body>
    </Container>
  );
};

export default NotificationMessage;
