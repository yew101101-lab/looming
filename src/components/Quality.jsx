import React from 'react';
import './Quality.css';

const Quality = () => {
  return (
    <section className="quality-section">
      <div className="quality-header animate-on-scroll">
        <h2>마지막 불꽃이 사그라들어도<br />곁에 머무는 짙은 여운</h2>
      </div>
      
      <div className="quality-cards">
        <div className="quality-card animate-on-scroll card-1">
          <div className="card-img-wrapper">
            <img src="/quality_wax.png" alt="프리미엄 왁스" className="card-img" />
          </div>
          <h3>프리미엄 왁스</h3>
          <p>그을림 없이 깨끗하게 연소되는 100% 식물성 소이 왁스만 사용합니다.</p>
        </div>
        <div className="quality-card animate-on-scroll card-2">
          <div className="card-img-wrapper">
            <img src="/quality_scent.png" alt="시그니처 향" className="card-img" />
          </div>
          <h3>시그니처 향</h3>
          <p>전문 조향사가 섬세하게 블렌딩한 깊고 풍부한 향기.</p>
        </div>
        <div className="quality-card animate-on-scroll card-3">
          <div className="card-img-wrapper">
            <img src="/quality_package.png" alt="정성스러운 패키지" className="card-img" />
          </div>
          <h3>정성스러운 패키지</h3>
          <p>선물 받는 분의 마음까지 생각한 환경 친화적이고 아름다운 포장.</p>
        </div>
      </div>
    </section>
  );
};

export default Quality;
