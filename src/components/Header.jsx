import React, { useState, useEffect, useRef } from 'react';
import './Header.css';

const Header = ({ view, onNavigate, cartCount }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef(null);
  const fadeIntervalRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2432/2432-84.wav');
    audioRef.current.loop = true;
    audioRef.current.volume = 0;
    return () => {
      if (audioRef.current) audioRef.current.pause();
      if (fadeIntervalRef.current) cancelAnimationFrame(fadeIntervalRef.current);
    };
  }, []);

  const fadeAudio = (targetVol, onComplete) => {
    if (!audioRef.current) return;
    if (fadeIntervalRef.current) cancelAnimationFrame(fadeIntervalRef.current);
    const startVol = audioRef.current.volume;
    const startTime = performance.now();
    const duration = 800;
    const step = (now) => {
      const t = Math.min((now - startTime) / duration, 1);
      const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      audioRef.current.volume = Math.max(0, Math.min(0.12, startVol + (targetVol - startVol) * eased));
      if (t < 1) {
        fadeIntervalRef.current = requestAnimationFrame(step);
      } else if (onComplete) {
        onComplete();
      }
    };
    fadeIntervalRef.current = requestAnimationFrame(step);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    if (isMuted) {
      audioRef.current.play().catch(e => console.warn('Audio blocked:', e));
      fadeAudio(0.12);
    } else {
      fadeAudio(0, () => audioRef.current.pause());
    }
    setIsMuted(!isMuted);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Prevent scrolling when mobile menu is open
    if (!isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  };

  const handleLinkClick = (e, targetView) => {
    e.preventDefault();
    onNavigate(targetView);
    if (isMenuOpen) {
      toggleMenu();
    }
  };

  const showDarkHeader = isScrolled || view !== 'home';

  return (
    <>
      {/* Fixed Logo (Top Left) */}
      <div className={`fixed-logo-wrap ${showDarkHeader ? 'scrolled' : ''} ${isMenuOpen ? 'menu-open' : ''}`}>
        <a href="/" className="header-logo" onClick={(e) => handleLinkClick(e, 'home')}>
          LOOMING
        </a>

        {/* Ambient Soundscape Toggle */}
        <button 
          className={`soundscape-toggle-btn ${!isMuted ? 'playing' : ''}`}
          onClick={toggleMute}
          title="자작나무 타는 소리 백색소음 (ASMR) 토글"
        >
          <div className="sound-wave-bars">
            <span className="wave-bar bar-1"></span>
            <span className="wave-bar bar-2"></span>
            <span className="wave-bar bar-3"></span>
          </div>
          <span className="sound-label">{isMuted ? 'SOUND OFF' : 'SOUND ON'}</span>
        </button>
      </div>

      {/* Floating Vertical Sidebar Navigation (Right) */}
      <header className={`site-header-vertical ${showDarkHeader ? 'scrolled' : ''} ${isMenuOpen ? 'menu-open' : ''}`}>
        <div className="vertical-header-container">
          
          {/* Vertical Navigation Links */}
          <nav className="nav-vertical-links">
            <a href="#shop" className={`nav-link ${view === 'shop' ? 'active' : ''}`} onClick={(e) => handleLinkClick(e, 'shop')}>SHOP</a>
            <a href="#scent" className={`nav-link ${view === 'scent' ? 'active' : ''}`} onClick={(e) => handleLinkClick(e, 'scent')}>SCENT ARCHIVE</a>
            <a href="#story" className={`nav-link ${view === 'story' ? 'active' : ''}`} onClick={(e) => handleLinkClick(e, 'story')}>OUR STORY</a>
            <a href="#mypage" className={`nav-link ${view === 'mypage' ? 'active' : ''}`} onClick={(e) => handleLinkClick(e, 'mypage')}>MY PAGE</a>
            <a href="#cart" className={`nav-link cart-link ${view === 'cart' ? 'active' : ''}`} onClick={(e) => handleLinkClick(e, 'cart')}>
              CART <span className="cart-count">{cartCount}</span>
            </a>
          </nav>

          {/* Mobile Hamburger Button */}
          <button 
            className={`mobile-menu-btn ${isMenuOpen ? 'open' : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>

        </div>
      </header>

      {/* Fullscreen Mobile Drawer Menu */}
      <div className={`mobile-nav-drawer ${isMenuOpen ? 'active' : ''}`}>
        <div className="mobile-drawer-container">
          <nav className="mobile-nav-links">
            <a href="#shop" className={`mobile-nav-link ${view === 'shop' ? 'active' : ''}`} onClick={(e) => handleLinkClick(e, 'shop')}>SHOP</a>
            <a href="#scent" className={`mobile-nav-link ${view === 'scent' ? 'active' : ''}`} onClick={(e) => handleLinkClick(e, 'scent')}>SCENT ARCHIVE</a>
            <a href="#story" className={`mobile-nav-link ${view === 'story' ? 'active' : ''}`} onClick={(e) => handleLinkClick(e, 'story')}>OUR STORY</a>
            <a href="#mypage" className={`mobile-nav-link ${view === 'mypage' ? 'active' : ''}`} onClick={(e) => handleLinkClick(e, 'mypage')}>MY PAGE</a>
            <a href="#cart" className={`mobile-nav-link ${view === 'cart' ? 'active' : ''}`} onClick={(e) => handleLinkClick(e, 'cart')}>CART ({cartCount})</a>
          </nav>
          <div className="mobile-drawer-footer">
            <p className="drawer-brand-desc">시간과 마음을 밝히는 은은한 진심</p>
            <p className="drawer-copyright">© LOOMING</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
