
import React from 'react';
import type { Message } from '../types';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.sender === 'user';
  
  return (
    <div className={`flex items-end gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`rounded-2xl p-3 shadow-sm max-w-lg text-gray-800 ${isUser ? 'bg-green-200/80 backdrop-blur-sm rounded-br-none' : 'bg-white/80 backdrop-blur-sm rounded-bl-none'}`}>
        {message.image && (
          <img src={message.image} alt="Uploaded content" className="rounded-lg mb-2 max-h-60" />
        )}
        {message.text && <p className="whitespace-pre-wrap">{message.text}</p>}
      </div>
    </div>
  );
};

export default ChatMessage;
