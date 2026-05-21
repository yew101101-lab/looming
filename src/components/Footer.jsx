import React from 'react';
import './Footer.css';

const Footer = ({ onNavigate, isDark }) => {
  const handleLinkClick = (e, targetView) => {
    e.preventDefault();
    onNavigate(targetView);
  };

  return (
    <footer className={`site-footer ${isDark ? 'dark-mode' : ''}`}>
      <div className="footer-container">
        
        {/* Top Section: Brand slogan & Quick Links */}
        <div className="footer-top">
          <div className="footer-brand-section">
            <h2 className="footer-logo" onClick={(e) => handleLinkClick(e, 'home')}>LOOMING</h2>
            <p className="footer-slogan">시간과 마음을 밝히는 은은한 진심</p>
          </div>
          
          <div className="footer-links-section">
            <div className="footer-link-group">
              <h4 className="footer-group-title">NAVIGATION</h4>
              <a href="#shop" className="footer-link" onClick={(e) => handleLinkClick(e, 'shop')}>SHOP</a>
              <a href="#scent" className="footer-link" onClick={(e) => handleLinkClick(e, 'scent')}>SCENT ARCHIVE</a>
              <a href="#story" className="footer-link" onClick={(e) => handleLinkClick(e, 'story')}>OUR STORY</a>
            </div>
            
            <div className="footer-link-group">
              <h4 className="footer-group-title">ACCOUNT</h4>
              <a href="#mypage" className="footer-link" onClick={(e) => handleLinkClick(e, 'mypage')}>MY PAGE</a>
              <a href="#cart" className="footer-link" onClick={(e) => handleLinkClick(e, 'cart')}>CART</a>
            </div>

            <div className="footer-link-group">
              <h4 className="footer-group-title">CONTACT</h4>
              <span className="footer-info-text">T. 1644-0000</span>
              <span className="footer-info-text">E. support@looming.co.kr</span>
              <span className="footer-info-text">Kakao. @looming_candle</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="footer-divider"></div>

        {/* Bottom Section: Company registration & Copyright */}
        <div className="footer-bottom">
          <div className="footer-company-info">
            <p className="company-info-text">
              주식회사 루밍 | 대표이사 : 홍길동 | 사업자등록번호 : 123-45-67890 | 통신판매업신고 : 제2026-서울강남-1234호
            </p>
            <p className="company-info-text">
              주소 : 서울특별시 강남구 테헤란로 123, 에코타워 15층 | 개인정보보호책임자 : 홍길동 (privacy@looming.co.kr)
            </p>
          </div>
          
          <div className="footer-copyright-section">
            <p className="footer-copyright">© 2026 LOOMING. All rights reserved.</p>
            <div className="footer-sns-links">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer-sns-link">INSTAGRAM</a>
              <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="footer-sns-link">PINTEREST</a>
            </div>
          </div>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;
