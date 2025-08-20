import React, { useEffect, useRef } from 'react';
import { 
  Mail, Github, ExternalLink, Send, Sparkles, MessageCircle, 
  ArrowRight, Heart, Star, MapPin, Calendar, 
  Coffee, Zap, User, Award, Phone
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lottie from 'react-lottie';
import animationData from '../assets/Lottie/ContactUS.json';
import data from './data/data.json';

const Contact = () => {
  const contactRef = useRef(null);

  // Lottie animation options
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Enhanced header animation
    gsap.fromTo('.contact-header', {
      y: 80,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: contactRef.current,
        start: 'top 85%',
      }
    });

    // Animate unified card
    gsap.fromTo('.unified-contact-card', {
      scale: 0.9,
      opacity: 0,
      y: 60
    }, {
      scale: 1,
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: contactRef.current,
        start: 'top 70%',
      }
    });

    // Animate content sections
    gsap.fromTo('.content-section', {
      y: 40,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power2.out',
      delay: 0.3,
      scrollTrigger: {
        trigger: contactRef.current,
        start: 'top 60%',
      }
    });

    // Animate floating elements
    gsap.to('.floating-element', {
      y: -10,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: 0.5
    });

    // Animate social buttons
    gsap.fromTo('.social-btn', {
      scale: 0,
      opacity: 0,
      rotation: -180
    }, {
      scale: 1,
      opacity: 1,
      rotation: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'back.out(1.7)',
      delay: 0.8,
      scrollTrigger: {
        trigger: contactRef.current,
        start: 'top 50%',
      }
    });

  }, []);

  return (
    <section id="contact" className="py-16 sm:py-20 lg:py-24 relative overflow-hidden" ref={contactRef}>
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-gradient-to-r from-primary-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-green-500/15 to-teal-500/15 rounded-full blur-3xl animate-pulse delay-2000"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
              animation: 'gridMove 20s linear infinite'
            }}
          />
        </div>

        {/* Floating particles */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${8 + Math.random() * 8}s`
            }}
          >
            <div className="w-2 h-2 bg-primary-400/60 rounded-full"></div>
          </div>
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        
        {/* Enhanced Section Header */}
        <div className="contact-header text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-500/20 to-purple-500/20 rounded-full border border-primary-500/30 backdrop-blur-sm mb-6">
            <MessageCircle className="text-primary-400" size={16} />
            <span className="text-primary-400 font-medium text-sm">Get In Touch</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-slate-100 via-slate-200 to-slate-300 bg-clip-text text-transparent mb-6 leading-tight">
            Let's Build Something Amazing
          </h2>
          
          <p className="text-lg sm:text-xl text-slate-400 leading-relaxed max-w-3xl mx-auto mb-8">
            Ready to discuss your next project? I'm always excited to collaborate on 
            <span className="text-primary-400 font-semibold"> innovative AI/ML solutions</span> and 
            cutting-edge technology projects.
          </p>

          {/* Availability Status */}
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl border border-green-500/30 backdrop-blur-sm">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
            <span className="text-green-400 font-medium">Available for new projects</span>
          </div>
        </div>

        {/* Unified Contact Card */}
        <div className="unified-contact-card max-w-6xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800/95 to-slate-900/95 border border-slate-700/50 backdrop-blur-xl shadow-2xl shadow-black/20">
            
            {/* Decorative elements */}
            <div className="absolute top-6 right-6">
              <div className="flex items-center gap-2">
                <Star className="text-yellow-400" size={16} />
                <span className="text-yellow-400 text-xs font-medium">5.0 Rating</span>
              </div>
            </div>

            {/* Floating decorative orbs */}
            <div className="floating-element absolute -top-4 -right-4 w-8 h-8 bg-primary-500 rounded-full animate-pulse opacity-60"></div>
            <div className="floating-element absolute -bottom-4 -left-4 w-6 h-6 bg-purple-500 rounded-full animate-pulse opacity-40 delay-1000"></div>

            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 p-8 sm:p-10 lg:p-12">
              
              {/* LEFT: Lottie Animation + Stats */}
              <div className="content-section space-y-8">
                
                {/* Lottie Animation */}
                <div className="relative">
                  <div className="floating-element relative bg-gradient-to-br from-primary-500/10 to-purple-500/10 border border-primary-500/20 rounded-2xl p-6 overflow-hidden">
                    <div className="flex items-center justify-center h-72">
                      <Lottie options={defaultOptions} height={280} width={280} />
                    </div>
                    
                    {/* Subtle glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-500/5 to-transparent pointer-events-none"></div>
                  </div>
                </div>

                {/* Contact Stats */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: Award, label: 'Response Time', value: '< 24hrs', color: 'text-green-400', bg: 'from-green-500/20 to-emerald-500/20' },
                    { icon: Coffee, label: 'Coffee Chats', value: 'Always!', color: 'text-orange-400', bg: 'from-orange-500/20 to-yellow-500/20' },
                    { icon: Zap, label: 'Projects Done', value: '15+', color: 'text-blue-400', bg: 'from-blue-500/20 to-cyan-500/20' },
                    { icon: Heart, label: 'Happy Clients', value: '100%', color: 'text-red-400', bg: 'from-red-500/20 to-pink-500/20' }
                  ].map((stat, index) => (
                    <div key={index} className="content-section group text-center p-4 rounded-xl bg-slate-700/30 border border-slate-600/50 backdrop-blur-sm hover:bg-slate-600/40 transition-all duration-300 hover:scale-105">
                      <div className={`w-12 h-12 bg-gradient-to-r ${stat.bg} rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}>
                        <stat.icon className={`${stat.color}`} size={20} />
                      </div>
                      <div className="text-lg font-bold text-slate-100">{stat.value}</div>
                      <div className="text-slate-400 text-xs">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT: Contact Information */}
              <div className="content-section space-y-8">
                
                {/* Header */}
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-primary-500 via-purple-500 to-cyan-500 rounded-2xl flex items-center justify-center">
                    <Mail size={28} className="text-white" />
                  </div>
                  
                  <h3 className="text-3xl font-bold text-slate-100">Ready to Connect?</h3>
                  <p className="text-slate-400 text-lg leading-relaxed">
                    Let's discuss how we can bring your ideas to life with cutting-edge AI/ML solutions.
                  </p>
                </div>

                {/* Contact Methods */}
                <div className="space-y-4">
                  {[
                    { 
                      icon: Mail, 
                      label: 'Email Me', 
                      value: data.personal?.email || 'gopal@example.com',
                      href: `mailto:${data.personal?.email || 'gopal@example.com'}`,
                      color: 'from-blue-500 to-cyan-500'
                    },
                    { 
                      icon: Phone, 
                      label: 'Call Me', 
                      value: '+91 12345 67890',
                      href: 'tel:+911234567890',
                      color: 'from-green-500 to-emerald-500'
                    },
                    { 
                      icon: MapPin, 
                      label: 'Location', 
                      value: 'India (Remote Available)',
                      color: 'from-purple-500 to-pink-500'
                    },
                    { 
                      icon: Calendar, 
                      label: 'Schedule Call', 
                      value: 'Book a Meeting',
                      href: '#',
                      color: 'from-orange-500 to-red-500'
                    }
                  ].map((contact, index) => (
                    <div key={index} className="content-section group flex items-center gap-4 p-4 rounded-xl bg-slate-700/30 hover:bg-slate-600/40 transition-all duration-300 hover:scale-[1.02]">
                      <div className={`w-12 h-12 bg-gradient-to-r ${contact.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <contact.icon size={20} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="text-slate-300 text-sm font-medium">{contact.label}</div>
                        <div className="text-slate-100 font-semibold">{contact.value}</div>
                      </div>
                      {contact.href && (
                        <ArrowRight size={16} className="text-slate-400 group-hover:text-primary-400 group-hover:translate-x-1 transition-all duration-300" />
                      )}
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="content-section flex flex-col sm:flex-row gap-4">
                  <a 
                    href={`mailto:${data.personal?.email || 'gopal@example.com'}`}
                    className="flex-1 group relative inline-flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-primary-500 to-purple-600 text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-2xl hover:shadow-primary-500/25 hover:scale-105"
                  >
                    <Send size={18} />
                    <span>Send Message</span>
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                  </a>
                  
                  <a 
                    href="#"
                    className="flex-1 group inline-flex items-center justify-center gap-3 px-6 py-4 bg-slate-800/80 text-slate-200 rounded-xl font-semibold border border-slate-600 backdrop-blur-sm transition-all duration-300 hover:border-primary-500/50 hover:bg-slate-700/80 hover:scale-105"
                  >
                    <Coffee size={18} />
                    <span>Schedule Call</span>
                  </a>
                </div>

                {/* Social Links */}
                <div className="content-section border-t border-slate-700/50 pt-6">
                  <p className="text-slate-400 text-sm mb-4">Connect with me on</p>
                  <div className="flex items-center gap-3">
                    {[
                      { icon: Github, href: data.personal?.links?.github, label: 'GitHub', color: 'hover:text-gray-300' },
                      { icon: ExternalLink, href: data.personal?.links?.resume, label: 'Resume', color: 'hover:text-blue-400' },
                      { icon: User, href: data.personal?.links?.linkedin, label: 'LinkedIn', color: 'hover:text-blue-500' },
                      { icon: MessageCircle, href: '#', label: 'Discord', color: 'hover:text-purple-400' }
                    ].map((social, index) => (
                      <a
                        key={index}
                        href={social.href || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`social-btn group relative p-3 rounded-xl bg-slate-700/50 text-slate-400 border border-slate-600/50 transition-all duration-300 hover:scale-110 hover:bg-slate-600/50 ${social.color}`}
                        title={social.label}
                      >
                        <social.icon size={18} />
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Background glow effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary-500/5 to-purple-500/5 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          </div>
        </div>

        {/* Footer Section */}
        <div className="mt-12 sm:mt-16 text-center">
          <div className="inline-flex items-center gap-2 text-slate-400 text-sm">
            <Heart size={14} className="text-red-400" />
            <span>Built with passion in India</span>
          </div>
          <div className="mt-4 text-slate-500 text-sm">
            © {new Date().getFullYear()} {data.personal?.name || 'Gopal Khandelwal'}. All rights reserved.
          </div>
        </div>
      </div>

      {/* Enhanced Custom Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) translateX(0px); 
          }
          25% { 
            transform: translateY(-15px) translateX(5px); 
          }
          50% { 
            transform: translateY(-30px) translateX(-5px); 
          }
          75% { 
            transform: translateY(-15px) translateX(10px); 
          }
        }
        
        .animate-float {
          animation: float 12s ease-in-out infinite;
        }

        @keyframes gridMove {
          0% { transform: translateX(0) translateY(0); }
          100% { transform: translateX(50px) translateY(50px); }
        }

        .floating-element {
          animation: float 6s ease-in-out infinite;
        }

        .unified-contact-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 40px 80px -12px rgba(99, 102, 241, 0.3);
        }

        .content-section:hover {
          transform: translateY(-2px);
        }

        @media (max-width: 768px) {
          .unified-contact-card {
            margin: 0 1rem;
          }
          
          .unified-contact-card > div {
            padding: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Contact;
