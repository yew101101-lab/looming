import React, { useEffect, useRef, useState } from 'react';
import './CoreFeature.css';

const CoreFeature = () => {
  const sectionRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);

  // 반응형 감지
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 데스크탑 전용 스크롤 이미지 전환
  useEffect(() => {
    const handleScroll = () => {
      if (window.matchMedia('(max-width: 768px)').matches) return;
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      if (rect.top < windowHeight && rect.bottom > 0) {
        const totalDist = rect.height + windowHeight;
        const scrolled = windowHeight - rect.top;
        const progress = Math.min(Math.max(scrolled / totalDist, 0), 1);
        setScrollProgress(progress);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  let activeImg = 1;
  if (scrollProgress >= 0.33 && scrollProgress < 0.66) activeImg = 2;
  else if (scrollProgress >= 0.66) activeImg = 3;

  // 모바일 인라인 스타일 — CSS 특이성·sticky 문제를 JS 레벨에서 완전 우회
  const wrapperStyle = isMobile ? {
    position: 'static',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    maxWidth: '100%',
    margin: '0',
    padding: '0',
    opacity: 1,
    transform: 'none',
    transition: 'none',
    top: 'auto',
    left: 'auto',
  } : {};

  return (
    <section className="core-feature-section" ref={sectionRef}>
      <div className="core-content-wrapper animate-on-scroll" style={wrapperStyle}>
        <div className="core-text">
          <h2>
            기다림이 끝나는 순간,<br />비로소 당신의 이야기가 시작됩니다
          </h2>
          <p>시간이 지나 왁스가 녹으면, 숨겨두었던 메시지가 천천히 모습을 드러냅니다.</p>
        </div>
        <div className="core-images">
          <div className={`candle-img img-1 ${activeImg === 1 ? 'active' : ''}`}></div>
          <div className={`candle-img img-2 ${activeImg === 2 ? 'active' : ''}`}></div>
          <div className={`candle-img img-3 ${activeImg === 3 ? 'active' : ''}`}></div>
        </div>
      </div>
    </section>
  );
};

export default CoreFeature;
