import styled from '@emotion/styled';
import Dialog from '@reach/dialog';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Group } from '../selectors/groups';
import { GroupData } from '../types/group';

const Container = styled.div`
  margin: 10px 30px;
`;

const YoloBtn = styled.button`
  padding: 10px 28px;
  border: 2px solid var(--brand-green);
  border-radius: 8px;
  font-weight: 700;
  transition: all 0.5s ease-Out;
  :hover {
    color: white;
    background-color: orange;
    border: 2px solid orange;
  }
`;

type Props = {
  group: GroupData;
};

const WSB = ({ group }: Props) => {
  const [showDialog, setShowDialog] = useState(false);
  console.log(group);

  return (
    <Container>
      <YoloBtn onClick={() => setShowDialog(true)}>YOLO</YoloBtn>
      <Dialog
        isOpen={showDialog}
        onDismiss={() => setShowDialog(false)}
        style={{ borderRadius: '4px' }}
        aria-labelledby="dialog1Title"
        aria-describedby="dialog1Desc"
      ></Dialog>
    </Container>
  );
};

export default WSB;
