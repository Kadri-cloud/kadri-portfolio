// src/components/chat/AIChat.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bot, X, Send, User, Rocket, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
// FIX: Importing from our new centralized persona file
import { KADRI_OS_PERSONA } from '@/lib/persona';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export default function AIChat({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: 'user',
      timestamp: new Date()
    };
    
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // We just send the messages; the server now figures out if it's the first message.
        body: JSON.stringify({ messages: newMessages })
      });

      if (!response.ok) throw new Error('Failed to get response from the server.');
      
      const data = await response.json();
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.content,
        role: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: KADRI_OS_PERSONA.defaultResponse,
        role: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Set the initial welcome message from our persona file.
    if (messages.length === 0) {
      setMessages([{
        id: 'welcome',
        content: KADRI_OS_PERSONA.welcomeMessage,
        role: 'assistant',
        timestamp: new Date()
      }]);
    }
  }, [messages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="relative flex flex-col w-full max-w-3xl h-[80vh] bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl border border-primary/30 shadow-2xl overflow-hidden"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-primary/20 to-primary/10 border-b border-primary/20">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-primary/10 text-primary"><Bot className="h-6 w-6" /></div>
            <div>
              <h2 className="font-bold text-lg">KadriOS Digital Replica</h2>
              <div className="flex items-center gap-2">
                <div className={cn("h-2 w-2 rounded-full", isLoading ? "bg-yellow-400 animate-pulse" : "bg-green-400")} />
                <span className="text-xs text-muted-foreground">{isLoading ? "Processing..." : "Online"}</span>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary" onClick={onClose}><X className="h-5 w-5" /></Button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-primary/50 scrollbar-track-slate-700/50">
          {messages.map(message => (
            <motion.div key={message.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={cn("flex gap-3", message.role === 'user' ? 'justify-end' : 'justify-start')}>
              {message.role === 'assistant' && (<div className="flex-shrink-0 mt-1 p-1.5 rounded-full bg-primary/10 text-primary self-start"><Bot className="h-4 w-4" /></div>)}
              <div className={cn("max-w-[80%] rounded-xl p-3 prose prose-invert prose-sm prose-p:my-2", message.role === 'user' ? 'bg-primary/10 border border-primary/20' : 'bg-slate-700/50 border border-slate-600/50')}>
                <Markdown remarkPlugins={[remarkGfm]}>{message.content}</Markdown>
                <div className="text-xs text-muted-foreground mt-2 text-right">{message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
              </div>
              {message.role === 'user' && (<div className="flex-shrink-0 mt-1 p-1.5 rounded-full bg-blue-500/10 text-blue-400 self-start"><User className="h-4 w-4" /></div>)}
            </motion.div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <form onSubmit={handleSubmit} className="p-4 border-t border-slate-700/50 bg-slate-900/50">
          <div className="relative">
            <Textarea value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSubmit(e); } }} placeholder="Ask about my projects, skills, or experience..." className="pr-12 resize-none" rows={2} disabled={isLoading}/>
            <Button type="submit" size="icon" className="absolute right-2 bottom-2 h-8 w-8" disabled={!input.trim() || isLoading}>{isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}</Button>
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="text-xs text-muted-foreground">Powered by KadriOS</span>
            <div className="flex items-center gap-1 text-xs text-primary"><Rocket className="h-3 w-3" /><span>Digital Replica v1.0</span></div>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}