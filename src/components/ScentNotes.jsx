import React, { useState, useEffect, useRef } from 'react';
import './ScentNotes.css';

const SCENT_DATA = [
  {
    id: 'rose',
    title: '이슬 맺힌 장미 정원',
    englishTitle: 'Dewy Rose & Cassis',
    tagline: '안개 낀 아침, 이슬을 머금은 싱그러운 생장미의 향',
    description: '물기를 머금은 블랙커런트 잎의 파릇함 and 화사한 로즈 어코드의 조화가 마치 비밀스러운 정원을 산책하는 듯한 감각을 선물합니다.',
    image: 'scent_rose.png',
    bgColor: '#FDF6F5',
    notes: [
      {
        level: 'TOP NOTE',
        ingredients: '블랙커런트 잎, 그린 리프, 베르가못',
        desc: '코끝을 스치는 쌉싸름하고 싱그러운 첫인상',
        noteImage: 'quality_scent.png'
      },
      {
        level: 'MIDDLE NOTE',
        ingredients: '불가리안 로즈, 제라늄',
        desc: '풍성하게 피어나는 관능적이고 우아한 생장미의 향조',
        noteImage: 'scent_rose.png'
      },
      {
        level: 'BASE NOTE',
        ingredients: '머스크, 앰버, 시더우드',
        desc: '체온과 어우러져 깊고 포근하게 스며드는 여운',
        noteImage: 'mood_desk.png'
      }
    ]
  },
  {
    id: 'pine',
    title: '새벽녘의 침엽수림',
    englishTitle: 'Dawn Pine & Sandalwood',
    tagline: '차갑게 내려앉은 새벽 공기와 묵직한 침엽수의 만남',
    description: '주니퍼 베리의 청량한 첫 노트를 지나, 깊은 숲속 가문비나무와 스모키한 인센스의 차분함이 마음의 평온을 선사합니다.',
    image: 'scent_pine.png',
    bgColor: '#F3F6F4',
    notes: [
      {
        level: 'TOP NOTE',
        ingredients: '주니퍼 베리, 레몬, 베르가못',
        desc: '새벽 안개를 뚫고 들어오는 차갑고 맑은 청량감',
        noteImage: 'quality_scent.png'
      },
      {
        level: 'MIDDLE NOTE',
        ingredients: '솔잎, 인센스, 오리스',
        desc: '고요한 숲 한가운데 서 있는 듯한 스모키 우디 향조',
        noteImage: 'scent_pine.png'
      },
      {
        level: 'BASE NOTE',
        ingredients: '샌달우드, 바닐라, 앰버',
        desc: '부드럽고 달콤하면서도 무게감 있게 중심을 잡아주는 잔향',
        noteImage: 'mood_bedroom.png'
      }
    ]
  },
  {
    id: 'sage',
    title: '바람 부는 절벽과 세이지',
    englishTitle: 'Windy Cliff & Sage',
    tagline: '깎아지른 절벽 위 세이지 향과 짭조름한 바닷바람',
    description: '소금기를 가득 머금은 활기찬 해풍과 대지의 야생 세이지가 어우러져, 자연 그대로의 생명력과 자유로움을 채워냅니다.',
    image: 'scent_sage.png',
    bgColor: '#F1F4F7',
    notes: [
      {
        level: 'TOP NOTE',
        ingredients: '암브레트 씨드, 그레이프프루트',
        desc: '태양 빛을 받아 투명하게 빛나는 시트러스의 터치',
        noteImage: 'quality_scent.png'
      },
      {
        level: 'MIDDLE NOTE',
        ingredients: '씨 솔트, 세이지',
        desc: '파도가 부서지며 뿜어내는 짭조름함과 야생 허브의 이국적 어우러짐',
        noteImage: 'scent_sage.png'
      },
      {
        level: 'BASE NOTE',
        ingredients: '레드 알게, 과약우드',
        desc: '대지의 따스함과 미네랄의 깊이를 남기는 나무의 잔향',
        noteImage: 'mood_bathroom.png'
      }
    ]
  }
];

