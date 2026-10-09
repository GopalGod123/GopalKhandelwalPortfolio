/**
 * Single source of truth for all site content and the AI assistant's knowledge.
 * Plain JS (no JSX/imports) so the serverless chat function can import it too.
 */

const CAREER_START = new Date('2021-08-01');
export const yearsOfExperience = Math.floor((Date.now() - CAREER_START.getTime()) / (365.25 * 24 * 3600 * 1000));

export const profile = {
  name: 'Gopal Khandelwal',
  firstName: 'Gopal',
  role: 'Full-Stack AI Engineer',
  location: 'Alwar, Rajasthan, India',
  timezone: 'Asia/Kolkata',
  email: 'gopalkhandelwalstar@gmail.com',
  phone: '+91 82962 94193',
  availability: 'Accepting select AI engagements',
  intro: `Full-stack AI engineer with ${yearsOfExperience}+ years of shipping software. I build LLM platforms, realtime voice agents and computer-vision systems, and I own them end to end, from model integration to interface to deployment.`,
  links: {
    website: 'https://www.gopalkhandelwal.com/',
    github: 'https://github.com/GopalGod123',
    linkedin: 'https://in.linkedin.com/in/gopal-khandelwal-a48380a5',
    resume: 'https://drive.google.com/file/d/16tAm2-gWwAcyJVxIHzR9a6ZhDLzOl5Dd/view?usp=sharing',
    schedule: 'https://calendar.app.google/BTeGNRKw4c3xshMF9',
  },
  images: {
    portrait: '/images/portrait.webp',
    portraitSmall: '/images/portrait-480.webp',
    avatar: '/images/avatar.webp',
  },
};

export const metrics = [
  { value: yearsOfExperience, suffix: '+', label: 'Years shipping production software' },
  { value: 95, suffix: '%', label: 'Face-verification accuracy on a government simulator' },
  { value: 70, suffix: '%', label: 'Less manual resume screening time' },
  { value: 40, suffix: '%', label: 'Lift in user engagement from ML matchmaking' },
];

/**
 * What clients can engage Gopal for. Each service points at real work (`proof`
 * is a project slug or experience company) so every offer is backed by evidence.
 */
export const services = [
  {
    icon: 'rocket',
    title: 'AI product development',
    pitch: 'From a validated idea to a production AI product, owned end to end by one engineer.',
    deliverables: ['Product scoping & technical architecture', 'Full-stack build: model, API and interface', 'Deployment, monitoring and handover'],
    proof: 'AI Resume Shortlister',
  },
  {
    icon: 'brain',
    title: 'LLM & RAG integration',
    pitch: 'Add grounded, reliable AI features to the product you already have.',
    deliverables: ['Retrieval pipelines over your own data', 'Prompt design and answer evaluation', 'Streaming responses with smooth UX'],
    proof: 'LLM platforms at Lightning Technology',
  },
  {
    icon: 'mic',
    title: 'Realtime voice agents',
    pitch: 'Natural, interruptible voice conversations that respond in real time.',
    deliverables: ['Speech-to-text, LLM and voice pipelines', 'WebRTC and LiveKit infrastructure', 'Low-latency turn-taking'],
    proof: 'Meera Health Agent',
  },
  {
    icon: 'scan',
    title: 'Computer vision systems',
    pitch: 'Vision AI that holds up in the field, not just in the demo.',
    deliverables: ['Face verification & detection', 'Realtime inference pipelines', 'Performance tuning for target hardware'],
    proof: 'RTO AI Driving Simulator',
  },
  {
    icon: 'layers',
    title: 'Web & mobile engineering',
    pitch: 'Fast, polished React and React Native apps on a backend built to scale.',
    deliverables: ['React, Next.js & React Native apps', 'Node.js and Python APIs', 'Realtime features over WebSockets'],
    proof: 'Legend Motors',
  },
];

export const principles = [
  {
    title: 'Product before model',
    body: 'Start from the user’s job to be done, then choose the smallest AI capability that solves it reliably. Prompts, retrieval and UX are designed together.',
  },
  {
    title: 'Realtime by default',
    body: 'Streaming responses, voice and live feedback make AI feel trustworthy. I care about buffering, latency and graceful failure as much as accuracy.',
  },
  {
    title: 'Own it end to end',
    body: 'Interface, API, data model, deployment. I’m comfortable across the whole stack, so features ship without hand-off gaps.',
  },
];

