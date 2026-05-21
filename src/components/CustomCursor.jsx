import React, { useEffect, useRef } from 'react';

const CustomCursor = () => {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Track mouse coordinates directly on DOM without triggering React re-renders
    const onMouseMove = (e) => {
      cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
    };

    const handleMouseOver = (e) => {
      if (
        e.target.closest('button') || 
        e.target.closest('a') || 
        e.target.closest('.pyramid-item') || 
        e.target.closest('.product-card') ||
        e.target.closest('.editorial-card')
      ) {
        cursor.classList.add('hover');
      } else {
        cursor.classList.remove('hover');
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <div 
      ref={cursorRef}
      className="custom-cursor"
    />
  );
};

export default CustomCursor;