const ScentNotes = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredNoteIndex, setHoveredNoteIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  const [isSliding, setIsSliding] = useState(false);
  const autoSlideRef = useRef(null);
  const slidingRef = useRef(false); // 중복 트랜지션 방지
  const currentScent = SCENT_DATA[activeIndex];

  // 반응형 감지
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // 부드러운 슬라이드 전환 헬퍼
  const transitionTo = (nextIndex) => {
    if (slidingRef.current) return;
    slidingRef.current = true;
    setIsSliding(true);                       // ① fade-out 시작
    setTimeout(() => {
      setActiveIndex(nextIndex);             // ② 콘텐츠 교체
      setHoveredNoteIndex(null);
      setIsSliding(false);                   // ③ fade-in 시작
      slidingRef.current = false;
    }, 260);                                  // fade-out 지속시간과 동일
  };

  // 모바일 자동 슬라이드 (3.5초마다)
  useEffect(() => {
    if (!isMobile) {
      if (autoSlideRef.current) clearInterval(autoSlideRef.current);
      return;
    }
    autoSlideRef.current = setInterval(() => {
      setActiveIndex(prev => {
        const next = (prev + 1) % SCENT_DATA.length;
        transitionTo(next);
        return prev; // transitionTo가 실제 변경 담당
      });
    }, 3500);
    return () => clearInterval(autoSlideRef.current);
  }, [isMobile]);

  const handleTabChange = (index) => {
    if (index === activeIndex) return;
    transitionTo(index);
    // 수동 탭 변경 시 타이머 리셋
    if (autoSlideRef.current) {
      clearInterval(autoSlideRef.current);
      if (isMobile) {
        autoSlideRef.current = setInterval(() => {
          setActiveIndex(prev => {
            const next = (prev + 1) % SCENT_DATA.length;
            transitionTo(next);
            return prev;
          });
        }, 3500);
      }
    }
  };

  return (
    <section 
      className="scent-notes-section" 
      style={{ backgroundColor: currentScent.bgColor }}
    >
      <div className="scent-notes-container">
        
        {/* Section Header */}
        <div className="scent-header animate-on-scroll">
          <span className="scent-subtitle">SCENT ARCHIVE</span>
          <h2 className="scent-title">공간을 채우는 시적인 언어</h2>
          <p className="scent-header-desc">
            시간에 흐름에 따라 변화하며 보이지 않는 공기 속에 그린 무드를 직접 경험해 보세요.
          </p>
        </div>

        {/* Tab Buttons / Mobile Dot Indicator */}
        {isMobile ? (
          <div className="scent-mobile-indicator">
            <span className="scent-active-label">{currentScent.englishTitle}</span>
            <div className="scent-dots">
              {SCENT_DATA.map((_, index) => (
                <button
                  key={index}
                  className={`scent-dot ${index === activeIndex ? 'active' : ''}`}
                  onClick={() => handleTabChange(index)}
                  aria-label={SCENT_DATA[index].englishTitle}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="scent-tabs animate-on-scroll">
            {SCENT_DATA.map((scent, index) => (
              <button
                key={scent.id}
                className={`scent-tab-btn ${index === activeIndex ? 'active' : ''}`}
                onClick={() => handleTabChange(index)}
              >
                <span className="tab-num">0{index + 1}</span>
                <span className="tab-name">{scent.englishTitle}</span>
              </button>
            ))}
          </div>
        )}

        {/* Dynamic Display Area */}
        <div className={`scent-content-grid${isSliding ? ' scent-sliding' : ''}`}>
          
          {/* Column 1: Image Frame */}
          <div className="scent-image-wrapper animate-on-scroll">
            <div className="scent-image-frame">
              {/* Base Scent Image */}
              <img 
                src={`${import.meta.env.BASE_URL}${currentScent.image}`} 
                alt={currentScent.title} 
                className="scent-image base-image"
              />
              {/* Hover Ingredient Note Images (Pre-rendered for smooth transition) */}
              {currentScent.notes.map((note, idx) => (
                <img 
                  key={idx}
                  src={`${import.meta.env.BASE_URL}${note.noteImage}`} 
                  alt={`${note.level} concept`} 
                  className={`scent-image overlay-image ${hoveredNoteIndex === idx ? 'active' : ''}`}
                />
              ))}
            </div>
            <div className="scent-meta-text">
              <h3>{currentScent.title}</h3>
              <p>{currentScent.tagline}</p>
            </div>
          </div>

          {/* Column 2: Story & Notes */}
          <div className="scent-info-wrapper animate-on-scroll">
            <div className="scent-story">
              <span className="editorial-label">EDITORIAL DESCRIPTION</span>
              <p className="scent-desc-main">{currentScent.description}</p>
            </div>

            <div className="scent-pyramid">
              <span className="editorial-label">SCENT PYRAMID</span>
              
              <div className="pyramid-list">
                {currentScent.notes.map((note, idx) => (
                  <div 
                    key={idx} 
                    className="pyramid-item"
                    onMouseEnter={() => setHoveredNoteIndex(idx)}
                    onMouseLeave={() => setHoveredNoteIndex(null)}
                  >
                    <div className="pyramid-label-container">
                      <span className="pyramid-level">{note.level}</span>
                      <span className="pyramid-ing">{note.ingredients}</span>
                    </div>
                    <p className="pyramid-desc">{note.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default ScentNotes;
