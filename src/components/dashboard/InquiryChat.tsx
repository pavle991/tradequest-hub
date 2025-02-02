import { useState } from 'react';
import { useInquiryChat } from '@/hooks/use-inquiry-chat';
import { ChatHeader } from './chat/ChatHeader';
import { ChatMessageList } from './chat/ChatMessageList';
import { ChatInput } from './chat/ChatInput';

interface InquiryChatProps {
  inquiryId: string;
}

export function InquiryChat({ inquiryId }: InquiryChatProps) {
  const [messageContent, setMessageContent] = useState('');
  const { messages, loading, sendMessage } = useInquiryChat(inquiryId);

  const handleSendMessage = async () => {
    if (!messageContent.trim()) return;
    
    try {
      await sendMessage(messageContent);
      setMessageContent('');
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  if (loading) {
    return <div>Loading chat...</div>;
  }

  return (
    <div className="flex h-full flex-col">
      <ChatHeader />
      <ChatMessageList messages={messages} />
      <ChatInput 
        value={messageContent}
        onChange={setMessageContent}
        onSend={handleSendMessage}
      />
    </div>
  );
}