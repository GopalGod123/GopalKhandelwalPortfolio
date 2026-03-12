import React, { useEffect, useRef } from 'react';
import {
  Mail, Github, ExternalLink, Send, MessageCircle,
  ArrowUpRight, Heart, MapPin, Phone, Coffee
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lottie from 'react-lottie';
import animationData from '../assets/Lottie/ContactUS.json';
import data from './data/data.json';

const Contact = () => {
  const contactRef = useRef(null);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: { preserveAspectRatio: 'xMidYMid slice' }
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const elements = contactRef.current.querySelectorAll('.fade-up');
    gsap.fromTo(elements, { y: 40, opacity: 0 }, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: { trigger: contactRef.current, start: 'top 80%' }
    });
  }, []);

  const contactMethods = [
    {
      icon: Mail,
      label: 'Email',
      value: data.personal?.email || 'gopalkhandelwalstar@gmail.com',
      href: `mailto:${data.personal?.email || 'gopalkhandelwalstar@gmail.com'}`,
    },
    {
      icon: Phone,
      label: 'Phone',
      value: data.personal?.phone || '+91 8296294193',
      href: `tel:${data.personal?.phone || '+918296294193'}`,
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'India (Remote Available)',
    },
  ];

  const socialLinks = [
    { label: 'GitHub', href: data.personal?.links?.github, icon: Github },
    { label: 'LinkedIn', href: data.personal?.links?.linkedin, icon: ExternalLink },
    { label: 'Resume', href: data.personal?.links?.resume, icon: ExternalLink },
    { label: 'LeetCode', href: data.personal?.links?.leetcode, icon: ExternalLink },
  ];

  return (
    <section id="contact" className="section-padding relative overflow-x-hidden" ref={contactRef}>
      <div className="section-container">
        {/* Header */}
        <div className="fade-up text-center mb-16">
          <div className="badge badge-primary mb-4 mx-auto">
            <MessageCircle size={12} />
            Contact
          </div>
          <h2 className="section-title mb-4">Let's Build Something</h2>
          <p className="section-subtitle mx-auto">
            Ready to discuss your next project? I'm always excited to collaborate on
            <span className="text-primary-400 font-medium"> AI/ML solutions</span> and cutting-edge technology.
          </p>

          <div className="inline-flex items-center gap-2 mt-6 badge badge-green">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            Available for new projects
          </div>
        </div>

        {/* Main content */}
        <div className="max-w-4xl mx-auto w-full min-w-0 px-0 sm:px-0">
          <div className="card !p-0 overflow-hidden w-full min-w-0">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Left — Lottie + Stats */}
              <div className="fade-up p-4 sm:p-8 bg-zinc-900/50 md:border-r border-b md:border-b-0 border-zinc-800 flex flex-col justify-between">
                <div className="flex items-center justify-center py-4 sm:py-6">
                  <Lottie options={defaultOptions} height={180} width={180} />
                </div>

                <div className="grid grid-cols-2 gap-2 sm:gap-3 min-w-0">
                  {[
                    { label: 'Response', value: '< 24hrs', icon: '⚡' },
                    { label: 'Projects', value: '15+', icon: '📦' },
                    { label: 'Clients', value: 'Happy', icon: '😊' },
                    { label: 'Coffee Chats', value: 'Always!', icon: '☕' },
                  ].map((stat, i) => (
                    <div key={i} className="text-center p-2.5 sm:p-3 rounded-xl bg-zinc-800/50 border border-zinc-800 min-w-0">
                      <div className="text-lg mb-1">{stat.icon}</div>
                      <div className="text-sm font-semibold text-zinc-200">{stat.value}</div>
                      <div className="text-[11px] text-zinc-500">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right — Contact info */}
              <div className="fade-up p-4 sm:p-8 space-y-5 sm:space-y-6 min-w-0">
                <div>
                  <h3 className="text-xl font-semibold text-zinc-100 mb-2">Get in Touch</h3>
                  <p className="text-sm text-zinc-400">
                    Let's discuss how we can bring your ideas to life.
                  </p>
                </div>

                {/* Contact methods */}
                <div className="space-y-3">
                  {contactMethods.map((method, i) => (
                    <div key={i}>
                      {method.href ? (
                        <a
                          href={method.href}
                          className="flex items-center gap-4 p-3.5 rounded-xl bg-zinc-800/50 border border-zinc-800 hover:border-zinc-700 transition-all duration-200 group"
                        >
                          <div className="w-10 h-10 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center group-hover:border-primary-500/30 transition-colors">
                            <method.icon size={16} className="text-zinc-400 group-hover:text-primary-400 transition-colors" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-[11px] text-zinc-500">{method.label}</div>
                            <div className="text-sm font-medium text-zinc-200 truncate">{method.value}</div>
                          </div>
                          <ArrowUpRight size={14} className="text-zinc-600 group-hover:text-primary-400 transition-colors" />
                        </a>
                      ) : (
                        <div className="flex items-center gap-4 p-3.5 rounded-xl bg-zinc-800/50 border border-zinc-800">
                          <div className="w-10 h-10 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center">
                            <method.icon size={16} className="text-zinc-400" />
                          </div>
                          <div>
                            <div className="text-[11px] text-zinc-500">{method.label}</div>
                            <div className="text-sm font-medium text-zinc-200">{method.value}</div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={`mailto:${data.personal?.email || 'gopalkhandelwalstar@gmail.com'}`}
                    className="btn-primary flex-1"
                  >
                    <Send size={16} />
                    Send Email
                  </a>
                  <a href="#" className="btn-secondary flex-1">
                    <Coffee size={16} />
                    Schedule Call
                  </a>
                </div>

                {/* Social */}
                <div className="pt-4 border-t border-zinc-800">
                  <p className="text-[11px] text-zinc-500 mb-3 uppercase tracking-wider font-medium">Connect</p>
                  <div className="flex flex-wrap gap-2">
                    {socialLinks.map((link, i) => (
                      <a
                        key={i}
                        href={link.href || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 text-zinc-400 text-xs font-medium border border-zinc-700 hover:text-white hover:border-zinc-600 transition-all"
                      >
                        <link.icon size={12} />
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="fade-up mt-16 text-center">
          <div className="flex items-center justify-center gap-1.5 text-zinc-500 text-sm">
            <span>Built with</span>
            <Heart size={14} className="text-red-400" />
            <span>in India</span>
          </div>
          <div className="mt-2 text-zinc-600 text-xs">
            &copy; {new Date().getFullYear()} {data.personal?.name || 'Gopal Khandelwal'}. All rights reserved.
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
