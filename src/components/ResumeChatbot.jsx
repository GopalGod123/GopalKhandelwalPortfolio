import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, MessageCircle, X, Minimize2, Maximize2, Volume2, VolumeX, Pause, Play } from 'lucide-react';
import gsap from 'gsap';

const ResumeChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "👋 Hi! I'm Gopal's AI assistant. Ask me anything about his experience, skills, or projects!",
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

  // Resume data
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

  // Initialize and scroll effects
  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingText]);

  useEffect(() => {
    if (isOpen && chatboxRef.current) {
      gsap.fromTo(chatboxRef.current, 
        { scale: 0, opacity: 0, y: 50 },
        { scale: 1, opacity: 1, y: 0, duration: 0.3, ease: 'back.out(1.7)' }
      );
    }
  }, [isOpen]);

  // Audio cleanup
  useEffect(() => {
    if (currentAudio) {
      currentAudio.addEventListener('ended', handleAudioEnd);
      currentAudio.addEventListener('error', handleAudioError);
      
      return () => {
        currentAudio.removeEventListener('ended', handleAudioEnd);
        currentAudio.removeEventListener('error', handleAudioError);
      };
    }
  }, [currentAudio, handleAudioEnd]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleAudioEnd = () => {
    setIsPlaying(false);
    setCurrentAudio(null);
    // Play next audio in queue
    if (audioQueue.length > 0) {
      const nextAudio = audioQueue[0];
      setAudioQueue(prev => prev.slice(1));
      playAudio(nextAudio);
    }
  };

  const handleAudioError = () => {
    setIsPlaying(false);
    setCurrentAudio(null);
    console.error('Audio playback error');
  };

  // Generate TTS using Groq API (frontend only)
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
          model: 'playai-tts',
          input: text.replace(/[*_#`]/g, '').trim(), // Clean markdown formatting
          voice: 'Arista-PlayAI', // Realistic Groq voice
          response_format: 'mp3',
          speed: 1.0
        }),
      });

      if (!response.ok) {
        throw new Error(`TTS API error: ${response.status}`);
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      return audioUrl;
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
    
    audio.play().catch(error => {
      console.error('Audio play error:', error);
      setIsPlaying(false);
      setCurrentAudio(null);
    });
  };

  // Stream response from Groq
  const streamResponse = async (userMessage) => {
    // Safely access resume data with fallbacks
    const currentExperience = resumeData.experience[0] || {};
    const previousExperience = resumeData.experience.slice(1) || [];
    
  const context = `You are Gopal Khandelwal's personal AI assistant. Answer questions about his professional background based ONLY on this resume data:

NAME: ${resumeData.name || 'Gopal Khandelwal'}
TITLE: ${resumeData.title || 'AI/ML Engineer & Full Stack Developer'}
SUMMARY: ${resumeData.summary || 'AI/ML Engineer and Full Stack Developer specializing in LLM integration and real-time AI systems.'}

CURRENT ROLE: ${currentExperience.position || 'AI/ML Engineer'} at ${currentExperience.company || 'Technology Company'} (${currentExperience.period || 'Present'})
KEY ACHIEVEMENTS: ${(currentExperience.achievements || []).join(', ')}

PREVIOUS EXPERIENCE:
${previousExperience.map(exp => `${exp.position || 'Developer'} at ${exp.company || 'Company'} (${exp.period || 'Past'}) - ${(exp.achievements || []).join(', ')}`).join('\n')}

TOP PROJECTS:
${(resumeData.projects || []).map(proj => `${proj.name || 'Project'}: ${proj.description || 'Description'} (${proj.tech || 'Tech'})`).join('\n')}

SKILLS: ${Object.values(resumeData.skills || {}).flat().join(', ')}

EDUCATION: ${resumeData.education?.degree || 'B.TECH Computer Science'} from ${resumeData.education?.university || 'University'}, GPA: ${resumeData.education?.gpa || '8.0/10'}

CONTACT: ${resumeData.contact?.email || 'email@example.com'}, ${resumeData.contact?.phone || '+91 1234567890'}, Based in ${resumeData.contact?.location || 'India'}

Instructions:
- Be conversational and professional
- Use specific examples from his experience
- Keep responses UNDER 30 WORDS MAXIMUM ⬅️ ADD THIS
- Use emojis sparingly
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
            const data = line.slice(6);
            if (data === '[DONE]') continue;

            try {
              const parsed = JSON.parse(data);
              const content = parsed.choices[0]?.delta?.content || '';
              if (content) {
                fullText += content;
                setStreamingText(fullText);
              }
            // eslint-disable-next-line no-unused-vars
            } catch (e) {
              // Ignore JSON parse errors
            }
          }
        }
      }

      setIsStreaming(false);
      
      // Generate and play audio for complete response
      if (fullText && !isMuted) {
        const audioUrl = await generateGroqTTS(fullText);
        if (audioUrl) {
          playAudio(audioUrl);
        }
      }

      return fullText;

    } catch (error) {
      console.error('Streaming error:', error);
      setIsStreaming(false);
      

      
      const query = userMessage.toLowerCase();
      let response = "🤔 I can tell you about Gopal's experience, skills, projects, education, or contact info. What interests you?";
      
      // eslint-disable-next-line no-undef
      if (query.includes('experience') || query.includes('work') || query.includes('job')) response = fallbacks.experience;
      // eslint-disable-next-line no-undef
      else if (query.includes('skill') || query.includes('tech')) response = fallbacks.skills;
      // eslint-disable-next-line no-undef
      else if (query.includes('project')) response = fallbacks.projects;
      // eslint-disable-next-line no-undef
      else if (query.includes('contact') || query.includes('phone') || query.includes('email')) response = fallbacks.contact;
      // eslint-disable-next-line no-undef
      else if (query.includes('education') || query.includes('degree') || query.includes('university')) response = fallbacks.education;

      // Generate audio for fallback
      if (!isMuted) {
        const audioUrl = await generateGroqTTS(response);
        if (audioUrl) playAudio(audioUrl);
      }

      return response;
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

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="fixed bottom-[10%] right-6 z-50">
      {/* Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative w-16 h-16 bg-gradient-to-r from-primary-500 to-purple-600 rounded-full shadow-2xl hover:shadow-primary-500/25 transition-all duration-300 hover:scale-110"
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-purple-600 rounded-full blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
          <div className="relative w-full h-full bg-gradient-to-r from-primary-500 to-purple-600 rounded-full flex items-center justify-center">
            <MessageCircle size={24} className="text-white" />
          </div>
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">🤖</span>
          </div>
          <div className="absolute inset-0 rounded-full bg-primary-500 animate-ping opacity-20"></div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          ref={chatboxRef}
          className={`w-96 bg-slate-800/95 backdrop-blur-sm border border-slate-700/50 rounded-3xl shadow-2xl transition-all duration-300 ${
            isMinimized ? 'h-16' : 'h-[600px]'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-slate-700/50 rounded-t-3xl bg-gradient-to-r from-primary-500/20 to-purple-600/20">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-purple-600 rounded-full flex items-center justify-center">
                  <Bot size={20} className="text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-800"></div>
              </div>
              <div>
                <h3 className="font-semibold text-white">Gopal's AI Assistant</h3>
                <p className="text-xs text-slate-400 flex items-center gap-2">
                  Groq-powered
                  {isPlaying && <span className="text-green-400">🔊 Speaking</span>}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {currentAudio && (
                <button
                  onClick={togglePlayPause}
                  className="p-2 hover:bg-slate-700/50 rounded-full transition-colors duration-200"
                  title={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause size={16} className="text-slate-400" /> : <Play size={16} className="text-slate-400" />}
                </button>
              )}
              
              <button
                onClick={toggleMute}
                className="p-2 hover:bg-slate-700/50 rounded-full transition-colors duration-200"
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX size={16} className="text-red-400" /> : <Volume2 size={16} className="text-slate-400" />}
              </button>
              
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-2 hover:bg-slate-700/50 rounded-full transition-colors duration-200"
              >
                {isMinimized ? <Maximize2 size={16} className="text-slate-400" /> : <Minimize2 size={16} className="text-slate-400" />}
              </button>
              
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-slate-700/50 rounded-full transition-colors duration-200"
              >
                <X size={16} className="text-slate-400" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Messages */}
              <div className="flex-1 p-4 overflow-y-auto max-h-[480px] space-y-4 scrollbar-thin scrollbar-track-slate-800 scrollbar-thumb-slate-600">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
                    <div className={`max-w-[80%] p-3 rounded-2xl ${
                      message.isBot ? 'bg-slate-700/50 text-slate-100' : 'bg-gradient-to-r from-primary-500 to-purple-600 text-white'
                    } shadow-lg`}>
                      <div className="flex items-start gap-2">
                        {message.isBot && <Bot size={16} className="text-primary-400 mt-0.5 flex-shrink-0" />}
                        {!message.isBot && <User size={16} className="text-white/80 mt-0.5 flex-shrink-0" />}
                        <div>
                          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
                          <p className={`text-xs mt-1 ${message.isBot ? 'text-slate-400' : 'text-white/60'}`}>
                            {formatTime(message.timestamp)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Streaming */}
                {isStreaming && streamingText && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] p-3 rounded-2xl bg-slate-700/50 text-slate-100 shadow-lg">
                      <div className="flex items-start gap-2">
                        <Bot size={16} className="text-primary-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm leading-relaxed whitespace-pre-wrap">
                            {streamingText}<span className="inline-block w-2 h-4 bg-primary-400 animate-pulse ml-1"></span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Loading */}
                {isLoading && !isStreaming && (
                  <div className="flex justify-start">
                    <div className="bg-slate-700/50 p-3 rounded-2xl shadow-lg">
                      <div className="flex items-center gap-2">
                        <Bot size={16} className="text-primary-400" />
                        <Loader2 size={16} className="text-primary-400 animate-spin" />
                        <span className="text-sm text-slate-300">Thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-0 border-t border-slate-700/50">
                <div className="flex items-center gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask about Gopal's experience, skills, or projects..."
                    className="flex-1 bg-slate-700/50 border border-slate-600/50 rounded-full px-4 py-2 text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-primary-500/50 focus:ring-2 focus:ring-primary-500/20 transition-all duration-200"
                    disabled={isLoading || isStreaming}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={isLoading || isStreaming || !inputValue.trim()}
                    className="w-10 h-10 bg-gradient-to-r from-primary-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-primary-500/25 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
                  >
                    <Send size={16} className="text-white" />
                  </button>
                </div>
                
                {/* Suggestions */}
                <div className="mt-3 flex flex-wrap gap-2">
                  {["What's his experience?", "Tell me about projects", "What skills does he have?"].map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => setInputValue(suggestion)}
                      className="px-3 py-1 bg-slate-700/30 hover:bg-slate-600/50 border border-slate-600/30 rounded-full text-xs text-slate-300 hover:text-slate-100 transition-all duration-200 hover:scale-105"
                      disabled={isLoading || isStreaming}
                    >
                      {suggestion}
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
