import React, { useState } from 'react';
import ShadowBox from '../../styled/ShadowBox';
import { H3 } from '../../styled/GlobalElements';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import styled from '@emotion/styled';

const ClickableH3 = styled(H3)`
  cursor: pointer;
  svg {
    float: right;
    color: var(--brand-green);
  }
`;

type Props = {
  title: string;
  content: React.ReactNode;
};

const CollapseBox = ({ title, content }: Props) => {
  const [showContent, setShowContent] = useState(false);
  return (
    <ShadowBox>
      <ClickableH3 onClick={() => setShowContent(!showContent)}>
        {title}
        <FontAwesomeIcon icon={showContent ? faChevronUp : faChevronDown} />
      </ClickableH3>
      {showContent ? <div>{content}</div> : null}
    </ShadowBox>
  );
};

export default CollapseBox;
