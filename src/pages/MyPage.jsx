import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './MyPage.css';

const INITIAL_LETTERS = [
  {
    id: 'l1',
    from: '서진',
    date: '2026.05.12',
    status: 'Revealed (발현됨)',
    text: '소이왁스가 다 녹아내리는 동안 내내 널 생각했어. 네가 이 촛불을 끄고 밤하늘을 볼 때, 나도 같은 달을 올려다보고 있을 거야. 늘 곁에 있어 줘서 고마워.',
    candleName: 'Dewy Rose & Cassis'
  },
  {
    id: 'l2',
    from: '은우',
    date: '2026.05.19',
    status: 'Locked (연소중)',
    text: '말솜씨가 서툴러서 초 아래 내 마음을 꾹꾹 적어 보낸다. 촛불이 절반쯤 줄어들고 불빛이 페이퍼를 비출 때 즈음, 내 목소리가 너의 마음에 가닿기를 바라.',
    candleName: 'Dawn Pine & Sandalwood'
  }
];

const INITIAL_ORDERS = [
  {
    id: 'o1',
    to: '지현',
    scentName: 'Windy Cliff & Sage',
    message: '새로운 도전을 언제나 묵묵히 응원해. 지칠 땐 이 향과 조용한 불꽃 아래서 쉬어가길.',
    date: '2026.05.15',
    price: 39000,
    status: '배송중'
  }
];

const SCENT_OPTIONS = [
  { name: 'Dewy Rose & Cassis', price: 39000, color: '#F2ECE4' },
  { name: 'Dawn Pine & Sandalwood', price: 42000, color: '#E5EADF' },
  { name: 'Windy Cliff & Sage', price: 39000, color: '#E2E6EA' }
];

