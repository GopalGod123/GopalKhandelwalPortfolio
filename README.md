# 🚀 Gopal Khandelwal - AI/ML Engineer Portfolio

A modern, interactive portfolio website showcasing Gopal Khandelwal's expertise in AI/ML Engineering and Full Stack Development. Built with React, Vite, and enhanced with AI-powered features.

![Portfolio Preview](https://img.shields.io/badge/React-19.1.1-blue?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-7.1.2-purple?style=for-the-badge&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![AI Powered](https://img.shields.io/badge/AI-Powered-orange?style=for-the-badge)

## ✨ Features

### 🎨 **Modern UI/UX**
- **Responsive Design**: Optimized for all devices and screen sizes
- **Smooth Animations**: GSAP-powered animations and transitions
- **Dark Theme**: Elegant dark theme with glowing bubble effects
- **Interactive Elements**: Hover effects, smooth scrolling, and dynamic content

### 🤖 **AI-Powered Chatbot**
- **Intelligent Assistant**: AI chatbot powered by Groq API for real-time conversations
- **Voice Integration**: Text-to-speech capabilities with Groq TTS
- **Resume Knowledge**: Trained on Gopal's professional background and experience
- **Fallback System**: Graceful degradation when AI services are unavailable

### 📱 **Portfolio Sections**
- **Hero Section**: Animated introduction with professional summary
- **About**: Personal background and professional journey
- **Skills**: Comprehensive skill showcase (AI/ML, Frontend, Backend, DevOps)
- **Experience**: Detailed work history with achievements
- **Projects**: Featured projects with technologies and descriptions
- **Education**: Academic background and certifications
- **Contact**: Professional contact information and social links

## 🛠️ Tech Stack

### **Frontend Framework**
- **React 19.1.1** - Modern React with latest features
- **Vite 7.1.2** - Fast build tool and development server
- **Tailwind CSS 3.4.0** - Utility-first CSS framework

### **AI & APIs**
- **Groq API** - High-performance LLM for chatbot responses
- **Groq TTS** - Text-to-speech for voice interactions
- **Google GenAI** - Gemini integration for advanced AI features

### **Animation & UI**
- **GSAP 3.13.0** - Professional-grade animations
- **Lucide React** - Beautiful icon library
- **React Icons** - Comprehensive icon collection
- **React Lottie** - Lottie animations support

### **Development Tools**
- **ESLint** - Code quality and consistency
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/portfolio-website.git
   cd portfolio-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   VITE_GROQ_API_KEY=your_groq_api_key_here
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production
```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
portfolio-website/
├── public/                 # Static assets
├── src/
│   ├── components/         # React components
│   │   ├── data/          # Data files and prompts
│   │   │   ├── resumeData.js
│   │   │   ├── gopalPrompt.js
│   │   │   └── data.json
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── Education.jsx
│   │   ├── Experience.jsx
│   │   ├── Hero.jsx
│   │   ├── Navbar.jsx
│   │   ├── Projects.jsx
│   │   ├── ResumeChatbot.jsx
│   │   ├── Skills.jsx
│   │   └── GlowingBubbles.jsx
│   ├── assets/            # Images, animations, etc.
│   ├── App.jsx           # Main application component
│   ├── main.jsx          # Application entry point
│   └── index.css         # Global styles
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🤖 AI Chatbot Features

### **Smart Responses**
- Answers questions about Gopal's experience, skills, and projects
- Provides detailed information about work history and achievements
- Offers contact information and professional background

### **Voice Integration**
- Text-to-speech using Groq TTS API
- Voice playback controls (play, pause, mute)
- Real-time audio streaming

### **Fallback System**
- Intelligent fallback responses when AI services are unavailable
- Graceful error handling and user feedback
- Continuous availability even during API issues

## 🎯 Key Features

### **Professional Experience**
- **Lightning Technology** - AI/ML Fullstack Engineer (Mar 2025 - Present)
- **Shivai-Infotech** - AI Software Engineer (Feb 2024 - Jan 2025)
- **Planet Eaters Game** - Senior MERN Stack Developer (Aug 2021 - Feb 2024)

### **Notable Projects**
- **MEERA Health Agent** - Real-time conversational AI health agent
- **AI Resume Shortlister** - 70% reduction in screening time
- **Legend Motors App** - Computer vision for vehicle damage assessment

### **Technical Skills**
- **AI/ML**: LLMs, OpenAI GPT, Google AI, RAG Systems, Vector DBs
- **Frontend**: React.js, React Native, Redux, Tailwind CSS
- **Backend**: Node.js, Flask, Express.js, FastAPI
- **Databases**: MongoDB, PostgreSQL, Pinecone, ChromaDB
- **DevOps**: Docker, AWS, Firebase, WebSockets

## 🔧 Configuration

### **Tailwind CSS**
The project uses Tailwind CSS with custom configuration for:
- Dark theme colors
- Custom animations
- Responsive breakpoints
- Custom component styles

### **GSAP Animations**
- Scroll-triggered animations
- Smooth page transitions
- Interactive element animations
- Performance-optimized animations

### **AI Integration**
- Groq API for chatbot responses
- Real-time streaming responses
- Error handling and retry logic
- Fallback response system

## 📱 Responsive Design

The portfolio is fully responsive and optimized for:
- **Desktop** (1200px+)
- **Tablet** (768px - 1199px)
- **Mobile** (320px - 767px)

## 🚀 Deployment

### **Vercel (Recommended)**
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### **Netlify**
1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify
3. Configure environment variables

### **Other Platforms**
The project can be deployed to any static hosting platform that supports:
- Static file hosting
- Environment variable configuration
- HTTPS support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

**Gopal Khandelwal**
- 📧 Email: gopalkhandelwal063@gmail.com
- 📱 Phone: +91 8296294193
- 📍 Location: Alwar, Rajasthan, India
- 🔗 LinkedIn: [Gopal Khandelwal](https://linkedin.com/in/gopalkhandelwal)

## 🙏 Acknowledgments

- **Groq** for providing high-performance AI APIs
- **Google** for Gemini AI integration
- **React Team** for the amazing framework
- **Vite Team** for the fast build tool
- **Tailwind CSS** for the utility-first CSS framework

---

⭐ **Star this repository if you found it helpful!**