export const focus = [
  'Defence & mission-critical AI systems',
  'Agentic LLM workflows & RAG',
  'Realtime voice agents',
  'Healthcare AI',
  'Semantic search',
];

export const projects = [
  {
    slug: 'rto-driving-simulator',
    title: 'RTO AI Driving Simulator',
    kind: 'Computer vision · GovTech',
    org: 'Shivai Infotech',
    year: '2024 — 2025',
    summary: 'An AI driving-assessment simulator for Regional Transport Offices in India, with real-time computer vision and face verification.',
    problem: 'Driving tests needed objective, tamper-resistant assessment, including proof that the registered candidate is the one actually driving.',
    approach: 'Integrated Google ML Kit for real-time face verification and built data pipelines for model inference and session analytics, then optimised the core algorithms for the simulator hardware.',
    outcome: 'Deployed with multiple RTO government clients across India: 95% verification accuracy and 30% faster simulator performance.',
    metrics: ['95% accuracy', '30% faster', 'Multi-client rollout'],
    stack: ['Computer vision', 'Google ML Kit', 'React Native', 'Realtime pipelines'],
    visual: 'drive',
    links: {},
    privateNote: 'Deployed with government clients. Walkthrough available on request.',
  },
  {
    slug: 'clauselens',
    title: 'ClauseLens',
    kind: 'Open-source RAG · Legal tech',
    org: 'Independent',
    year: '2026',
    // Not shipped yet: shown as "In progress" with goals instead of results. Remove once it's live.
    status: 'In progress',
    summary: 'An open-source assistant for reading contracts: ask questions in plain language and get answers that cite the exact clause they came from.',
    problem: 'Contracts and policies are long, cross-referenced and easy to misread. Generic chatbots answer confidently but rarely show where an answer came from.',
    approach: 'Layout-aware PDF parsing that keeps clause structure, hybrid keyword + vector retrieval, clause-to-clause comparison across versions, and an evaluation suite that scores every answer for citation accuracy.',
    outcome: 'Every answer grounded in a citable clause, a side-by-side diff of contract versions, and a public eval benchmark so accuracy is measured, not claimed.',
    stack: ['LLMs', 'RAG', 'Hybrid search', 'Evals', 'FastAPI', 'React'],
    visual: 'graph',
    links: {},
  },
  {
    slug: 'meera-health-agent',
    title: 'Meera Health Agent',
    kind: 'Realtime voice AI',
    org: 'Independent',
    year: '2025',
    summary: 'A conversational health assistant you talk to: low-latency voice in, spoken answers out, over WebRTC.',
    problem: 'Typing symptoms into a chatbot is slow and unnatural. Health conversations work better as spoken dialogue.',
    approach: 'A Flask service orchestrates LiveKit rooms with Google’s realtime AI, voice-activity detection and per-user agent processes, all containerised with Docker.',
    outcome: 'Natural, interruptible voice conversations with live transcription, on an architecture that scales one agent per session.',
    metrics: ['Low-latency audio', 'Live transcription'],
    stack: ['Python', 'Flask', 'LiveKit', 'WebRTC', 'Google AI', 'Docker'],
    visual: 'wave',
    links: { code: 'https://github.com/GopalGod123/livekit-agent' },
  },
  {
    slug: 'ai-resume-shortlister',
    title: 'AI Resume Shortlister',
    kind: 'Applied LLM · HR tech',
    org: 'Independent',
    year: '2025',
    summary: 'Upload a stack of resumes and a job description, and get a ranked, explained shortlist in seconds.',
    problem: 'Recruiters spend most of their screening time on resumes that were never a fit.',
    approach: 'Client-side PDF parsing feeds batched Gemini calls that score each candidate against the role and return explanations alongside the score.',
    outcome: 'Cut manual screening time by about 70%, with reasoning a recruiter can audit.',
    metrics: ['−70% screening time', 'Batch processing'],
    stack: ['React', 'TypeScript', 'Gemini', 'PDF.js', 'Tailwind'],
    visual: 'rank',
    links: { code: 'https://github.com/GopalGod123/resume-shortlist', live: 'https://resume-shortlist-three.vercel.app/' },
  },
  {
    slug: 'legend-motors',
    title: 'Legend Motors',
    kind: 'Mobile · Vision AI',
    org: 'Client engagement',
    year: '2024',
    summary: 'A React Native app that assesses vehicle damage from photos and recommends vehicles, delivered under a consulting agreement.',
    problem: 'Manual vehicle inspection is slow and inconsistent between assessors.',
    approach: 'Combined computer-vision APIs for damage detection with NLP-driven recommendations, in a multi-language mobile experience.',
    outcome: '90% assessment accuracy, delivered to the client as a production mobile app.',
    metrics: ['90% accuracy', 'Multi-language'],
    stack: ['React Native', 'Computer vision', 'NLP', 'AI APIs'],
    visual: 'scan',
    links: { code: 'https://github.com/GopalGod123/legend-motors-react-native' },
  },
];

