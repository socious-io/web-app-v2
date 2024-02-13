import { useEffect, useState } from 'react';
import { Message, chatMessages } from 'src/core/api';

export const useChatDetails = (id?: string) => {
  const [messages, setMessages] = useState<Message[]>();
  const getMessages = async () => {
    if (id) {
      const res = await chatMessages(id, { page: 1 });
      setMessages(res.items);
    }
  };
  useEffect(() => {
    getMessages();
  }, [id]);

  return { messages };
};
