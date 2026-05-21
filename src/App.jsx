import React, { useState, useEffect } from 'react';
import './App.css';
import CustomCursor from './components/CustomCursor';
import Header from './components/Header';
import Hero from './components/Hero';
import CoreFeature from './components/CoreFeature';
import ScentNotes from './components/ScentNotes';
import Quality from './components/Quality';
import UseCase from './components/UseCase';
import EditorialGrid from './components/EditorialGrid';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';

// Import newly created pages
import Shop from './pages/Shop';
import ScentArchive from './pages/ScentArchive';
import OurStory from './pages/OurStory';
import MyPage from './pages/MyPage';
import Cart from './pages/Cart';

function App() {
  const [view, setView] = useState('home');
  const [cartItems, setCartItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem('looming_cart')) || []; }
    catch { return []; }
  });
  const [pendingCastItems, setPendingCastItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem('looming_pending')) || []; }
    catch { return []; }
  });
  const [myPageActiveTab, setMyPageActiveTab] = useState('received');

  // Sync to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('looming_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('looming_pending', JSON.stringify(pendingCastItems));
  }, [pendingCastItems]);

  useEffect(() => {
    // Setup intersection observer for scroll animations (only relevant on home view)
    if (view === 'home') {
      // 모바일에서는 threshold를 0으로 낮춰 요소가 1px만 보여도 즉시 활성화
      const isMobile = window.innerWidth <= 768;
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      }, { threshold: isMobile ? 0 : 0.3 });

      document.querySelectorAll('.animate-on-scroll').forEach((el) => {
        observer.observe(el);
        // 이미 뷰포트 안에 있는 요소는 즉시 활성화 (모바일 첫 화면 요소 처리)
        if (isMobile) {
          const rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            el.classList.add('is-visible');
          }
        }
      });

      return () => observer.disconnect();
    }
  }, [view]);

  // Page switcher navigation handler (Supports jumping into specific sub-tab)
  const handleNavigate = (targetView, initialTab = 'received') => {
    setView(targetView);
    if (targetView === 'mypage') {
      setMyPageActiveTab(initialTab);
    }
    // Instant scroll reset on page change
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  // Cart operations
  const handleAddToCart = (product) => {
    setCartItems(prevItems => {
      const existing = prevItems.find(item => item.id === product.id);
      if (existing) {
        return prevItems.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });

    // Provide a premium micro-feedback alert
    const toast = document.createElement('div');
    toast.className = 'cart-toast animate-toast';
    toast.innerText = `[${product.name}] 상품이 장바구니에 담겼습니다.`;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.remove();
    }, 2500);
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Checkout 성공 시 장바구니 품목 중 선택 결제 완료된 품목만 주조 대기 큐로 전송하고 카트에서 선별 삭제
  const handleCheckoutSuccess = (checkoutItems) => {
    const listToCast = [];
    const checkoutIds = checkoutItems.map(item => item.id);

    checkoutItems.forEach(item => {
      for (let i = 0; i < item.quantity; i++) {
        listToCast.push({
          pendingId: `p_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
          id: item.id,
          name: item.name,
          price: item.price
        });
      }
    });

    setPendingCastItems(prev => [...prev, ...listToCast]);
    
    // 장바구니에서 결제 성공된 품목들만 제외하고 필터링해 남겨둠
    setCartItems(prev => prev.filter(item => !checkoutIds.includes(item.id)));
  };

  // 마이페이지에서 비밀 편지 봉인 및 주조가 완료된 대기 품목 삭제
  const handleCastCandle = (pendingId) => {
    setPendingCastItems(prev => prev.filter(item => item.pendingId !== pendingId));
  };

  // Calculate total count of items in the cart
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="app-container">
      <CustomCursor />
      
      {/* Soft Animated Background Ambient Glow Orbs */}
      <div className="ambient-glow-container">
        <div className="glow-orb orb-1" />
        <div className="glow-orb orb-2" />
        <div className="glow-orb orb-3" />
      </div>
      
      <Header 
        view={view} 
        onNavigate={handleNavigate} 
        cartCount={cartCount} 
      />

      {view === 'home' && (
        <>
          <Hero onNavigate={handleNavigate} />
          <CoreFeature />
          <ScentNotes />
          <Quality />
          <UseCase />
          <EditorialGrid />
          <FinalCTA onNavigate={handleNavigate} />
        </>
      )}

      {view === 'shop' && (
        <Shop onAddToCart={handleAddToCart} />
      )}

      {view === 'scent' && (
        <ScentArchive />
      )}

      {view === 'story' && (
        <OurStory />
      )}

      {view === 'mypage' && (
        <MyPage 
          pendingCastItems={pendingCastItems} 
          onCastCandle={handleCastCandle}
          activeTab={myPageActiveTab}
          setActiveTab={setMyPageActiveTab}
          onNavigate={handleNavigate}
        />
      )}

      {view === 'cart' && (
        <Cart 
          cartItems={cartItems} 
          onUpdateQuantity={handleUpdateQuantity} 
          onRemoveItem={handleRemoveItem} 
          onClearCart={handleClearCart}
          onNavigate={handleNavigate}
          onCheckoutSuccess={handleCheckoutSuccess}
        />
      )}
      
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default App;