/**
 * Planned projects: NOT built yet. Shown in the "Building next" section with a
 * status badge, and the assistant is told they're planned. When one ships, move it
 * into `projects` above with real outcomes and links.
 */
export const roadmap = [
  {
    slug: 'sentinel-vision',
    title: 'Sentinel Vision',
    icon: 'radar',
    tag: 'Defence AI',
    status: 'Planned',
    target: 'Q1 2027',
    pitch: 'Edge AI that detects and tracks drones and vehicles in live aerial video, running fully on-device.',
    challenge: 'Multi-object tracking at 30+ FPS on a Jetson, with no cloud round-trip.',
    stack: ['YOLO', 'ByteTrack', 'TensorRT', 'Jetson Orin', 'WebRTC'],
  },
  {
    slug: 'bharat-voice',
    title: 'Bharat Voice Agent',
    icon: 'languages',
    tag: 'Voice AI',
    status: 'Planned',
    target: 'Q1 2027',
    pitch: 'A realtime voice agent that speaks Hindi, Tamil and natural Hinglish code-switching, and can take actions.',
    challenge: 'Sub-second turn-taking across Indic speech recognition, an LLM and TTS.',
    stack: ['LiveKit', 'Whisper', 'Indic TTS', 'LLM tools', 'Python'],
  },
  {
    slug: 'rag-eval-studio',
    title: 'RAG Eval Studio',
    icon: 'flask',
    tag: 'Open source',
    status: 'Planned',
    target: 'Q2 2027',
    pitch: 'An open-source toolkit that scores RAG pipelines on retrieval recall, faithfulness, latency and cost, and runs in CI.',
    challenge: 'Making LLM-as-judge scores reproducible enough to gate a deploy.',
    stack: ['Python', 'FastAPI', 'pgvector', 'React', 'GitHub Actions'],
  },
  {
    slug: 'agent-ops',
    title: 'AgentOps Console',
    icon: 'activity',
    tag: 'AI infrastructure',
    status: 'Planned',
    target: 'Q2 2027',
    pitch: 'Observability for AI agents: trace every tool call, replay failed runs, and track token cost per user.',
    challenge: 'High-volume trace ingestion with instant search and replay.',
    stack: ['OpenTelemetry', 'ClickHouse', 'Next.js', 'TypeScript'],
  },
  {
    slug: 'orbit-watch',
    title: 'Orbit Watch',
    icon: 'satellite',
    tag: 'Geospatial AI',
    status: 'Planned',
    target: 'Q3 2027',
    pitch: 'Satellite-imagery change detection for disaster response and border monitoring, with alerts on a live map.',
    challenge: 'Segmenting change across seasons, clouds and sensor noise.',
    stack: ['PyTorch', 'Sentinel-2', 'Segment Anything', 'Mapbox'],
  },
  {
    slug: 'pr-copilot',
    title: 'PR Copilot',
    icon: 'git',
    tag: 'Developer tools',
    status: 'Planned',
    target: 'Q3 2027',
    pitch: 'A GitHub App that reviews pull requests with whole-repo context and suggests fixes inline.',
    challenge: 'Retrieving the right code context from large repos on a tight token budget.',
    stack: ['GitHub Apps', 'tree-sitter', 'Embeddings', 'Claude API'],
  },
];

