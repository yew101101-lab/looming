import React, { useState, useEffect } from 'react';
import './Cart.css';

const Cart = ({ cartItems, onUpdateQuantity, onRemoveItem, onClearCart, onNavigate, onCheckoutSuccess }) => {
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(1); // 1: Confirm, 2: Igniting, 3: Completed
  const [selectedItemIds, setSelectedItemIds] = useState([]);

  // Sync selected checkboxes whenever cartItems length changes (new item added)
  useEffect(() => {
    setSelectedItemIds(cartItems.map(item => item.id));
  }, [cartItems.length]);

  // Calculations only for checked items
  const selectedItems = cartItems.filter(item => selectedItemIds.includes(item.id));
  const subtotal = selectedItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shippingFee = subtotal > 50000 || subtotal === 0 ? 0 : 3000;
  const total = subtotal + shippingFee;

  const handleToggleItem = (id) => {
    setSelectedItemIds(prev => 
      prev.includes(id) 
        ? prev.filter(itemId => itemId !== id) 
        : [...prev, id]
    );
  };

  const handleToggleAll = () => {
    if (selectedItemIds.length === cartItems.length) {
      setSelectedItemIds([]);
    } else {
      setSelectedItemIds(cartItems.map(item => item.id));
    }
  };

  const handleCheckout = () => {
    if (selectedItemIds.length === 0) {
      alert('주문 결제할 향초를 한 개 이상 선택해 주세요.');
      return;
    }
    setIsCheckoutModalOpen(true);
    setCheckoutStep(1);
  };

  const handleIgnite = () => {
    setCheckoutStep(2);
    const itemsToCheckout = [...selectedItems];
    // Simulate candle burning and transaction processing
    setTimeout(() => {
      setCheckoutStep(3);
      if (onCheckoutSuccess) {
        onCheckoutSuccess(itemsToCheckout);
      } else {
        onClearCart();
      }
    }, 2800);
  };

  const handleCloseModal = () => {
    setIsCheckoutModalOpen(false);
  };

  return (
    <div className="cart-page animate-fade-in">
      <div className="cart-header">
        <h1 className="cart-title">SHOPPING CART</h1>
        <p className="cart-subtitle">당신의 온기를 채우기 위해 대기 중인 고백들</p>
      </div>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <div className="empty-cart-visual">
            <svg className="empty-candle-svg" viewBox="0 0 80 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Flame */}
              <ellipse cx="40" cy="14" rx="5" ry="8" fill="#ee7d5a" opacity="0.9"/>
              <ellipse cx="40" cy="16" rx="3" ry="5" fill="#f7c59f" opacity="0.8"/>
              {/* Wick */}
              <line x1="40" y1="22" x2="40" y2="30" stroke="#3B332C" strokeWidth="1.5" strokeLinecap="round"/>
              {/* Body */}
              <rect x="26" y="30" width="28" height="70" rx="4" fill="none" stroke="#3B332C" strokeWidth="1.2"/>
              {/* Wax surface shimmer */}
              <rect x="26" y="30" width="28" height="12" rx="4" fill="rgba(59,51,44,0.06)"/>
              {/* Side reflection */}
              <line x1="31" y1="42" x2="31" y2="90" stroke="rgba(255,255,255,0.5)" strokeWidth="1" strokeLinecap="round"/>
            </svg>
            <div className="empty-cart-glow" />
          </div>
          <span className="empty-cart-label">YOUR COLLECTION IS EMPTY</span>
          <p className="empty-msg">공간을 채울 첫 향기를 선택해 보세요.</p>
          <p className="empty-submsg">LOOMING의 시그니처 향초가 당신의 기억 속에 조용히 스며들 것입니다.</p>
          <button className="go-shop-btn" onClick={() => onNavigate('shop')}>
            COLLECTION 둘러보기
          </button>
        </div>
      ) : (
        <div className="cart-content-layout">
          {/* Cart Table */}
          <div className="cart-items-list">
            <div className="cart-table-header">
              <span className="col-checkbox">
                <input 
                  type="checkbox"
                  checked={selectedItemIds.length === cartItems.length && cartItems.length > 0}
                  onChange={handleToggleAll}
                  className="cart-custom-checkbox"
                />
              </span>
              <span className="col-product">PRODUCT</span>
              <span className="col-qty">QUANTITY</span>
              <span className="col-price">TOTAL</span>
            </div>

            {cartItems.map(item => {
              const isChecked = selectedItemIds.includes(item.id);
              return (
                <div key={item.id} className={`cart-item-row ${isChecked ? '' : 'unchecked-row'}`}>
                  <div className="col-checkbox-cell">
                    <input 
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleToggleItem(item.id)}
                      className="cart-custom-checkbox"
                    />
                  </div>

                  <div className="item-product-info">
                    <div className="item-img-wrap">
                      <img src={item.img} alt={item.name} className="item-thumb" />
                    </div>
                    <div className="item-meta">
                      <h3 className="item-name">{item.name}</h3>
                      <span className="item-unit-price">₩{item.price.toLocaleString()}</span>
                      <button className="item-remove-btn" onClick={() => onRemoveItem(item.id)}>
                        REMOVE
                      </button>
                    </div>
                  </div>

                  <div className="item-qty-selector">
                    <button 
                      className="qty-adjust-btn"
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="qty-number">{item.quantity}</span>
                    <button 
                      className="qty-adjust-btn"
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>

                  <div className="item-total-price">
                    ₩{(item.price * item.quantity).toLocaleString()}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Cart Summary */}
          <div className="cart-summary-box">
            <h2 className="summary-title">ORDER SUMMARY</h2>
            
            <div className="summary-row">
              <span>선택 상품 총액 ({selectedItems.length}개)</span>
              <span>₩{subtotal.toLocaleString()}</span>
            </div>
            
            <div className="summary-row">
              <span>배송비 (₩50,000 이상 무료)</span>
              <span>{shippingFee === 0 ? 'FREE' : `₩${shippingFee.toLocaleString()}`}</span>
            </div>

            <div className="summary-divider"></div>

            <div className="summary-row total-row">
              <span>합계 금액</span>
              <span className="summary-total-price">₩{total.toLocaleString()}</span>
            </div>

            <button className="checkout-btn" onClick={handleCheckout}>
              CHECKOUT (진심 전달하기)
            </button>
          </div>
        </div>
      )}

      {/* Checkout Igniting Modal */}
      {isCheckoutModalOpen && (
        <div className="checkout-modal-overlay">
          <div className="checkout-modal-card">
            
            {checkoutStep === 1 && (
              <div className="modal-stepconfirm">
                <h3 className="modal-heading">주문 고백 확인</h3>
                <p className="modal-desc">
                  체크 선택하신 {selectedItems.length}종의 캔들 심지에 불을 붙여 상대방의 마음에 배송할 준비를 합니다.
                </p>
                <div className="confirm-total-box">
                  <span>최종 결제 금액</span>
                  <span className="confirm-total-val">₩{total.toLocaleString()}</span>
                </div>
                <div className="modal-buttons">
                  <button className="modal-cancel-btn" onClick={handleCloseModal}>
                    돌아가기
                  </button>
                  <button className="modal-ignite-btn" onClick={handleIgnite}>
                    불꽃 점화 (결제 완료하기)
                  </button>
                </div>
              </div>
            )}

            {checkoutStep === 2 && (
              <div className="modal-stepigniting">
                <div className="modal-candle-loader">
                  <div className="loader-wick"></div>
                  <div className="loader-flame"></div>
                  <div className="loader-body"></div>
                </div>
                <h3 className="modal-heading igniting-text">진심을 연소하는 중...</h3>
                <p className="modal-desc">
                  천연 소이왁스를 부드럽게 녹여 비밀 글귀를 활성화하고 있습니다. 잠시만 대기해 주세요.
                </p>
              </div>
            )}

            {checkoutStep === 3 && (
              <div className="modal-stepcompleted">
                <div className="success-icon-wrap">
                  <span className="success-emoji">
                    <svg className="icon-candle-success" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2c-.8 1.8-1.5 3-1.5 4.5 0 1.4.8 2.5 1.5 2.5s1.5-1.1 1.5-2.5c0-1.5-.7-2.7-1.5-4.5z" fill="#ee7d5a" stroke="none" />
                      <line x1="12" y1="9" x2="12" y2="12" stroke="currentColor" />
                      <rect x="9" y="12" width="6" height="10" rx="1" stroke="currentColor" />
                    </svg>
                  </span>
                </div>
                <h3 className="modal-heading">점화 완료 (전송 성공)</h3>
                <p className="modal-desc">
                  진심이 담긴 촛불 고백 레터가 배송을 시작했습니다. 
                  구매하신 향초는 **MY MEMOIR(마이페이지)**에서 확인 및 즉시 편지 봉인 주조가 가능합니다.
                </p>
                <div className="modal-success-buttons">
                  <button className="modal-finish-btn outline" onClick={handleCloseModal}>
                    쇼핑 계속하기
                  </button>
                  <button className="modal-finish-btn" onClick={() => {
                    handleCloseModal();
                    onNavigate('mypage', 'custom');
                  }}>
                    바로 편지 봉인하기
                    <svg className="icon-write-btn" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle', marginLeft: '6px' }}>
                      <path d="M12 20h9" />
                      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                    </svg>
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
