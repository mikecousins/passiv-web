import { useSelector } from 'react-redux';
import { selectContextualMessages } from '../selectors';

export type Message = {
  name: string;
  content: any;
  visible: boolean;
};

type Props = {
  messages: Message[];
};

export const ContextualMessageMultiWrapper = ({ messages }: Props) => {
  const availableMessages = useSelector(selectContextualMessages);

  let content = null;

  for (const message of messages) {
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
