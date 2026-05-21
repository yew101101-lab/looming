import React, { useEffect, useRef, useState } from 'react';
import './FinalCTA.css';

const FinalCTA = ({ onNavigate, onDarkChange }) => {
  const sectionRef = useRef(null);
  const [isDarkened, setIsDarkened] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const dark = entry.isIntersecting;
        setIsDarkened(dark);
        if (onDarkChange) {
          onDarkChange(dark);
        }
      });
    }, { threshold: 0.5 });

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [onDarkChange]);

  return (
    <section className={`cta-section ${isDarkened ? 'dark-mode' : ''}`} ref={sectionRef}>
      <div className="cta-content animate-on-scroll">
        <h2>지금, 가장 깊은 진심을 새겨보세요</h2>
        <button className="btn-cta cta-button" onClick={() => onNavigate && onNavigate('shop')}>
          나만의 진심 새기기
        </button>
      </div>
    </section>
  );
};

export default FinalCTA;