/**
 * Reviews from real, named people, ideally with their permission and a link to the
 * original (e.g. a LinkedIn recommendation). The Reviews section stays hidden while
 * this is empty. The first entry is shown large as the featured review.
 *
 * {
 *   quote: 'What they said, word for word.',
 *   name: 'Full Name',
 *   role: 'CTO',
 *   company: 'Company',
 *   relation: 'Client',                  // Client · Manager · Colleague
 *   source: 'https://linkedin.com/...',  // optional: link to the original
 *   photo: '/images/reviews/name.webp',  // optional
 * }
 */
export const testimonials = [];

export const moreProjects = [
  { title: 'Planet Eaters backend', note: 'Realtime multiplayer services, −25% latency', stack: 'Node · MongoDB · WebSockets', link: null },
];

export const experience = [
  {
    company: 'Lightning Technology',
    role: 'AI/ML Full-Stack Engineer',
    period: 'Mar 2025 — Present',
    location: 'Remote · India',
    current: true,
    highlights: [
      'Build LLM-powered product features end to end, from model integration to UI.',
      'Design retrieval and prompt strategies for grounded, reliable answers.',
      'Optimise realtime streaming over WebSockets and WebRTC for smooth, low-latency UX.',
    ],
    stack: ['LLMs', 'RAG', 'WebSockets', 'WebRTC', 'React', 'Redux'],
  },
  {
    company: 'Shivai Infotech',
    role: 'AI Software Engineer',
    period: 'Feb 2024 — Jan 2025',
    location: 'Bangalore · India',
    highlights: [
      'Built an AI driving simulator for RTO India, rolled out to multiple government clients.',
      'Integrated Google ML Kit face verification at 95% accuracy.',
      'Made the simulator 30% faster through algorithm and data-structure work.',
    ],
    stack: ['Computer vision', 'ML Kit', 'Realtime processing'],
  },
  {
    company: 'Planet Eaters Game',
    role: 'Senior MERN Stack Developer',
    period: 'Aug 2021 — Feb 2024',
    location: 'Remote · United States',
    highlights: [
      'Built scalable multiplayer backends on Node.js, Express and MongoDB.',
      'Reduced latency by 25% with better data structures and caching.',
      'Built ML-based player matchmaking that lifted engagement by 40%.',
    ],
    stack: ['Node.js', 'MongoDB', 'WebSockets', 'ML'],
  },
];

export const capabilities = [
  {
    title: 'AI & LLM systems',
    body: 'RAG, prompt design, agents and evaluation, wired into real products.',
    tools: ['OpenAI', 'Anthropic Claude', 'Gemini', 'LangChain', 'LangGraph', 'Hugging Face', 'Pinecone', 'ChromaDB'],
    span: 'lg:col-span-2',
  },
  {
    title: 'Realtime & voice',
    body: 'Streaming, speech and live media.',
    tools: ['LiveKit', 'WebRTC', 'WebSockets', 'Speech-to-text', 'TTS'],
  },
  {
    title: 'Product frontend',
    body: 'Interfaces that make AI feel fast and trustworthy.',
    tools: ['React', 'Next.js', 'TypeScript', 'React Native', 'Redux', 'Tailwind'],
  },
  {
    title: 'Backend & data',
    body: 'APIs and data models that survive production traffic.',
    tools: ['Node.js', 'Python', 'FastAPI', 'Flask', 'Express', 'GraphQL', 'PostgreSQL', 'MongoDB', 'Redis'],
  },
  {
    title: 'Cloud & delivery',
    body: 'Containerised, observable and shippable.',
    tools: ['Docker', 'AWS', 'Google Cloud', 'Firebase', 'Jenkins', 'Git'],
  },
];

export const education = {
  school: 'University of Petroleum and Energy Studies (UPES)',
  degree: 'B.Tech, Computer Science & Engineering',
  period: '2017 — 2021',
  location: 'Dehradun, India',
};

export const certifications = [
  { name: 'Machine Learning Specialization', issuer: 'Stanford · Coursera', year: '2023' },
  { name: 'AI/ML Engineering', issuer: 'Google Cloud', year: '2024' },
];

export const navItems = [
  { id: 'services', label: 'Services' },
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'stack', label: 'Capabilities' },
  { id: 'lab', label: 'Lab' },
  { id: 'next', label: 'Roadmap' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];
