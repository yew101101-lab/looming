import React, { useState } from 'react';
import './Shop.css';

const PRODUCTS = [
  {
    id: 'c1',
    name: 'Dewy Rose & Cassis',
    category: 'floral',
    price: 39000,
    desc: '이슬 머금은 묵직한 생장미와 블랙커런트의 상큼함이 자아내는 고혹적인 정원의 기억',
    img: '/candle_1.png',
    notes: 'Top: Cassis, Green Leaf | Middle: Rose, Geranium | Base: Musk, Amber'
  },
  {
    id: 'c2',
    name: 'Dawn Pine & Sandalwood',
    category: 'woody',
    price: 42000,
    desc: '안개 낀 새벽 숲의 푸릇한 소나무 잎새와 깊고 아스라한 샌달우드가 남기는 은은한 흙내음',
    img: '/candle_2.png',
    notes: 'Top: Pine Needle, Eucalyptus | Middle: Cypress, Cedarwood | Base: Sandalwood, Patchouli'
  },
  {
    id: 'c3',
    name: 'Windy Cliff & Sage',
    category: 'fresh',
    price: 39000,
    desc: '바람 부는 바다 절벽 끝자락의 싱그러운 세이지와 차분한 바다 머스크 향의 고귀한 조화',
    img: '/candle_3.png',
    notes: 'Top: Sea Salt, Sage | Middle: Ambrette, Seaweed | Base: Musk, Cedarwood'
  }
];

const Shop = ({ onAddToCart }) => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredProducts = activeFilter === 'all' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeFilter);

  return (
    <div className="shop-page animate-fade-in">
      <div className="shop-header">
        <h1 className="shop-title">CANDLE COLLECTION</h1>
        <p className="shop-subtitle">자연의 숨결과 기품을 담은 세 가지 오리지널 향초</p>
        
        {/* Category Filter */}
        <div className="shop-filters">
          {['all', 'floral', 'woody', 'fresh'].map(filter => (
            <button
              key={filter}
              className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="product-grid">
        {filteredProducts.map(product => (
          <div key={product.id} className="product-card">
            <div className="product-image-wrapper">
              <img src={product.img} alt={product.name} className="product-image" />
              <div className="product-overlay">
                <div className="product-notes">
                  {product.notes.split(' | ').map((note, i) => {
                    const [label, ingredients] = note.split(': ');
                    return (
                      <div key={i} className="note-line">
                        <span className="note-label">{label}:</span> {ingredients}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="product-info">
              <span className="product-tag">{product.category.toUpperCase()}</span>
              <h3 className="product-name">{product.name}</h3>
              <p className="product-desc">{product.desc}</p>
              <div className="product-footer">
                <span className="product-price">₩{product.price.toLocaleString()}</span>
                <button 
                  className="add-to-cart-btn"
                  onClick={() => onAddToCart(product)}
                >
                  ADD TO CART
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
