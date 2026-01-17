
import React, { useEffect, useRef, useState } from 'react';
import { GoogleGenAI, Chat } from '@google/genai';

interface Message {
  text: string;
  isUser: boolean;
  id: string;
}

interface LiveSupportModalProps {
  onClose: () => void;
}

const LiveSupportModal: React.FC<LiveSupportModalProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 'start', text: "Hi! I'm your PathShare AI Assistant. How can I help you travel better today?", isUser: false }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<Chat | null>(null);

  useEffect(() => {
    const initChat = async () => {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const chat = ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
          systemInstruction: 'You are PathShare Support. Help users understand how PathShare reduces traffic and pollution by sharing empty seats. Be friendly, concise, and professional. Provide clear instructions on how to use the app, verify identities, and handle payments.',
        },
      });
      chatRef.current = chat;
    };
    initChat();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputValue.trim() || !chatRef.current) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      const result = await chatRef.current.sendMessage({ message: userMessage.text });
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: result.text || "I'm sorry, I couldn't process that. Please try again.",
        isUser: false,
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("Chat error:", error);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center animate-fade-in">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-md bg-white rounded-t-[40px] shadow-2xl animate-scale-in flex flex-col h-[85vh]">
        {/* Header */}
        <div className="p-6 border-b border-slate-50 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#0d828c] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-[#0d828c]/20">
              <i className="fa-solid fa-robot"></i>
            </div>
            <div>
              <h3 className="font-black text-slate-900 leading-none">Support Chat</h3>
              <div className="flex items-center gap-1 mt-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">AI Online</span>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center active:scale-90 transition-transform">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        {/* Message Area */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar bg-slate-50/50"
        >
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-4 rounded-3xl text-sm font-medium shadow-sm leading-relaxed ${
                msg.isUser 
                ? 'bg-[#0d828c] text-white rounded-tr-none' 
                : 'bg-white text-slate-700 rounded-tl-none border border-slate-100'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white border border-slate-100 px-4 py-3 rounded-3xl rounded-tl-none flex gap-1 items-center">
                <div className="w-1.5 h-1.5 bg-[#0d828c] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-1.5 h-1.5 bg-[#0d828c] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-1.5 h-1.5 bg-[#0d828c] rounded-full animate-bounce"></div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <form 
          onSubmit={handleSendMessage}
          className="p-6 bg-white border-t border-slate-100 shrink-0"
        >
          <div className="relative flex items-center gap-3">
            <input 
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask anything about PathShare..."
              className="flex-1 bg-slate-50 border border-slate-100 px-5 py-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-[#0d828c]/20 outline-none transition-all placeholder:text-slate-300"
            />
            <button 
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              className="w-14 h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center active:scale-90 disabled:opacity-30 transition-all shadow-xl shadow-slate-900/20"
            >
              <i className="fa-solid fa-paper-plane"></i>
            </button>
          </div>
          <p className="text-[10px] text-center text-slate-400 mt-4 font-bold uppercase tracking-widest opacity-60">
            Powered by PathShare Intelligence
          </p>
        </form>
      </div>
    </div>
  );
};

export default LiveSupportModal;
