import React, { useState } from 'react';
import './ScentArchive.css';

const SCENTS = [
  {
    id: 's1',
    name: 'Dewy Rose & Cassis',
    tagline: '빗속을 헤치며 꺾어 올린 첫 생장미의 고혹함',
    desc: '화려하고 가벼운 인공 장미향이 아닙니다. 새벽 빗방울을 머금어 묵직하게 가라앉은 대지와 장미 가시에서 뿜어져 나오는 쌉싸름한 풋내가 첫 키를 이룹니다. 이어지는 블랙커런트의 상큼함이 장미 꽃잎의 무게감을 부드럽게 감싸 안으며, 비밀 서재의 가죽 냄새처럼 고풍스러운 잔향을 머금습니다.',
    ingredients: ['생장미 오일', '블랙커런트 꽃잎', '다마스크 로즈 앱솔루트', '프렌치 머스크'],
    notes: {
      top: ['Cassis (블랙커런트)', 'Green Leaf (생잎새)'],
      middle: ['Bulgarian Rose (생장미)', 'Geranium (제라늄)'],
      base: ['White Musk (머스크)', 'Warm Amber (호박향)']
    },
    img: '/scent_rose.png'
  },
  {
    id: 's2',
    name: 'Dawn Pine & Sandalwood',
    tagline: '안개 서린 새벽 숲속의 고요한 침묵',
    desc: '깊은 산 속, 첫 햇살이 안개를 비추기 직전의 고요함을 옮겨 담았습니다. 시베리아 소나무 바늘잎의 알싸하고 푸릇한 향이 코끝을 깨우고, 오래된 서목(Cypress)들이 내뿜는 깊은 숨결이 이어집니다. 마지막으로 대지에 뿌리를 내린 샌달우드의 무겁고 부드러운 흙내음이 공간 전체에 두터운 평온을 안겨줍니다.',
    ingredients: ['시베리안 파인 니들', '사이프레스 목재', '인도산 샌달우드 에센셜', '패출리 오일'],
    notes: {
      top: ['Pine Needle (솔잎)', 'Eucalyptus (유칼립투스)'],
      middle: ['Cypress (편백나무)', 'Atlas Cedarwood (삼나무)'],
      base: ['East Indian Sandalwood (백단향)', 'Patchouli (흙풀향)']
    },
    img: '/scent_pine.png'
  },
  {
    id: 's3',
    name: 'Windy Cliff & Sage',
    tagline: '절벽 위를 매섭게 스쳐 지나가는 싱그러운 바람',
    desc: '거친 파도가 부딪히는 하얀 절벽 끝자락, 바닷바람을 맞으며 자라난 자연산 세이지 풀잎의 야생적인 에너지를 모티브로 삼았습니다. 짭조름한 바다 소금기가 공기 중에 머무는 듯한 신선함으로 시작하여, 세이지와 해초류의 이색적인 허브 향이 심신을 정화합니다. 아스라이 깔리는 침엽수와 머스크가 기품을 잡아줍니다.',
    ingredients: ['프렌치 클라리 세이지', '씨솔트 미네랄', '대서양 해초 추출물', '시더우드 에센셜'],
    notes: {
      top: ['Sea Salt (바다 소금)', 'Clary Sage (세이지)'],
      middle: ['Ambrette Seed (사치씨드)', 'Marine Seaweed (해초)'],
      base: ['Mineral Musk (바다 머스크)', 'Red Cedarwood (적삼나무)']
    },
    img: '/scent_sage.png'
  }
];

const ScentArchive = () => {
  const [selectedScent, setSelectedScent] = useState(SCENTS[0]);

  return (
    <div className="scent-archive-page animate-fade-in">
      <div className="archive-header">
        <h1 className="archive-title">SCENT ARCHIVE</h1>
        <p className="archive-subtitle">자연의 조율사가 남긴 오리지널 노트를 열람하다</p>
      </div>

      <div className="archive-main">
        {/* Left: Selector */}
        <div className="scent-selector">
          {SCENTS.map(scent => (
            <button
              key={scent.id}
              className={`scent-select-card ${selectedScent.id === scent.id ? 'active' : ''}`}
              onClick={() => setSelectedScent(scent)}
            >
              <span className="scent-select-title">{scent.name}</span>
              <span className="scent-select-tagline">{scent.tagline}</span>
            </button>
          ))}
        </div>

        {/* Right: Detail Content */}
        <div className="scent-detail-display">
          <div className="scent-detail-visual">
            <img src={selectedScent.img} alt={selectedScent.name} className="scent-detail-img" />
          </div>
          
          <div className="scent-detail-info">
            <h2 className="scent-detail-name">{selectedScent.name}</h2>
            <p className="scent-detail-tagline">“{selectedScent.tagline}”</p>
            <p className="scent-detail-desc">{selectedScent.desc}</p>
            
            {/* Scent Pyramid Graphic */}
            <div className="scent-pyramid">
              <h3 className="pyramid-title">SCENT PYRAMID</h3>
              
              <div className="pyramid-layer">
                <span className="layer-name">TOP NOTE</span>
                <span className="layer-values">{selectedScent.notes.top.join(' / ')}</span>
              </div>
              <div className="pyramid-layer">
                <span className="layer-name">MIDDLE NOTE</span>
                <span className="layer-values">{selectedScent.notes.middle.join(' / ')}</span>
              </div>
              <div className="pyramid-layer">
                <span className="layer-name">BASE NOTE</span>
                <span className="layer-values">{selectedScent.notes.base.join(' / ')}</span>
              </div>
            </div>

            {/* Ingredients */}
            <div className="ingredients-box">
              <h3 className="ingredients-title">KEY INGREDIENTS</h3>
              <div className="ingredients-list">
                {selectedScent.ingredients.map((ing, i) => (
                  <span key={i} className="ingredient-badge">{ing}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScentArchive;
