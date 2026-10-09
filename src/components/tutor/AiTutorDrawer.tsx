import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send, Lightbulb, Compass, AlertCircle, Copy, Check, MessageSquare } from 'lucide-react';

interface AiTutorDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentLessonTitle?: string;
  currentContext?: string;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'tutor';
  text: string;
  timestamp: string;
}

export const AiTutorDrawer: React.FC<AiTutorDrawerProps> = ({
  isOpen,
  onClose,
  currentLessonTitle = 'General Computer Science & Linux',
  currentContext = '',
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'tutor',
      text: `Hello! I am your KernelCraft Professor & Technical Mentor.

I am here to help you truly **understand why systems work the way they do**.
Ask me anything about:
• How hardware signals traverse silicon and buses
• Linux kernel syscalls, permissions, or processes
• Network handshakes, CIDR math, or RFC protocols
• Cryptography, defense-in-depth, or authorized lab methodology

What concept would you like to explore or clarify?`,
      timestamp: 'Just now'
    }
  ]);
  const [inputVal, setInputVal] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string, mode = 'standard') => {
    const query = textToSend || inputVal.trim();
    if (!query || isLoading) return;

    const userMsg: ChatMessage = {
      id: String(Date.now()),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputVal('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          context: currentContext,
          mode,
          lessonTitle: currentLessonTitle
        })
      });

      const data = await response.json();
      const tutorReply = data.reply || "I'm reflecting on that concept. Could you rephrase your question?";

      const tutorMsg: ChatMessage = {
        id: String(Date.now() + 1),
        sender: 'tutor',
        text: tutorReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, tutorMsg]);
    } catch (e) {
      console.error('Tutor chat error:', e);
      setMessages(prev => [
        ...prev,
        {
          id: String(Date.now() + 1),
          sender: 'tutor',
          text: `Here is a core conceptual breakdown for **${currentLessonTitle}**:

1. **Physical & Logical Separation**: Always verify which layer you are observing (User Space vs Kernel Space, Physical Frame vs Logical Packet).
2. **Access Control**: Check Subject (UID/Process), Object (Inode/File), and Requested Right (Read/Write/Execute).
3. **Verification**: Run diagnostic inspection commands to confirm your hypothesis before drawing conclusions.

Let me know if you would like an everyday analogy or a step-by-step example!`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const copyMessage = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-[450px] z-50 bg-slate-950 border-l border-slate-800 shadow-2xl flex flex-col">
      {/* Header */}
      <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
              KernelCraft AI Mentor
            </h3>
            <span className="text-[11px] text-slate-400 truncate max-w-[240px] block">
              Lesson: {currentLessonTitle}
            </span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Quick Prompts Bar */}
      <div className="p-2.5 bg-slate-900/60 border-b border-slate-800/80 flex items-center gap-1.5 overflow-x-auto text-[11px]">
        <button
          onClick={() => handleSendMessage(`Can you explain the core concept of "${currentLessonTitle}" differently, using an everyday real-world analogy?`, 'explain-differently')}
          className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 whitespace-nowrap border border-slate-700/60 flex items-center gap-1"
        >
          <Lightbulb className="w-3 h-3 text-amber-400" /> Explain Differently
        </button>
        <button
          onClick={() => handleSendMessage(`Give me a hint for the current exercise in "${currentLessonTitle}" without giving away the direct answer.`, 'hint')}
          className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 whitespace-nowrap border border-slate-700/60 flex items-center gap-1"
        >
          <Compass className="w-3 h-3 text-sky-400" /> Give a Hint
        </button>
        <button
          onClick={() => handleSendMessage(`What are the common pitfalls and mistakes beginners make with "${currentLessonTitle}"?`, 'mistakes')}
          className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 whitespace-nowrap border border-slate-700/60 flex items-center gap-1"
        >
          <AlertCircle className="w-3 h-3 text-rose-400" /> Common Mistakes
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[90%] rounded-xl p-3.5 text-xs leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-slate-900 text-slate-200 border border-slate-800'
              }`}
            >
              <div className="whitespace-pre-wrap">{msg.text}</div>
            </div>

            <div className="flex items-center gap-2 mt-1 px-1 text-[10px] text-slate-500">
              <span>{msg.timestamp}</span>
              {msg.sender === 'tutor' && (
                <button
                  onClick={() => copyMessage(msg.text, msg.id)}
                  className="hover:text-slate-300 flex items-center gap-0.5"
                >
                  {copiedId === msg.id ? <Check className="w-2.5 h-2.5 text-emerald-400" /> : <Copy className="w-2.5 h-2.5" />}
                  {copiedId === msg.id ? 'Copied' : 'Copy'}
                </button>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2 text-xs text-slate-400 italic bg-slate-900/60 p-3 rounded-lg border border-slate-800/60">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-spin" />
            Mentor is analyzing technical principles...
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Box */}
      <div className="p-3 bg-slate-900 border-t border-slate-800">
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
            placeholder="Ask a question or request an explanation..."
            className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
          />
          <button
            type="submit"
            disabled={!inputVal.trim() || isLoading}
            className="p-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white rounded-lg transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
        <span className="text-[10px] text-slate-500 mt-1.5 block text-center">
          Socratic instruction · Defensive & authorized practice only
        </span>
      </div>
    </div>
  );
};
