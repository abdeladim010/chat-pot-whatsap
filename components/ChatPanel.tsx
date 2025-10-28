
import React, { useState, useRef, useEffect, useCallback } from 'react';
import type { Message } from '../types';
import { sendMessage } from '../services/geminiService';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { DashboardIcon } from './icons/DashboardIcon';

interface ChatPanelProps {
  onToggleDashboard: () => void;
}

const ChatPanel: React.FC<ChatPanelProps> = ({ onToggleDashboard }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init',
      text: 'Salam! Ana Bot dyalek. Kifach n9der n3awnek lyom?',
      sender: 'bot',
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = useCallback(async (inputText: string, imageFile?: File) => {
    if (!inputText.trim() && !imageFile) return;

    const userMessageId = Date.now().toString();
    const newUserMessage: Message = {
      id: userMessageId,
      text: inputText,
      sender: 'user',
      image: imageFile ? URL.createObjectURL(imageFile) : undefined,
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setIsLoading(true);

    const botMessageId = (Date.now() + 1).toString();
    const newBotMessage: Message = { id: botMessageId, text: '', sender: 'bot' };
    setMessages((prev) => [...prev, newBotMessage]);
    
    try {
      const stream = sendMessage(inputText, imageFile);
      let fullResponse = '';
      for await (const chunk of stream) {
        fullResponse += chunk;
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === botMessageId ? { ...msg, text: fullResponse } : msg
          )
        );
      }
    } catch (error) {
      console.error(error);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === botMessageId ? { ...msg, text: "Sme7 lia, w9e3 chi ghalat." } : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="h-full bg-white flex flex-col">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <div>
          <p className="text-xs text-gray-500 uppercase">Chat Interface</p>
          <h2 className="text-xl font-bold text-gray-800">WhatsApp Bot</h2>
        </div>
        <button
          onClick={onToggleDashboard}
          className="p-2 text-gray-600 hover:text-gray-900 rounded-full hover:bg-gray-100"
          aria-label="Open dashboard"
        >
          <DashboardIcon />
        </button>
      </div>
      <div
        className="flex-1 p-6 overflow-y-auto bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519046904884-53123b34b3CC?q=80&w=2070&auto=format&fit=crop')" }}
      >
        <div className="flex flex-col gap-4">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
          {isLoading && messages[messages.length-1].sender === 'bot' && (
             <div className="flex justify-start">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl rounded-bl-none p-4 max-w-lg shadow-sm">
                    <div className="flex items-center justify-center space-x-1">
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse [animation-delay:-0.3s]"></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse [animation-delay:-0.15s]"></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"></div>
                    </div>
                </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="p-4 border-t border-gray-200 bg-white">
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default ChatPanel;
