
import React, { useState, useRef } from 'react';
import { PaperAirplaneIcon } from './icons/PaperAirplaneIcon';
import { AttachmentIcon } from './icons/AttachmentIcon';

interface ChatInputProps {
  onSendMessage: (text: string, imageFile?: File) => void;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [text, setText] = useState('');
  const [imageFile, setImageFile] = useState<File | undefined>();
  const [imagePreview, setImagePreview] = useState<string | undefined>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() || imageFile) {
      onSendMessage(text, imageFile);
      setText('');
      setImageFile(undefined);
      setImagePreview(undefined);
      if(fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImageFile(undefined);
    setImagePreview(undefined);
    if(fileInputRef.current) {
        fileInputRef.current.value = '';
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
       {imagePreview && (
        <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-gray-200">
          <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
          <button
            type="button"
            onClick={removeImage}
            className="absolute top-1 right-1 bg-black bg-opacity-50 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
            aria-label="Remove image"
          >
            &#x2715;
          </button>
        </div>
      )}
      <div className="flex items-center gap-2 p-2 rounded-lg bg-gray-100">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="p-2 text-gray-500 hover:text-gray-700"
          aria-label="Attach file"
        >
          <AttachmentIcon />
        </button>
        <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
            accept="image/*"
        />
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Sowel ay 7aja aw la7 chi tsawira..."
          className="flex-1 bg-transparent focus:outline-none placeholder-gray-500"
          disabled={isLoading}
        />
        <button
          type="submit"
          className="p-2 rounded-full bg-blue-500 text-white disabled:bg-blue-300 transition-colors"
          disabled={isLoading || (!text.trim() && !imageFile)}
          aria-label="Send message"
        >
          <PaperAirplaneIcon />
        </button>
      </div>
    </form>
  );
};

export default ChatInput;
