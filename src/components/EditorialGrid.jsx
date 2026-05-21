import React, { useEffect, useRef } from 'react';
import './EditorialGrid.css';

const GRID_ITEMS = [
  {
    id: 1,
    image: 'mood_bedroom.png',
    title: '고요의 시간',
    desc: '하루의 끝자락, 침실을 감싸 안는 아늑함.',
    sizeClass: 'grid-large',
    parallaxSpeed: -0.06
  },
  {
    id: 2,
    image: 'mood_bathroom.png',
    title: '새로운 아침',
    desc: '유칼립투스 잎사귀와 청량한 해풍의 무드.',
    sizeClass: 'grid-medium-tall',
    parallaxSpeed: 0.09
  },
  {
    id: 3,
    image: 'mood_desk.png',
    title: '생각의 심연',
    desc: '고요한 서재에서 비로소 피어나는 영감.',
    sizeClass: 'grid-medium',
    parallaxSpeed: -0.04
  },
  {
    id: 4,
    image: 'mood_gifting.png',
    title: '정성스런 마음',
    desc: '다 말하지 않아도 스며드는 은은한 진심.',
    sizeClass: 'grid-wide',
    parallaxSpeed: 0.07
  }
];

const EditorialGrid = () => {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  const rafRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        if (!sectionRef.current) return;
        const sectionTop = sectionRef.current.getBoundingClientRect().top;
        const windowH = window.innerHeight;
        const progress = (windowH - sectionTop) / (windowH + sectionRef.current.offsetHeight);

        cardRefs.current.forEach((card, i) => {
          if (!card) return;
          // 모바일에서는 패럴랙스 비활성화 (이미지 잘림 방지)
          if (window.innerWidth <= 768) {
            card.style.transform = 'none';
            return;
          }
          const speed = GRID_ITEMS[i]?.parallaxSpeed ?? 0;
          const offset = (progress - 0.5) * windowH * speed;
          card.style.transform = `translateY(${offset.toFixed(2)}px) translateZ(0)`;
        });
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section className="editorial-section" ref={sectionRef}>
      <div className="editorial-container">
        
        {/* Header Text Block */}
        <div className="editorial-header animate-on-scroll">
          <span className="editorial-label">SPACE &amp; MOOD</span>
          <h2 className="editorial-title">공간의 온도를 바꾸는 감각</h2>
          <p className="editorial-header-desc">
            일상의 지극히 사소한 모퉁이에서도 은은하게 피어오르는 이야기를 채집해 보세요.
          </p>
        </div>

        {/* Masonry / Editorial Grid Layout */}
        <div className="editorial-grid">
          
          {GRID_ITEMS.map((item, i) => (
            <div 
              key={item.id} 
              className={`editorial-card animate-on-scroll ${item.sizeClass}`}
              ref={el => cardRefs.current[i] = el}
            >
              <div className="editorial-img-wrapper">
                <img 
                  src={`${import.meta.env.BASE_URL}${item.image}`} 
                  alt={item.title} 
                  className="editorial-img"
                />
                <div className="editorial-overlay">
                  <div className="editorial-text-wrap">
                    <h3 className="editorial-card-title">{item.title}</h3>
                    <p className="editorial-card-desc">{item.desc}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Inspirational Text Card integrated into the Grid */}
          <div className="editorial-card text-card animate-on-scroll">
            <div className="text-card-content">
              <span className="text-quote">"</span>
              <p className="text-body">
                시간이 지나 왁스가 녹고 메시지가 모습을 비출 때, 당신이 숨겨둔 진심은 마침내 누군가의 따뜻한 기억이 됩니다.
              </p>
              <span className="text-author">— LOOMING</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default EditorialGrid;

