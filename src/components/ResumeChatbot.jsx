import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, Loader2, MessageCircle, X, Minimize2, Maximize2, Volume2, VolumeX, Pause, Play } from 'lucide-react';
import gsap from 'gsap';
import { useTheme } from '../context/ThemeContext';
import getResumePrompt from './data/gopalPrompt';

const ResumeChatbot = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm Gopal's AI assistant. Ask me anything about his experience, skills, or projects!",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [streamingText, setStreamingText] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAudio, setCurrentAudio] = useState(null);
  const [audioQueue, setAudioQueue] = useState([]);

  const messagesEndRef = useRef(null);
  const chatboxRef = useRef(null);
  const inputRef = useRef(null);

  const resumeData = {
    name: "Gopal Khandelwal",
    title: "AI/ML Engineer & Full Stack Developer",
    contact: { phone: "+91 8296294193", email: "gopalkhandelwal063@gmail.com", location: "Alwar, Rajasthan, India" },
    summary: "AI/ML Engineer and Full Stack Developer specializing in LLM integration, real-time AI systems, and scalable web applications. Experienced in building conversational AI agents, semantic search platforms, and voice-enabled AI solutions. Proven track record of boosting user engagement by 40% and reducing server latency by 25%.",
    experience: [
      { company: "LIGHTNING TECHNOLOGY", position: "AI/ML FULLSTACK ENGINEER", period: "Mar 2025 — Present", location: "Remote, India",
        achievements: ["Engineered 'Knowledge Navigator,' an AI-powered SaaS platform with LLM-driven document comparison and semantic search capabilities", "Implemented advanced prompt engineering and RAG for enhanced AI responses", "Optimized real-time LLM response streaming with advanced buffer management", "Developed 'Zain,' an interactive AI module with real-time speech recognition", "Architected responsive AI interfaces using React.js, Redux, and Tailwind CSS"] },
      { company: "SHIVAI-INFOTECH", position: "AI SOFTWARE ENGINEER", period: "Feb 2024 — Jan 2025", location: "Bangalore, India",
        achievements: ["Developed AI-powered car simulator with computer vision for RTO India", "Integrated Google ML Kit for facial recognition with 95% accuracy", "Implemented real-time data processing pipelines for AI model inference", "Improved simulator performance by 30% through optimized AI algorithms"] },
      { company: "PLANET EATERS GAME", position: "SENIOR MERN STACK DEVELOPER", period: "Aug 2021 — Feb 2024", location: "Remote, U.S",
        achievements: ["Built scalable backend systems with Node.js, Express.js, and MongoDB", "Reduced latency by 25% through efficient data structures and caching", "Developed intelligent player matching algorithms using machine learning", "Increased user engagement by 40% through AI-driven game mechanics"] }
    ],
    projects: [
      { name: "MEERA HEALTH AGENT", tech: "Flask, LiveKit, Google AI, WebRTC", description: "Real-time conversational AI health agent with voice-enabled interactions and speech recognition" },
      { name: "AI RESUME SHORTLISTER", tech: "React, TypeScript, Google Gemini AI", description: "AI-powered resume screening platform reducing manual screening time by 70%" },
      { name: "LEGEND MOTORS APP", tech: "React Native, AI/ML APIs", description: "Computer vision system for vehicle damage assessment with 90% accuracy" }
    ],
    skills: {
      aiMl: ["LLMs", "OpenAI GPT", "Google AI", "Prompt Engineering", "RAG Systems", "Vector DBs", "LangChain"],
      programming: ["Python", "JavaScript", "TypeScript", "SQL", "C++", "Java"],
      frontend: ["React.js", "React Native", "Redux", "Tailwind CSS", "HTML/CSS"],
      backend: ["Node.js", "Flask", "Express.js", "RESTful APIs", "GraphQL", "FastAPI"],
      databases: ["MongoDB", "PostgreSQL", "Pinecone", "ChromaDB", "MySQL", "Redis"],
      devops: ["Docker", "Git", "AWS", "Firebase", "WebSockets", "JWT"]
    },
    education: { degree: "B.TECH Computer Science", university: "UPES", gpa: "8.01/10", year: "July 2021" }
  };

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, streamingText]);

  useEffect(() => {
    if (isOpen && chatboxRef.current) {
      gsap.fromTo(chatboxRef.current, { scale: 0.95, opacity: 0, y: 20 }, { scale: 1, opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' });
    }
  }, [isOpen]);

  const handleAudioEnd = () => { setIsPlaying(false); setCurrentAudio(null);
    if (audioQueue.length > 0) { const next = audioQueue[0]; setAudioQueue(prev => prev.slice(1)); playAudio(next); }
  };
  const handleAudioError = () => { setIsPlaying(false); setCurrentAudio(null); };

  useEffect(() => {
    if (currentAudio) {
      currentAudio.addEventListener('ended', handleAudioEnd);
      currentAudio.addEventListener('error', handleAudioError);
      return () => { currentAudio.removeEventListener('ended', handleAudioEnd); currentAudio.removeEventListener('error', handleAudioError); };
    }
  }, []);

  const generateGroqTTS = async (text) => {
    if (isMuted || !text.trim()) return null;
    try {
      const response = await fetch('https://api.groq.com/openai/v1/audio/speech', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: 'canopylabs/orpheus-v1-english', voice: 'autumn', response_format: 'wav', input: text.replace(/[*_#`]/g, '').trim() }),
      });
      if (!response.ok) throw new Error(`TTS API error: ${response.status}`);
      const audioBlob = await response.blob();
      return URL.createObjectURL(audioBlob);
    } catch (error) { console.error('Groq TTS Error:', error); return null; }
  };

  const playAudio = (audioUrl) => {
    if (!audioUrl) return;
    const audio = new Audio(audioUrl);
    setCurrentAudio(audio); setIsPlaying(true);
    audio.play().catch(() => { setIsPlaying(false); setCurrentAudio(null); });
  };

  const stripThinking = (text) => {
    let out = text.replace(/<think>[\s\S]*?<\/think>/gi, '');
    const lastOpen = out.lastIndexOf('<think>');
    if (lastOpen !== -1) {
      out = out.slice(0, lastOpen);
    }
    return out.trim();
  };

  const streamResponse = async (userMessage) => {
    const context = getResumePrompt(resumeData, userMessage);

    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${import.meta.env.VITE_GROQ_API_KEY}` },
        body: JSON.stringify({
          model: 'qwen/qwen3-32b',
          messages: [{ role: 'user', content: context }],
          max_completion_tokens: 4096,
          temperature: 0.6,
          top_p: 0.95,
          stream: true,
        })
      });
      if (!response.ok) throw new Error('Groq API failed');
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullText = '';
      setIsStreaming(true); setStreamingText('');

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        for (const line of chunk.split('\n')) {
          if (line.startsWith('data: ')) {
            const d = line.slice(6);
            if (d === '[DONE]') continue;
            try {
              const parsed = JSON.parse(d);
              const content = parsed.choices[0]?.delta?.content || '';
              if (content) {
                fullText += content;
                const displayText = stripThinking(fullText);
                setStreamingText(displayText);
              }
            }
            catch { /* ignore */ }
          }
        }
      }
      const finalText = stripThinking(fullText);
      setIsStreaming(false);
      if (finalText && !isMuted) { const audioUrl = await generateGroqTTS(finalText); if (audioUrl) playAudio(audioUrl); }
      return finalText;
    } catch (error) {
      console.error('Streaming error:', error);
      setIsStreaming(false);
      const fallbacks = { experience: "Gopal has 3+ years as an AI/ML Engineer. Currently at Lightning Technology building 'Knowledge Navigator' and 'Zain' AI systems.", skills: "Gopal specializes in LLMs, OpenAI GPT, Google AI, prompt engineering, and RAG systems.", projects: "Notable projects: MEERA HEALTH AGENT, AI RESUME SHORTLISTER, LEGEND MOTORS APP.", contact: "Reach Gopal at +91 8296294193 or gopalkhandelwal063@gmail.com.", education: "B.TECH Computer Science from UPES with 8.01/10 GPA." };
      const q = userMessage.toLowerCase();
      let resp = "I can tell you about Gopal's experience, skills, projects, education, or contact info.";
      if (q.includes('experience') || q.includes('work') || q.includes('job')) resp = fallbacks.experience;
      else if (q.includes('skill') || q.includes('tech')) resp = fallbacks.skills;
      else if (q.includes('project')) resp = fallbacks.projects;
      else if (q.includes('contact') || q.includes('phone') || q.includes('email')) resp = fallbacks.contact;
      else if (q.includes('education') || q.includes('degree')) resp = fallbacks.education;
      if (!isMuted) { const audioUrl = await generateGroqTTS(resp); if (audioUrl) playAudio(audioUrl); }
      return resp;
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    setMessages(prev => [...prev, { id: Date.now(), text: inputValue, isBot: false, timestamp: new Date() }]);
    const query = inputValue; setInputValue(''); setIsLoading(true);
    try {
      const response = await streamResponse(query);
      setMessages(prev => [...prev, { id: Date.now() + 1, text: response, isBot: true, timestamp: new Date() }]);
      setStreamingText('');
    } catch (error) { console.error('Message error:', error); }
    finally { setIsLoading(false); }
  };

  const handleKeyPress = (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendMessage(); } };
  const toggleMute = () => { setIsMuted(!isMuted); if (currentAudio && !isMuted) { currentAudio.pause(); setIsPlaying(false); } };
  const togglePlayPause = () => { if (currentAudio) { if (isPlaying) { currentAudio.pause(); setIsPlaying(false); } else { currentAudio.play(); setIsPlaying(true); } } };
  const formatTime = (date) => date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-8 sm:right-8 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-accent hover:bg-accent-dark rounded-2xl shadow-lg shadow-accent/20
                     flex items-center justify-center text-white transition-all duration-200 hover:scale-105 hover:shadow-glow"
        >
          <MessageCircle size={22} />
        </button>
      )}

      {isOpen && (
        <div
          ref={chatboxRef}
          className={`w-[380px] max-w-[calc(100vw-2rem)] rounded-3xl shadow-2xl flex flex-col transition-all duration-200
                     ${isDark
                       ? 'bg-surface-900 border border-surface-800 shadow-black/40'
                       : 'bg-white border border-surface-200 shadow-soft-lg'
                     } ${isMinimized ? 'h-[56px]' : 'h-[540px]'}`}
        >
          <div className={`flex items-center justify-between px-5 py-3.5 border-b flex-shrink-0 rounded-t-3xl
                          ${isDark ? 'border-surface-800' : 'border-surface-100'}`}>
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-9 h-9 bg-accent rounded-xl flex items-center justify-center">
                  <Bot size={17} className="text-white" />
                </div>
                <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2
                                ${isDark ? 'border-surface-900' : 'border-white'}`} />
              </div>
              <div>
                <h3 className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-surface-900'}`}>AI Assistant</h3>
                <p className={`text-[10px] ${isDark ? 'text-surface-500' : 'text-surface-400'}`}>
                  {isPlaying ? 'Speaking...' : 'Online'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-0.5">
              {currentAudio && (
                <button onClick={togglePlayPause} className={`p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-surface-800 text-surface-500' : 'hover:bg-surface-50 text-surface-400'}`}>
                  {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                </button>
              )}
              <button onClick={toggleMute} className={`p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-surface-800 text-surface-500' : 'hover:bg-surface-50 text-surface-400'}`}>
                {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
              </button>
              <button onClick={() => setIsMinimized(!isMinimized)} className={`p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-surface-800 text-surface-500' : 'hover:bg-surface-50 text-surface-400'}`}>
                {isMinimized ? <Maximize2 size={14} /> : <Minimize2 size={14} />}
              </button>
              <button onClick={() => setIsOpen(false)} className={`p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-surface-800 text-surface-500' : 'hover:bg-surface-50 text-surface-400'}`}>
                <X size={14} />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                    <div className={`max-w-[82%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.isBot
                        ? isDark ? 'bg-surface-800 text-surface-200 rounded-bl-md' : 'bg-surface-50 text-surface-700 rounded-bl-md'
                        : 'bg-accent text-white rounded-br-md'
                    }`}>
                      <p className="whitespace-pre-wrap">{msg.text}</p>
                      <p className={`text-[10px] mt-1 ${msg.isBot ? (isDark ? 'text-surface-600' : 'text-surface-400') : 'text-white/50'}`}>
                        {formatTime(msg.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
                {isStreaming && streamingText && (
                  <div className="flex justify-start">
                    <div className={`max-w-[82%] px-4 py-2.5 rounded-2xl rounded-bl-md text-sm ${isDark ? 'bg-surface-800 text-surface-200' : 'bg-surface-50 text-surface-700'}`}>
                      <p className="whitespace-pre-wrap">{streamingText}<span className="inline-block w-1.5 h-4 bg-accent animate-pulse ml-0.5" /></p>
                    </div>
                  </div>
                )}
                {isLoading && !isStreaming && (
                  <div className="flex justify-start">
                    <div className={`px-4 py-2.5 rounded-2xl rounded-bl-md text-sm flex items-center gap-2 ${isDark ? 'bg-surface-800 text-surface-500' : 'bg-surface-50 text-surface-400'}`}>
                      <Loader2 size={14} className="animate-spin" /><span>Thinking...</span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className={`p-4 border-t flex-shrink-0 ${isDark ? 'border-surface-800' : 'border-surface-100'}`}>
                <div className="flex items-center gap-2">
                  <input
                    ref={inputRef} type="text" value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)} onKeyPress={handleKeyPress}
                    placeholder="Ask about experience, skills..."
                    className={`flex-1 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all ${
                      isDark
                        ? 'bg-surface-800 border border-surface-700 text-white placeholder-surface-500'
                        : 'bg-surface-50 border border-surface-200 text-surface-900 placeholder-surface-400'
                    }`}
                    disabled={isLoading || isStreaming}
                  />
                  <button onClick={handleSendMessage} disabled={isLoading || isStreaming || !inputValue.trim()}
                    className="w-10 h-10 bg-accent hover:bg-accent-dark rounded-xl flex items-center justify-center text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                    <Send size={15} />
                  </button>
                </div>
                <div className="flex gap-1.5 mt-2.5">
                  {["Experience?", "Projects?", "Skills?"].map((s, i) => (
                    <button key={i} onClick={() => setInputValue(s)} disabled={isLoading || isStreaming}
                      className={`px-3 py-1.5 text-[11px] rounded-lg font-medium transition-colors disabled:opacity-40 ${
                        isDark
                          ? 'text-surface-500 bg-surface-800 border border-surface-700 hover:text-surface-300 hover:border-surface-600'
                          : 'text-surface-500 bg-surface-50 border border-surface-200 hover:text-surface-700 hover:border-surface-300'
                      }`}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ResumeChatbot;
