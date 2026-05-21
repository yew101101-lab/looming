import React, { useEffect, useState, useRef } from 'react';
import './Hero.css';

const Hero = ({ onNavigate }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const titleRef = useRef(null);
  const subRef = useRef(null);

  // 반응형 감지 — resize 이벤트로 실시간 업데이트
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const rawMouseRef = useRef({
    x: typeof window !== 'undefined' ? window.innerWidth / 2 : 500,
    y: typeof window !== 'undefined' ? window.innerHeight / 2 : 400
  });

  const [mousePixelPos, setMousePixelPos] = useState({
    x: typeof window !== 'undefined' ? window.innerWidth / 2 : 500,
    y: typeof window !== 'undefined' ? window.innerHeight / 2 : 400
  });

  const mouseRef = useRef({
    x: typeof window !== 'undefined' ? window.innerWidth / 2 : 500,
    y: typeof window !== 'undefined' ? window.innerHeight / 2 : 400
  });

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const [flickerRadius, setFlickerRadius] = useState(500);
  const [flickerOpacity, setFlickerOpacity] = useState(0.12);

  const lastMousePosRef = useRef({ 
    x: typeof window !== 'undefined' ? window.innerWidth / 2 : 500, 
    y: typeof window !== 'undefined' ? window.innerHeight / 2 : 400 
  });
  const targetRadiusRef = useRef(500);
  const currentRadiusRef = useRef(500);

  useEffect(() => {
    setIsLoaded(true);

    const handleMouseMove = (e) => {
      // 모바일(터치 기기)에서는 마우스 패럴랙스 완전 비활성화
      if (window.innerWidth <= 768) return;

      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const localX = e.clientX - rect.left;
      const localY = e.clientY - rect.top;
      
      setMousePixelPos({ x: localX, y: localY });
      mouseRef.current = { x: localX, y: localY };
      rawMouseRef.current = { x: e.clientX, y: e.clientY };

      const dx = e.clientX - lastMousePosRef.current.x;
      const dy = e.clientY - lastMousePosRef.current.y;
      const speed = Math.min(180, Math.hypot(dx, dy));
      targetRadiusRef.current = 480 + speed * 1.5;
      lastMousePosRef.current = { x: e.clientX, y: e.clientY };

      const xRatio = (e.clientX / window.innerWidth) - 0.5;
      const yRatio = (e.clientY / window.innerHeight) - 0.5;
      setMousePos({ x: xRatio, y: yRatio });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Canvas Particles Setup
    const canvas = canvasRef.current;
    if (!canvas) return;
    let ctx = canvas.getContext('2d');
    
    const handleResize = () => {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const particles = [];

    // High performance loop
    let animFrameId;
    const tick = (time) => {
      // 1. Irregular natural candle flicker + Mouse speed swelling damping loop
      const wave1 = Math.sin(time * 0.0035) * 30;
      const wave2 = Math.cos(time * 0.008) * 15;
      const baseTarget = targetRadiusRef.current + wave1 + wave2;
      
      // Apply smooth damping filter to transition radius
      currentRadiusRef.current = currentRadiusRef.current + (baseTarget - currentRadiusRef.current) * 0.08;

      const opacityWave = Math.sin(time * 0.006) * 0.03;
      const currentOpacity = 0.12 + opacityWave;

      setFlickerRadius(currentRadiusRef.current);
      setFlickerOpacity(currentOpacity);

      // 1.5. Dynamic Silhouette Backlight Shadow Calculations
      if (titleRef.current) {
        const rect = titleRef.current.getBoundingClientRect();
        const textX = rect.left + rect.width / 2;
        const textY = rect.top + rect.height / 2;
        const dx = rawMouseRef.current.x - textX;
        const dy = rawMouseRef.current.y - textY;
        const dist = Math.hypot(dx, dy);

        const maxDist = 700;  // 영향 반경 대폭 확장 (480 → 700)
        const intensity = Math.max(0, 1 - dist / maxDist);

        // 콌제 방향과 반대로 션도우 투영 (백라이트 효과)
        const shadowX = -dx * 0.14 * intensity;   // 0.08 → 0.14
        const shadowY = -dy * 0.14 * intensity;
        const blur = 6 + intensity * 32;            // 블러 범위 확대
        const opacity = 0.30 + intensity * 0.70;   // 최소 30%, 최대 100%

        const shadowVal = `${shadowX.toFixed(1)}px ${shadowY.toFixed(1)}px ${blur.toFixed(1)}px rgba(6, 4, 2, ${opacity.toFixed(2)})`;
        titleRef.current.style.setProperty('--backlight-shadow', shadowVal);
      }

      if (subRef.current) {
        const rect = subRef.current.getBoundingClientRect();
        const textX = rect.left + rect.width / 2;
        const textY = rect.top + rect.height / 2;
        const dx = rawMouseRef.current.x - textX;
        const dy = rawMouseRef.current.y - textY;
        const dist = Math.hypot(dx, dy);

        const maxDist = 550;  // 380 → 550
        const intensity = Math.max(0, 1 - dist / maxDist);

        const shadowX = -dx * 0.10 * intensity;
        const shadowY = -dy * 0.10 * intensity;
        const blur = 4 + intensity * 22;
        const opacity = 0.25 + intensity * 0.75;

        const subShadowVal = `${shadowX.toFixed(1)}px ${shadowY.toFixed(1)}px ${blur.toFixed(1)}px rgba(6, 4, 2, ${opacity.toFixed(2)})`;
        subRef.current.style.setProperty('--backlight-shadow', subShadowVal);
      }

      // 2. Update Canvas Particles
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const currentMouse = mouseRef.current;

        // Render Golden Halo Ring around cursor (breath fading aura)
        const haloOpacity = 0.06 + Math.sin(time * 0.004) * 0.02;
        const haloRadius = 70 + Math.sin(time * 0.002) * 8;
        ctx.strokeStyle = `rgba(249, 238, 222, ${haloOpacity})`;
        ctx.lineWidth = 1.0;
        ctx.beginPath();
        ctx.arc(currentMouse.x, currentMouse.y, haloRadius, 0, Math.PI * 2);
        ctx.stroke();

        // Spawn logic: (1) Background drift particles (cap: 35)
        if (Math.random() < 0.035 && particles.length < 35) {
          particles.push({
            x: Math.random() * canvas.width,
            y: canvas.height + 10,
            vx: (Math.random() - 0.5) * 0.35,
            vy: 0.25 + Math.random() * 0.45,
            size: 0.8 + Math.random() * 1.5,
            alpha: 0.18 + Math.random() * 0.22,
            life: 200 + Math.random() * 100,
            maxLife: 300
          });
        }

        // Spawn logic: (2) Cursor area concentrated spark particles (cap: 40)
        if (Math.random() < 0.16 && particles.length < 40) {
          const angle = Math.random() * Math.PI * 2;
          const dist = Math.random() * 60;
          particles.push({
            x: currentMouse.x + Math.cos(angle) * dist,
            y: currentMouse.y + Math.sin(angle) * dist,
            vx: (Math.random() - 0.5) * 0.5,
            vy: 0.35 + Math.random() * 0.55,
            size: 1.0 + Math.random() * 1.8,
            alpha: 0.28 + Math.random() * 0.32,
            life: 100 + Math.random() * 100,
            maxLife: 200
          });
        }

        // Particle updates and rendering
        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.y -= p.vy; // Drift upwards
          p.x += p.vx + Math.sin(time * 0.004 + p.life) * 0.22; // Richer sway swing
          p.life -= 1;

          if (p.life <= 0 || p.x < 0 || p.x > canvas.width || p.y < -10) {
            particles.splice(i, 1);
            continue;
          }

          // Calculate distance multiplier (Glow factor)
          const dx = p.x - currentMouse.x;
          const dy = p.y - currentMouse.y;
          const distToCursor = Math.hypot(dx, dy);

          // Particles closer to the candle flame spotlight appear significantly brighter
          const lightFactor = Math.max(0.15, 1 - distToCursor / 520);
          const currentAlpha = (p.life / p.maxLife) * p.alpha * lightFactor;

          // Ember Color Interpolation: Transition from Ivory to Ember-Orange to Ash-Red
          const lifeRatio = p.life / p.maxLife;
          let colorString = `rgba(249, 238, 222, ${currentAlpha})`; // Standard Ivory
          
          if (lifeRatio < 0.35) {
            // Dying ember sparks (crimson-rose aura)
            const redIntensity = 244;
            const greenIntensity = Math.floor(63 + lifeRatio * 150);
            const blueIntensity = Math.floor(94 + lifeRatio * 100);
            colorString = `rgba(${redIntensity}, ${greenIntensity}, ${blueIntensity}, ${currentAlpha * 1.15})`;
          } else if (lifeRatio < 0.65) {
            // Mid-life warm ember glow (rich golden orange)
            const r = 245;
            const g = Math.floor(140 + (lifeRatio - 0.35) * 200);
            const b = 40;
            colorString = `rgba(${r}, ${g}, ${b}, ${currentAlpha * 1.1})`;
          }

          ctx.fillStyle = colorString;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animFrameId = requestAnimationFrame(tick);
    };
    animFrameId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animFrameId);
    };
  }, []);

  return (
    <section className="hero-section" ref={sectionRef}>
      <div 
        className={`hero-bg-wrapper ${isLoaded ? 'loaded' : ''}`}
        style={isMobile ? {
          transform: `scale(${isLoaded ? 1.04 : 1.10})`
        } : { 
          transform: `translate(${mousePos.x * -24}px, ${mousePos.y * -24}px) scale(${isLoaded ? 1.10 : 1.18})`
        }}
      >
        <video 
          className="hero-video"
          src={`${import.meta.env.BASE_URL}video.mp4`}
          autoPlay 
          muted 
          loop 
          playsInline
        />
        <div 
          className="hero-overlay"
          style={{
            background: `radial-gradient(circle ${flickerRadius}px at ${mousePixelPos.x}px ${mousePixelPos.y}px, rgba(238, 125, 90, ${flickerOpacity}) 0%, rgba(20, 18, 16, 0.84) 60%, rgba(10, 9, 8, 0.93) 100%)`
          }}
        />
        <canvas className="hero-particles-canvas" ref={canvasRef} />
      </div>
      
      <div className="hero-content">
        <h1 ref={titleRef} className={`hero-title ${isLoaded ? 'loaded' : ''}`}>
          Your<br />Heart,<br />Fully<br />Revealed.
        </h1>
      </div>
      
      <div className={`hero-empathy-wrapper ${isLoaded ? 'loaded' : ''}`}>
        <p className="hero-empathy-text">
          뻔한 포장지 속,<br />다 전하지 못한 마음이 있지는 않나요?
        </p>
      </div>

      <div 
        ref={subRef}
        className={`hero-sub-wrapper ${isLoaded ? 'loaded' : ''}`}
        style={isMobile ? {} : {
          transform: `translate(${mousePos.x * 14}px, ${mousePos.y * 14}px)`
        }}
      >
        <h2 className="hero-sub">
          Secrets read in the flame.
        </h2>
      </div>

      {/* Down Scroll Indicator */}
      <div className={`hero-scroll-indicator ${isLoaded ? 'loaded' : ''}`}>
        <div className="scroll-line-box">
          <div className="scroll-line-pin"></div>
        </div>
      </div>

      {/* Cinematic Candle Flame Glow Border */}
      <div className="hero-candle-blend">
        <div className="blend-base" />
        <div className="candle-flames-container">
          <div className="flame-glow flame-back" />
          <div className="flame-glow flame-mid" />
          <div className="flame-glow flame-front" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
