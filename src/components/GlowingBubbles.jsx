import React from 'react';

const GlowingBubbles = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Base gradient — slow, soothing pulse */}
      <div
        className="absolute inset-0 opacity-[0.03] animate-gradient-shift"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 0%, #f97316, transparent 50%)',
        }}
      />

      {/* Primary orb — top left, warm orange */}
      <div
        className="absolute -top-[15%] -left-[10%] w-[min(80vw,600px)] h-[min(80vw,600px)] rounded-full animate-orb-float"
        style={{
          background: 'radial-gradient(circle, rgba(249,115,22,0.06) 0%, rgba(251,146,60,0.03) 40%, transparent 70%)',
        }}
      />

      {/* Secondary orb — bottom right */}
      <div
        className="absolute -bottom-[20%] -right-[15%] w-[min(70vw,500px)] h-[min(70vw,500px)] rounded-full animate-orb-float"
        style={{
          background: 'radial-gradient(circle, rgba(234,88,12,0.05) 0%, rgba(253,186,116,0.02) 50%, transparent 70%)',
          animationDelay: '-8s',
        }}
      />

      {/* Accent orb — center-right, subtle */}
      <div
        className="absolute top-[35%] right-[10%] w-[min(50vw,350px)] h-[min(50vw,350px)] rounded-full animate-orb-float"
        style={{
          background: 'radial-gradient(circle, rgba(251,146,60,0.04) 0%, transparent 60%)',
          animationDelay: '-15s',
        }}
      />

      {/* Soft vignette for depth */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(9,9,11,0.3) 100%)',
        }}
      />
    </div>
  );
};

export default GlowingBubbles;
