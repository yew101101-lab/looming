import React from 'react';
import './OurStory.css';

const OurStory = () => {
  return (
    <div className="our-story-page animate-fade-in">
      <div className="story-container">
        
        {/* Section 1: Intro */}
        <section className="story-section intro-section">
          <h1 className="story-main-title">OUR STORY</h1>
          <p className="story-lead">
            “불꽃이 닿아야만 읽을 수 있는, 애틋하고 비밀스러운 고백”
          </p>
          <div className="story-divider"></div>
          <p className="story-paragraph">
            편리함과 빠름이 미덕이 된 시대에 우리는 가장 아날로그적인 방식으로 마음을 전하는 법을 고민했습니다.
            LOOMING은 단순히 공간을 밝히고 향을 뿜어내는 도구를 만들지 않습니다.
            우리는 빛과 어둠, 온기가 만나 흐르는 순간의 침묵 속에 마음의 글귀를 심어 두는 메신저를 만듭니다.
          </p>
        </section>

        {/* Section 2: Visual & Concept */}
        <section className="story-section concept-section">
          <div className="concept-grid">
            <div className="concept-image-wrap">
              <img src="/mood_gifting.png" alt="Gifting mood" className="concept-img" />
            </div>
            <div className="concept-text-wrap">
              <h2 className="concept-title">THE REVEALING LETTER</h2>
              <p className="concept-desc">
                특수 제작된 내열 레터 페이퍼 위에 새겨진 고백은, 촛불이 켜지기 전까지 차가운 소이왁스 아래 완전히 은신해 있습니다.
                심지에 불꽃이 닿고, 왁스가 투명한 은빛 액체로 조금씩 녹아내릴 때에야 비로소 가려져 있던 소중한 문장들이 불빛을 타고 수면 위로 슥 피어오릅니다.
              </p>
              <p className="concept-desc">
                이 30분 남짓의 애타는 기다림의 시간은 마음을 섣불리 꺼내기보다, 촛불의 아른거리는 일렁임을 바라보며 
                그 사람의 존재와 진심의 온도를 음미하는 소중한 묵념이 됩니다.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Craftsmanship */}
        <section className="story-section craft-section">
          <div className="craft-grid">
            <div className="craft-text-wrap">
              <h2 className="concept-title">CRAFT AND RAW MATERIALS</h2>
              <p className="concept-desc">
                우리는 자연을 거스르지 않는 100% 천연 골든 소이 왁스만을 사용합니다.
                화학 수축 방지제나 파라핀을 첨가하지 않아, 왁스가 녹고 식는 과정이 유기적이고 자연스럽습니다.
                나무 심지(Wood Wick)가 타들어 갈 때 나는 조용한 장작 소리는 아날로그 소리의 잔향을 덧입히며 향의 무게감을 공기 중에 견고하게 가라앉힙니다.
              </p>
              <p className="concept-desc">
                모든 캔들은 향의 온전한 숙성을 위해 한 병 한 병 수작업으로 에센셜 오일을 계량하고 교반하여 생산됩니다.
                진심은 기계의 힘으로 대량 복제될 수 없다고 믿기 때문입니다.
              </p>
            </div>
            <div className="craft-image-wrap">
              <img src="/quality_package.png" alt="Craft packaging" className="craft-img" />
            </div>
          </div>
        </section>

        {/* Section 4: Outro Message */}
        <section className="story-section outro-section">
          <p className="outro-quote">
            “당신의 온기로 마음이 드러나는 순간, 그것은 세상에서 가장 비밀스러운 고백이 됩니다.”
          </p>
          <span className="brand-signature">LOOMING ARTISANS</span>
        </section>

      </div>
    </div>
  );
};

export default OurStory;
