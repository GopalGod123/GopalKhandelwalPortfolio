import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, MessageCircle, X, Minimize2, Maximize2, Volume2, VolumeX, Pause, Play } from 'lucide-react';
import gsap from 'gsap';

const ResumeChatbot = () => {
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
    contact: {
      phone: "+91 8296294193",
      email: "gopalkhandelwal063@gmail.com",
      location: "Alwar, Rajasthan, India"
    },
    summary: "AI/ML Engineer and Full Stack Developer specializing in LLM integration, real-time AI systems, and scalable web applications. Experienced in building conversational AI agents, semantic search platforms, and voice-enabled AI solutions. Proven track record of boosting user engagement by 40% and reducing server latency by 25%.",
    experience: [
      {
        company: "LIGHTNING TECHNOLOGY",
        position: "AI/ML FULLSTACK ENGINEER",
        period: "Mar 2025 — Present",
        location: "Remote, India",
        achievements: [
          "Engineered 'Knowledge Navigator,' an AI-powered SaaS platform with LLM-driven document comparison and semantic search capabilities",
          "Implemented advanced prompt engineering and RAG for enhanced AI responses",
          "Optimized real-time LLM response streaming with advanced buffer management",
          "Developed 'Zain,' an interactive AI module with real-time speech recognition",
          "Architected responsive AI interfaces using React.js, Redux, and Tailwind CSS"
        ]
      },
      {
        company: "SHIVAI-INFOTECH",
        position: "AI SOFTWARE ENGINEER",
        period: "Feb 2024 — Jan 2025",
        location: "Bangalore, India",
        achievements: [
          "Developed AI-powered car simulator with computer vision for RTO India",
          "Integrated Google ML Kit for facial recognition with 95% accuracy",
          "Implemented real-time data processing pipelines for AI model inference",
          "Improved simulator performance by 30% through optimized AI algorithms"
        ]
      },
      {
        company: "PLANET EATERS GAME",
        position: "SENIOR MERN STACK DEVELOPER",
        period: "Aug 2021 — Feb 2024",
        location: "Remote, U.S",
        achievements: [
          "Built scalable backend systems with Node.js, Express.js, and MongoDB",
          "Reduced latency by 25% through efficient data structures and caching",
          "Developed intelligent player matching algorithms using machine learning",
          "Increased user engagement by 40% through AI-driven game mechanics"
        ]
      }
    ],
    projects: [
      {
        name: "MEERA HEALTH AGENT",
        tech: "Flask, LiveKit, Google AI, WebRTC",
        period: "Jan 2025 - Present",
        description: "Real-time conversational AI health agent with voice-enabled interactions and speech recognition"
      },
      {
        name: "AI RESUME SHORTLISTER",
        tech: "React, TypeScript, Google Gemini AI",
        period: "Jan 2025",
        description: "AI-powered resume screening platform reducing manual screening time by 70%"
      },
      {
        name: "LEGEND MOTORS APP",
        tech: "React Native, AI/ML APIs",
        period: "Dec 2024",
        description: "Computer vision system for vehicle damage assessment with 90% accuracy"
      }
    ],
    skills: {
      aiMl: ["LLMs", "OpenAI GPT", "Google AI", "Prompt Engineering", "RAG Systems", "Vector DBs", "LangChain"],
      programming: ["Python", "JavaScript", "TypeScript", "SQL", "C++", "Java"],
      frontend: ["React.js", "React Native", "Redux", "Tailwind CSS", "HTML/CSS"],
      backend: ["Node.js", "Flask", "Express.js", "RESTful APIs", "GraphQL", "FastAPI"],
      databases: ["MongoDB", "PostgreSQL", "Pinecone", "ChromaDB", "MySQL", "Redis"],
      devops: ["Docker", "Git", "AWS", "Firebase", "WebSockets", "JWT"]
    },
    education: {
      degree: "B.TECH Computer Science",
      university: "UPES",
      gpa: "8.01/10",
      year: "July 2021"
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingText]);

  useEffect(() => {
    if (isOpen && chatboxRef.current) {
      gsap.fromTo(chatboxRef.current,
        { scale: 0.95, opacity: 0, y: 20 },
        { scale: 1, opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' }
      );
    }
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleAudioEnd = () => {
    setIsPlaying(false);
    setCurrentAudio(null);
    if (audioQueue.length > 0) {
      const nextAudio = audioQueue[0];
      setAudioQueue(prev => prev.slice(1));
      playAudio(nextAudio);
    }
  };

  const handleAudioError = () => {
    setIsPlaying(false);
    setCurrentAudio(null);
  };

  useEffect(() => {
    if (currentAudio) {
      currentAudio.addEventListener('ended', handleAudioEnd);
      currentAudio.addEventListener('error', handleAudioError);
      return () => {
        currentAudio.removeEventListener('ended', handleAudioEnd);
        currentAudio.removeEventListener('error', handleAudioError);
      };
    }
  }, []);

  const generateGroqTTS = async (text) => {
    if (isMuted || !text.trim()) return null;
    try {
      const response = await fetch('https://api.groq.com/openai/v1/audio/speech', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'canopylabs/orpheus-v1-english',
          voice: 'autumn',
          response_format: 'wav',
          input: text.replace(/[*_#`]/g, '').trim(),
        }),
      });
      if (!response.ok) throw new Error(`TTS API error: ${response.status}`);
      const audioBlob = await response.blob();
      return URL.createObjectURL(audioBlob);
    } catch (error) {
      console.error('Groq TTS Error:', error);
      return null;
    }
  };

  const playAudio = (audioUrl) => {
    if (!audioUrl) return;
    const audio = new Audio(audioUrl);
    setCurrentAudio(audio);
    setIsPlaying(true);
    audio.play().catch(() => {
      setIsPlaying(false);
      setCurrentAudio(null);
    });
  };

  const streamResponse = async (userMessage) => {
    const currentExperience = resumeData.experience[0] || {};
    const previousExperience = resumeData.experience.slice(1) || [];

    const context = `You are Gopal Khandelwal's personal AI assistant. Answer questions about his professional background based ONLY on this resume data:

NAME: ${resumeData.name}
TITLE: ${resumeData.title}
SUMMARY: ${resumeData.summary}

CURRENT ROLE: ${currentExperience.position} at ${currentExperience.company} (${currentExperience.period})
KEY ACHIEVEMENTS: ${(currentExperience.achievements || []).join(', ')}

PREVIOUS EXPERIENCE:
${previousExperience.map(exp => `${exp.position} at ${exp.company} (${exp.period}) - ${(exp.achievements || []).join(', ')}`).join('\n')}

TOP PROJECTS:
${(resumeData.projects || []).map(proj => `${proj.name}: ${proj.description} (${proj.tech})`).join('\n')}

SKILLS: ${Object.values(resumeData.skills || {}).flat().join(', ')}

EDUCATION: ${resumeData.education?.degree} from ${resumeData.education?.university}, GPA: ${resumeData.education?.gpa}

CONTACT: ${resumeData.contact?.email}, ${resumeData.contact?.phone}, Based in ${resumeData.contact?.location}

Instructions:
- Be conversational and professional
- Use specific examples from his experience
- Keep responses UNDER 30 WORDS MAXIMUM
- Refer to Gopal in third person
- If asked about something not in resume, redirect politely

User: ${userMessage}`;

    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`
        },
        body: JSON.stringify({
          model: 'llama-3.1-8b-instant',
          messages: [{ role: 'user', content: context }],
          max_tokens: 400,
          temperature: 0.7,
          stream: true
        })
      });

      if (!response.ok) throw new Error('Groq API failed');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullText = '';

      setIsStreaming(true);
      setStreamingText('');

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const d = line.slice(6);
            if (d === '[DONE]') continue;
            try {
              const parsed = JSON.parse(d);
              const content = parsed.choices[0]?.delta?.content || '';
              if (content) {
                fullText += content;
                setStreamingText(fullText);
              }
            // eslint-disable-next-line no-unused-vars
            } catch (e) { /* ignore parse errors */ }
          }
        }
      }

      setIsStreaming(false);

      if (fullText && !isMuted) {
        const audioUrl = await generateGroqTTS(fullText);
        if (audioUrl) playAudio(audioUrl);
      }

      return fullText;

    } catch (error) {
      console.error('Streaming error:', error);
      setIsStreaming(false);

      const fallbacks = {
        experience: "Gopal has 3+ years as an AI/ML Engineer. Currently at Lightning Technology building 'Knowledge Navigator' and 'Zain' AI systems.",
        skills: "Gopal specializes in LLMs, OpenAI GPT, Google AI, prompt engineering, and RAG systems. Expert in React.js, Node.js, Python, TypeScript.",
        projects: "Notable projects: MEERA HEALTH AGENT, AI RESUME SHORTLISTER (70% screening time reduction), LEGEND MOTORS APP (90% accuracy).",
        contact: "Reach Gopal at +91 8296294193 or gopalkhandelwal063@gmail.com. Based in Alwar, Rajasthan.",
        education: "B.TECH Computer Science from UPES with 8.01/10 GPA."
      };

      const query = userMessage.toLowerCase();
      let resp = "I can tell you about Gopal's experience, skills, projects, education, or contact info. What interests you?";

      if (query.includes('experience') || query.includes('work') || query.includes('job')) resp = fallbacks.experience;
      else if (query.includes('skill') || query.includes('tech')) resp = fallbacks.skills;
      else if (query.includes('project')) resp = fallbacks.projects;
      else if (query.includes('contact') || query.includes('phone') || query.includes('email')) resp = fallbacks.contact;
      else if (query.includes('education') || query.includes('degree') || query.includes('university')) resp = fallbacks.education;

      if (!isMuted) {
        const audioUrl = await generateGroqTTS(resp);
        if (audioUrl) playAudio(audioUrl);
      }

      return resp;
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputValue,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const query = inputValue;
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await streamResponse(query);
      const botMessage = {
        id: Date.now() + 1,
        text: response,
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setStreamingText('');
    } catch (error) {
      console.error('Message error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (currentAudio && !isMuted) {
      currentAudio.pause();
      setIsPlaying(false);
    }
  };

  const togglePlayPause = () => {
    if (currentAudio) {
      if (isPlaying) {
        currentAudio.pause();
        setIsPlaying(false);
      } else {
        currentAudio.play();
        setIsPlaying(true);
      }
    }
  };

  const formatTime = (date) => date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
      {/* Toggle */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-primary-500 hover:bg-primary-600 rounded-full shadow-lg shadow-primary-500/20 flex items-center justify-center text-white transition-all duration-200 hover:scale-105"
        >
          <MessageCircle size={22} />
        </button>
      )}

      {/* Chat */}
      {isOpen && (
        <div
          ref={chatboxRef}
          className={`w-[360px] max-w-[calc(100vw-2rem)] sm:max-w-[calc(100vw-3rem)] bg-surface-950 border border-zinc-800 rounded-2xl shadow-2xl shadow-black/40 flex flex-col transition-all duration-200 ${
            isMinimized ? 'h-14' : 'h-[520px]'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800 flex-shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                  <Bot size={16} className="text-white" />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-surface-950" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-zinc-200">AI Assistant</h3>
                <p className="text-[10px] text-zinc-500">
                  {isPlaying ? 'Speaking...' : 'Online'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {currentAudio && (
                <button onClick={togglePlayPause} className="p-1.5 rounded-md hover:bg-zinc-800 text-zinc-500 transition-colors">
                  {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                </button>
              )}
              <button onClick={toggleMute} className="p-1.5 rounded-md hover:bg-zinc-800 text-zinc-500 transition-colors">
                {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
              </button>
              <button onClick={() => setIsMinimized(!isMinimized)} className="p-1.5 rounded-md hover:bg-zinc-800 text-zinc-500 transition-colors">
                {isMinimized ? <Maximize2 size={14} /> : <Minimize2 size={14} />}
              </button>
              <button onClick={() => setIsOpen(false)} className="p-1.5 rounded-md hover:bg-zinc-800 text-zinc-500 transition-colors">
                <X size={14} />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                    <div className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.isBot
                        ? 'bg-zinc-800 text-zinc-200 rounded-bl-md'
                        : 'bg-primary-500 text-white rounded-br-md'
                    }`}>
                      <p className="whitespace-pre-wrap">{msg.text}</p>
                      <p className={`text-[10px] mt-1 ${msg.isBot ? 'text-zinc-500' : 'text-white/50'}`}>
                        {formatTime(msg.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}

                {isStreaming && streamingText && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] px-3.5 py-2.5 rounded-2xl rounded-bl-md bg-zinc-800 text-zinc-200 text-sm">
                      <p className="whitespace-pre-wrap">
                        {streamingText}<span className="inline-block w-1.5 h-4 bg-primary-400 animate-pulse ml-0.5" />
                      </p>
                    </div>
                  </div>
                )}

                {isLoading && !isStreaming && (
                  <div className="flex justify-start">
                    <div className="px-3.5 py-2.5 rounded-2xl rounded-bl-md bg-zinc-800 text-zinc-400 text-sm flex items-center gap-2">
                      <Loader2 size={14} className="animate-spin" />
                      <span>Thinking...</span>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-3 border-t border-zinc-800 flex-shrink-0">
                <div className="flex items-center gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask about experience, skills..."
                    className="flex-1 bg-zinc-800 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-primary-500/50 transition-colors"
                    disabled={isLoading || isStreaming}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={isLoading || isStreaming || !inputValue.trim()}
                    className="w-9 h-9 bg-primary-500 hover:bg-primary-600 rounded-xl flex items-center justify-center text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <Send size={14} />
                  </button>
                </div>

                <div className="flex gap-1.5 mt-2">
                  {["Experience?", "Projects?", "Skills?"].map((s, i) => (
                    <button
                      key={i}
                      onClick={() => setInputValue(s)}
                      disabled={isLoading || isStreaming}
                      className="px-2.5 py-1 text-[11px] text-zinc-500 bg-zinc-800/50 border border-zinc-800 rounded-lg hover:text-zinc-300 hover:border-zinc-700 transition-colors disabled:opacity-40"
                    >
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
