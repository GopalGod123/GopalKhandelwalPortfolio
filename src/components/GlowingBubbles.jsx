import React, { useEffect, useRef } from 'react';

const GlowingBubbles = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    let width = window.innerWidth;
    let height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;

    class Bubble {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.radius = 8 + Math.random() * 12; // Smaller bubbles
        this.speedX = (Math.random() - 0.5) * 0.4; // Slow movement
        this.speedY = (Math.random() - 0.5) * 0.4;
        this.alpha = 0.1;
        this.maxAlpha = 0.2 + Math.random() * 0.15; // Less bright
        this.color = '255, 255, 255'; // White color
        this.pulse = Math.random() * Math.PI * 2;
        this.pulseSpeed = 0.01 + Math.random() * 0.02; // Slow pulsing
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.pulse += this.pulseSpeed;

        // Gentle pulsing effect
        this.alpha = this.maxAlpha * (0.8 + 0.2 * Math.sin(this.pulse));

        // Wrap around screen edges
        if (this.x - this.radius > width) this.x = -this.radius;
        if (this.x + this.radius < 0) this.x = width + this.radius;
        if (this.y - this.radius > height) this.y = -this.radius;
        if (this.y + this.radius < 0) this.y = height + this.radius;
      }

      draw(ctx) {
        ctx.save();
        
        // Reduced glow effect
        ctx.shadowColor = `rgba(${this.color}, ${this.alpha * 0.6})`;
        ctx.shadowBlur = 15; // Less blur

        // Create subtle gradient
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.radius
        );
        gradient.addColorStop(0, `rgba(${this.color}, ${this.alpha})`);
        gradient.addColorStop(0.6, `rgba(${this.color}, ${this.alpha * 0.3})`);
        gradient.addColorStop(1, `rgba(${this.color}, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }
    }

    // Create bubbles
    let bubbles = [];
    for (let i = 0; i < 35; i++) {
      bubbles.push(new Bubble());
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);
      
      bubbles.forEach(bubble => {
        bubble.update();
        bubble.draw(ctx);
      });
      
      requestAnimationFrame(animate);
    }

    animate();

    function handleResize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none'
      }}
    />
  );
};

export default GlowingBubbles;