const MyPage = ({ pendingCastItems = [], onCastCandle, activeTab, setActiveTab, onNavigate }) => {
  const [letters, setLetters] = useState(() => {
    try { return JSON.parse(localStorage.getItem('looming_letters')) || INITIAL_LETTERS; }
    catch { return INITIAL_LETTERS; }
  });
  const [orders, setOrders] = useState(() => {
    try { return JSON.parse(localStorage.getItem('looming_orders')) || INITIAL_ORDERS; }
    catch { return INITIAL_ORDERS; }
  });
  const [activeLetterId, setActiveLetterId] = useState(null);

  // localStorage 동기화
  useEffect(() => {
    localStorage.setItem('looming_letters', JSON.stringify(letters));
  }, [letters]);

  useEffect(() => {
    localStorage.setItem('looming_orders', JSON.stringify(orders));
  }, [orders]);

  // Custom Candle Form State
  const [selectedScentIndex, setSelectedScentIndex] = useState(0);
  const [toName, setToName] = useState('');
  const [secretMessage, setSecretMessage] = useState('');
  const [isCasting, setIsCasting] = useState(false);
  const [isSmoking, setIsSmoking] = useState(false);
  const [selectedPendingId, setSelectedPendingId] = useState(null);

  // Sync / Auto-Focus on the first pending cast item when list updates
  useEffect(() => {
    if (pendingCastItems.length > 0) {
      const exists = pendingCastItems.some(item => item.pendingId === selectedPendingId);
      if (!exists) {
        const firstItem = pendingCastItems[0];
        setSelectedPendingId(firstItem.pendingId);
        const matchIdx = SCENT_OPTIONS.findIndex(opt => opt.name === firstItem.name);
        if (matchIdx !== -1) {
          setSelectedScentIndex(matchIdx);
        }
      }
    } else {
      setSelectedPendingId(null);
    }
  }, [pendingCastItems, selectedPendingId]);

  const toggleLetter = (id) => {
    setActiveLetterId(activeLetterId === id ? null : id);
  };

  const handleCreateOrder = (e) => {
    e.preventDefault();
    if (!toName.trim() || !secretMessage.trim()) {
      alert('받는 사람 이름과 가려진 편지 내용을 모두 작성해 주세요.');
      return;
    }

    if (selectedPendingId === null) {
      alert('주조할 대기 캔들이 선택되어 있지 않습니다.');
      return;
    }

    setIsCasting(true);

    // Simulate luxury candle crafting and payment
    setTimeout(() => {
      const targetScent = SCENT_OPTIONS[selectedScentIndex];

      const newOrder = {
        id: `o_${Date.now()}`,
        to: toName,
        scentName: targetScent.name,
        message: secretMessage,
        date: new Date().toLocaleDateString('ko-KR').replace(/\s/g, '').slice(0, -1),
        price: 0, // already paid
        status: '주조완료 (배송준비)'
      };

      setOrders(prev => [newOrder, ...prev]);

      // Remove from pending list
      if (onCastCandle) {
        onCastCandle(selectedPendingId);
      }
      setSelectedPendingId(null);
      setIsCasting(false);

      // Reset form
      setToName('');
      setSecretMessage('');

      // Smoke fog transition before tab change
      setIsSmoking(true);
      setTimeout(() => {
        setActiveTab('ordered');
        setIsSmoking(false);
      }, 1200);
    }, 2800);
  };

  const activePendingCandle = pendingCastItems.find(item => item.pendingId === selectedPendingId);

  return (
    <div className="mypage-page animate-fade-in">
      {/* Smoke Fog Transition Overlay — Portal to document.body for full-screen coverage */}
      {isSmoking && ReactDOM.createPortal(
        <div className="smoke-transition-overlay">
          <div className="smoke-puff sp1" />
          <div className="smoke-puff sp2" />
          <div className="smoke-puff sp3" />
        </div>,
        document.body
      )}
      <div className="mypage-header">
        <h1 className="mypage-title">MY MEMOIR</h1>
        <p className="mypage-subtitle">온기로 밝힌 소중한 약속과 진심의 기록</p>
      </div>

      {/* Dashboard Grid */}
      <div className="mypage-grid">
        
        {/* Left User Profile Panel */}
        <div className="user-profile-card">
          <div className="profile-avatar">
            <span className="avatar-char">C</span>
          </div>
          <div className="profile-details">
            <h2 className="user-name">아날로그 살롱 회원님</h2>
            <span className="user-email">memoir@candleco.com</span>
            <span className="user-level">SILVER MEMOIRIST</span>
          </div>
          <div className="profile-stats">
            <div className="stat-item">
              <span className="stat-num">{letters.length}</span>
              <span className="stat-label">받은 고백</span>
            </div>
            <div className="stat-item">
              <span className="stat-num">{orders.length}</span>
              <span className="stat-label">커스텀 주문</span>
            </div>
          </div>
        </div>

        {/* Right Dashboard Area */}
        <div className="letters-dashboard">
          
          {/* Serif Tab Navigation */}
          <div className="mypage-tabs">
            <button 
              className={`tab-btn ${activeTab === 'received' ? 'active' : ''}`}
              onClick={() => setActiveTab('received')}
            >
              RECEIVED LETTERS
            </button>
            <button 
              className={`tab-btn ${activeTab === 'custom' ? 'active' : ''}`}
              onClick={() => setActiveTab('custom')}
            >
              CANDLE Maker {pendingCastItems.length > 0 && <span className="tab-alert-dot"></span>}
            </button>
            <button 
              className={`tab-btn ${activeTab === 'ordered' ? 'active' : ''}`}
              onClick={() => setActiveTab('ordered')}
            >
              ORDER HISTORY
            </button>
          </div>

          {/* Tab 1: Received Letters */}
          {activeTab === 'received' && (
            <div className="tab-content-panel animate-fade-in">
              <h2 className="dashboard-section-title">비밀 고백 레터 보관함 (Revealed Letters)</h2>
              <p className="dashboard-section-desc">선물 받은 캔들이 타올라 왁스 수면 위로 피어난 가상 편지들을 읽을 수 있습니다.</p>

              <div className="letters-list">
                {letters.map(letter => {
                  const isOpen = activeLetterId === letter.id;
                  return (
                    <div key={letter.id} className={`letter-card ${isOpen ? 'open' : ''}`}>
                      <div className="letter-card-header" onClick={() => toggleLetter(letter.id)}>
                        <div className="letter-header-left">
                          <span className="letter-from">From. {letter.from}</span>
                          <span className="letter-candle">{letter.candleName}</span>
                        </div>
                        <div className="letter-header-right">
                          <span className="letter-date">{letter.date}</span>
                          <span className={`letter-status ${letter.status.includes('Revealed') ? 'revealed' : 'locked'}`}>
                            {letter.status}
                          </span>
                        </div>
                      </div>
                      
                      {isOpen && (
                        <div className="letter-card-body">
                          <div className="letter-paper">
                            <p className="letter-text">{letter.text}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Tab 2: Custom Candle Maker (Atelier) */}
          {activeTab === 'custom' && (
            pendingCastItems.length === 0 ? (
              <div className="tab-content-panel empty-atelier animate-fade-in">
                <div className="empty-atelier-icon">
                  <svg className="icon-candle-empty" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.7 }}>
                    <path d="M12 2c-.8 1.8-1.5 3-1.5 4.5 0 1.4.8 2.5 1.5 2.5s1.5-1.1 1.5-2.5c0-1.5-.7-2.7-1.5-4.5z" fill="#ee7d5a" stroke="none" />
                    <line x1="12" y1="9" x2="12" y2="12" stroke="currentColor" />
                    <rect x="9" y="12" width="6" height="10" rx="1.5" stroke="currentColor" />
                  </svg>
                </div>
                <h2 className="empty-atelier-title">공방에 대기 중인 향초가 없습니다</h2>
                <p className="empty-atelier-desc">
                  마음을 새길 향초를 먼저 SHOP에서 주문해 주세요. 결제 완료된 품목이 이곳으로 자동 입고되어 편지를 주조할 수 있게 됩니다.
                </p>
                <button className="go-shop-btn" onClick={() => onNavigate('shop')}>
                  SHOP COLLECTION 보러가기
                </button>
              </div>
            ) : (
              <div className="tab-content-panel maker-wrapper-container animate-fade-in">
                
                {/* 1. Pending Cast Items Queue (Shop Checkout Integration) */}
                <div className="pending-cast-section">
                  <h3 className="pending-section-title">결제 완료된 주조 대기 향초 ({pendingCastItems.length})</h3>
                  <p className="pending-section-desc">
                    비밀 편지 봉인을 기다리는 캔들입니다. 아래 향초 카드를 눌러 제작 타겟을 스왑하실 수 있습니다.
                  </p>
                  <div className="pending-cast-list">
                    {pendingCastItems.map(item => {
                      const isSelected = selectedPendingId === item.pendingId;
                      return (
                        <div 
                          key={item.pendingId} 
                          className={`pending-cast-card ${isSelected ? 'selected' : ''}`}
                          onClick={() => {
                            setSelectedPendingId(item.pendingId);
                            const matchIdx = SCENT_OPTIONS.findIndex(opt => opt.name === item.name);
                            if (matchIdx !== -1) {
                              setSelectedScentIndex(matchIdx);
                            }
                          }}
                        >
                          <span className="pending-card-scent">{item.name}</span>
                          <span className="pending-card-badge">주조 대기</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="maker-panel-layout">
                  {/* Custom Form */}
                  <form className="candle-maker-form" onSubmit={handleCreateOrder}>
                    <h2 className="dashboard-section-title">결제 캔들 편지 봉인</h2>
                    <p className="dashboard-section-desc">
                      선택된 캔들의 왁스 속에 가려질 고백 편지를 마저 작성해 주조를 완성해 주세요.
                    </p>
                    
                    {/* Fixed Scent Information instead of radio input */}
                    <div className="form-group">
                      <label className="form-label">메시지를 봉인할 향초</label>
                      <div className="scent-fixed-display">
                        <span className="fixed-scent-name">{activePendingCandle?.name || '선택된 향초 없음'}</span>
                        <span className="fixed-scent-badge">결제완료</span>
                      </div>
                    </div>

                    {/* To. Name */}
                    <div className="form-group">
                      <label className="form-label" htmlFor="toNameInput">받는 사람 (To.)</label>
                      <input 
                        type="text" 
                        id="toNameInput" 
                        placeholder="소중한 분의 이름을 적어주세요 (예: 은우, 민서)" 
                        value={toName}
                        onChange={(e) => setToName(e.target.value)}
                        maxLength={15}
                        className="maker-input"
                      />
                    </div>

                    {/* Hidden Message Content */}
                    <div className="form-group">
                      <label className="form-label" htmlFor="messageInput">
                        왁스 아래 가려질 비밀 고백 편지 (최대 100자)
                      </label>
                      <textarea 
                        id="messageInput"
                        placeholder="캔들이 불빛을 만나 녹기 전까지는 왁스 속에 봉인되어 드러나지 않습니다. 마음을 담은 조용하고 귀한 메시지를 꾹 적어주세요."
                        value={secretMessage}
                        onChange={(e) => setSecretMessage(e.target.value.slice(0, 100))}
                        className="maker-textarea"
                        rows={4}
                      />
                      <span className="char-counter">{secretMessage.length}/100</span>
                    </div>

                    <button type="submit" className="cast-submit-btn">
                      편지 봉인 및 주조 시작
                      <svg className="icon-candle-btn" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle', marginLeft: '8px' }}>
                        <path d="M12 2c-.8 1.8-1.5 3-1.5 4.5 0 1.4.8 2.5 1.5 2.5s1.5-1.1 1.5-2.5c0-1.5-.7-2.7-1.5-4.5z" fill="#ee7d5a" stroke="none" />
                        <line x1="12" y1="9" x2="12" y2="12" stroke="currentColor" />
                        <rect x="9" y="12" width="6" height="10" rx="1" stroke="currentColor" />
                      </svg>
                    </button>
                  </form>

                  {/* Realtime Live Simulator Previewer */}
                  <div className="live-previewer-box">
                    <h3 className="previewer-title">REAL-TIME CANDLE PREVIEW</h3>
                    <span className="previewer-subtitle">마우스를 캔들 유리병에 올려 왁스를 녹여보세요</span>
                    
                    <div className="virtual-candle-dome">
                      {/* Wick & Flame */}
                      <div className="preview-wick"></div>
                      <div className="preview-flame"></div>
                      
                      {/* Transparent Glass Vessel */}
                      <div className="preview-glass">
                        {/* Soy Wax Layer */}
                        <div 
                          className="preview-wax-wax"
                          style={{ backgroundColor: SCENT_OPTIONS[selectedScentIndex]?.color || '#F2ECE4' }}
                        ></div>
                        
                        {/* Hidden Letter Reveal underneath/inside the liquid wax */}
                        <div className="preview-letter-reveal">
                          <span className="preview-to">{toName ? `To. ${toName}` : 'To. Receiver'}</span>
                          <p className="preview-msg">
                            {secretMessage ? secretMessage : '불꽃이 왁스를 녹이면 이곳에 적은 비밀 편지가 투명하게 드러납니다.'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            )
          )}

          {/* Tab 3: Order History */}
          {activeTab === 'ordered' && (
            <div className="tab-content-panel animate-fade-in">
              <h2 className="dashboard-section-title">커스텀 주문 & 주조 역사</h2>
              <p className="dashboard-section-desc">내가 직접 고백을 심어 주조 완료한 커스텀 캔들의 실시간 배송 및 소장 정보입니다.</p>

              <div className="orders-list">
                {orders.map(order => (
                  <div key={order.id} className="order-history-card">
                    <div className="order-card-top">
                      <span className="order-date">{order.date}</span>
                      <span className="order-id">주문번호: #{order.id.slice(-8)}</span>
                    </div>
                    <div className="order-card-body">
                      <div className="order-details">
                        <span className="order-scent-badge">{order.scentName}</span>
                        <h3 className="order-to-title">Recipient: To. {order.to}</h3>
                        <p className="order-sealed-msg">“ {order.message} ”</p>
                      </div>
                      <div className="order-status-box">
                        <span className="order-price">{order.price === 0 ? '결제완료건' : `₩${order.price.toLocaleString()}`}</span>
                        <span className="order-status-badge">{order.status}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Crafting Loading Overlay — Portal to document.body for true viewport centering */}
      {isCasting && ReactDOM.createPortal(
        <div className="checkout-modal-overlay">
          <div className="checkout-modal-card">
            <div className="modal-candle-loader">
              <div className="loader-wick"></div>
              <div className="loader-flame"></div>
              <div className="loader-body"></div>
            </div>
            <h3 className="modal-heading igniting-text">비밀 편지 캔들 주조중...</h3>
            <p className="modal-desc">
              선택하신 천연 에센셜 오일을 블렌딩하고, 골든 소이 왁스 액상 속에 작성하신 편지를 가둔 채 급속 쿨링 왁싱 공정을 진행하고 있습니다.
            </p>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default MyPage;
