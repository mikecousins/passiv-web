import React from 'react';
// import { useSelector } from 'react-redux';
import ShadowBox from '../styled/ShadowBox';
import DemoNotesContent from './DemoNotesContent';
import styled from '@emotion/styled';

const DemoNotesContainer = styled.div`
  transform: translateY(-50%);
  top: 50%;
  position: relative;
  padding-left: 18px;
  color: #000;

  @media (max-width: 900px) {
    padding: 12px 0px;
    transform: none;
  }

  button {
    margin-top: 8px;
  }
`;

const DemoNotes = () => {
  return (
    <ShadowBox background="var(--brand-green)">
      <DemoNotesContainer>
        <DemoNotesContent />
      </DemoNotesContainer>
    </ShadowBox>
  );
};

export default DemoNotes;
