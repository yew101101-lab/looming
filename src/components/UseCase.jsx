import React, { useEffect, useRef, useState } from 'react';
import './UseCase.css';

const UseCase = () => {
  const sectionRef = useRef(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(max-width: 768px)').matches) return;

    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      if (rect.top < windowHeight && rect.bottom > 0) {
        // Calculate offset based on scroll position relative to center of screen
        const centerOffset = (rect.top + rect.height / 2) - windowHeight / 2;
        setOffset(centerOffset * 0.1);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="usecase-section" ref={sectionRef}>
      <div className="usecase-container">
        <div 
          className="usecase-text animate-on-scroll" 
          style={{ transform: `translateY(${offset}px)` }}
        >
          <h2>눈물이 날 만큼 애틋한,<br />단 하나의 서프라이즈</h2>
          <p>프로포즈, 기념일, 혹은 특별한 위로가 필요한 날. 말로는 다 하지 못한 진심을 은은한 향기와 함께 전해보세요.</p>
        </div>
        <div 
          className="usecase-image animate-on-scroll" 
          style={{ transform: `translateY(${-offset}px)` }}
        >
          <div 
            className="usecase-img-inner"
            style={{ backgroundImage: `url(${import.meta.env.BASE_URL}usecase_surprise_new.png)` }}
          >
            <span className="usecase-img-caption">SCENARIO CONCEPT N°04</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UseCase;
