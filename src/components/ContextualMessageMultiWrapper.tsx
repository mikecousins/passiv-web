import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectContextualMessages } from '../selectors';
import { loadSettings } from '../actions';
import { Button } from '../styled/Button';
import styled from '@emotion/styled';
import { postData } from '../api';
import { toast } from 'react-toastify';

const PaddedButton = styled(Button)`
  margin-right: 10px;
  float: right;
`;

export type Message = {
  name: string;
  content: any;
  visible: boolean;
};

type Props = {
  messages: Message[];
};
//
// export const HideButton = ({ names }: Props) => {
//   const dispatch = useDispatch();
//   return (
//     <PaddedButton
//       onClick={() => {
//         postData(`/api/v1/contextualMessages`, {
//           name: [name],
//         })
//           .then((response) => {
//             dispatch(loadSettings());
//           })
//           .catch((error) => {
//             toast.error(`Failed to hide contextual message "${name}".`);
//           });
//       }}
//     >
//       Hide
//     </PaddedButton>
//   );
// };

export const ContextualMessageMultiWrapper = ({ messages }: Props) => {
  const availableMessages = useSelector(selectContextualMessages);

  let content = null;

  for (const message of messages) {
    console.log(message);
    if (
      availableMessages &&
      availableMessages.some(
        (availableMessage) => availableMessage === message.name,
      )
    ) {
      if (message.visible) {
        content = message.content;
        break;
      }
    }
  }

  return content;
};
