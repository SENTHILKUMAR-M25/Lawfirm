import { useEffect, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const Cursor = () => {
  const [visible, setVisible] = useState(false);
  const [hoverType, setHoverType] = useState(null);
  const [clicking, setClicking] = useState(false);
  const [isOnInput, setIsOnInput] = useState(false);
  const [cursorPNG, setCursorPNG] = useState('');

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const springX = useSpring(mouseX, { stiffness: 350, damping: 25, mass: 0.3 });
  const springY = useSpring(mouseY, { stiffness: 350, damping: 25, mass: 0.3 });

  const rawScale = useMotionValue(1);
  const springScale = useSpring(rawScale, { stiffness: 400, damping: 20, mass: 0.3 });
  const rawRotate = useMotionValue(25);
  const springRotate = useSpring(rawRotate, { stiffness: 400, damping: 20, mass: 0.3 });
  const rawOpacity = useMotionValue(0);
  const springOpacity = useSpring(rawOpacity, { stiffness: 200, damping: 20 });

  const generateCursorPNG = useCallback(async () => {
    const svgText = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 34.337 34.337">
      <defs>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="1" stdDeviation="1.5" flood-color="#000" flood-opacity="0.4"/>
        </filter>
      </defs>
      <g filter="url(#shadow)">
        <path d="M33.594,16.644l-7.147,7.15c-1.008,1.013-2.668,0.986-3.705-0.05c-0.896-0.896-1.029-2.255-0.4-3.261l-3.149-3.149l-2.556,2.559c0.096,0.812-0.158,1.656-0.781,2.278L4.729,33.294c-0.541,0.541-1.25,0.812-1.959,0.812s-1.418-0.271-1.959-0.812c-1.082-1.082-1.082-2.837,0-3.918l11.123-11.123c0.815-0.815,2.016-1.016,3.02-0.602l2.277-2.277l-3.147-3.148c-1.003,0.633-2.363,0.496-3.261-0.399c-1.037-1.037-1.061-2.695-0.051-3.705l7.148-7.149c1.011-1.01,2.668-0.986,3.706,0.049c0.896,0.896,1.03,2.26,0.399,3.263l8.258,8.259c1.006-0.63,2.363-0.496,3.261,0.4C34.58,13.978,34.604,15.635,33.594,16.644z" fill="#C9A227"/>
      </g>
    </svg>`;
    const blob = new Blob([svgText], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = () => {
      const c = document.createElement('canvas');
      c.width = 32; c.height = 32;
      const ctx = c.getContext('2d');
      ctx.drawImage(img, 0, 0, 32, 32);
      URL.revokeObjectURL(url);
      setCursorPNG(c.toDataURL('image/png'));
    };
    img.src = url;
  }, []);

  useEffect(() => { generateCursorPNG(); }, [generateCursorPNG]);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `* { cursor: none !important; } input, textarea, [contenteditable] { cursor: text !important; }`;
    document.head.appendChild(style);

    const move = (e) => { mouseX.set(e.clientX); mouseY.set(e.clientY); if (!visible) { setVisible(true); rawOpacity.set(1); } };
    const leave = () => { setVisible(false); rawOpacity.set(0); };
    const enter = () => { setVisible(true); rawOpacity.set(1); };
    const down = () => setClicking(true);
    const up = () => setClicking(false);

    document.addEventListener('mousemove', move);
    document.addEventListener('mouseleave', leave);
    document.addEventListener('mouseenter', enter);
    document.addEventListener('mousedown', down);
    document.addEventListener('mouseup', up);

    return () => {
      document.head.removeChild(style);
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseleave', leave);
      document.removeEventListener('mouseenter', enter);
      document.removeEventListener('mousedown', down);
      document.removeEventListener('mouseup', up);
    };
  }, [visible, mouseX, mouseY, rawOpacity]);

  useEffect(() => {
    const addHover = (type) => () => setHoverType(type);
    const removeHover = () => setHoverType(null);
    const addText = () => setIsOnInput(true);
    const removeText = () => setIsOnInput(false);

    const els = document.querySelectorAll('button, a, [data-cursor], .gold-btn, .cta-btn');
    const inputs = document.querySelectorAll('input, textarea, [contenteditable]');

    const hoverMap = {};
    els.forEach(el => {
      let type = el.dataset.cursor || 'button';
      if (el.tagName === 'A') type = 'link';
      if (el.classList.contains('gold-btn') || el.classList.contains('cta-btn')) type = 'cta';
      hoverMap[type] = true;
      el.addEventListener('mouseenter', addHover(type));
      el.addEventListener('mouseleave', removeHover);
    });
    inputs.forEach(el => { el.addEventListener('mouseenter', addText); el.addEventListener('mouseleave', removeText); });

    return () => {
      els.forEach(el => { el.removeEventListener('mouseenter', addHover); el.removeEventListener('mouseleave', removeHover); });
      inputs.forEach(el => { el.removeEventListener('mouseenter', addText); el.removeEventListener('mouseleave', removeText); });
    };
  }, []);

  useEffect(() => {
    if (clicking) {
      rawScale.set(0.85);
      rawRotate.set(18);
      setTimeout(() => { rawScale.set(getScale()); rawRotate.set(getRotate()); }, 150);
    } else {
      rawScale.set(getScale());
      rawRotate.set(getRotate());
    }
  }, [clicking, hoverType]);

  const getScale = () => {
    if (clicking) return 0.85;
    switch (hoverType) {
      case 'cta': return 1.2;
      case 'button': return 1.1;
      case 'link': return 1.1;
      case 'card': return 1.05;
      default: return 1;
    }
  };

  const getRotate = () => {
    if (clicking) return 18;
    switch (hoverType) {
      case 'cta': return 6;
      case 'button': return 7;
      case 'link': return 5;
      case 'card': return 5;
      default: return 25;
    }
  };

  const getGlow = () => {
    if (hoverType === 'cta') return 'drop-shadow(0 0 20px rgba(201,162,39,0.7)) drop-shadow(0 0 40px rgba(201,162,39,0.3))';
    if (hoverType) return 'drop-shadow(0 0 12px rgba(201,162,39,0.4))';
    return 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))';
  };

  if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) return null;
  if (isOnInput) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform"
        style={{
          x: springX,
          y: springY,
          scale: springScale,
          rotate: springRotate,
          opacity: springOpacity,
        }}
      >
        <div
          style={{
            width: 28,
            height: 28,
            backgroundImage: `url(${cursorPNG})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            filter: getGlow(),
            transformOrigin: 'bottom center',
            marginLeft: -14,
            marginTop: -14,
            willChange: 'filter',
            transition: 'filter 0.15s ease-out',
          }}
        />
      </motion.div>

      {hoverType && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9998] will-change-transform"
          style={{
            x: springX,
            y: springY,
            scale: hoverType === 'cta' ? 1.3 : 1.15,
            opacity: hoverType === 'cta' ? 0.5 : 0.3,
          }}
          transition={{ type: 'spring', stiffness: 200, damping: 18, mass: 0.5 }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              marginLeft: -20,
              marginTop: -20,
              borderRadius: '50%',
              border: '1.5px solid #C9A227',
              boxShadow: hoverType === 'cta' ? '0 0 30px rgba(201,162,39,0.4), inset 0 0 30px rgba(201,162,39,0.1)' : 'none',
              transition: 'box-shadow 0.2s ease-out',
            }}
          />
        </motion.div>
      )}

      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9997] will-change-transform"
        style={{ x: springX, y: springY }}
        animate={{
          scale: clicking ? [1, 2.5, 1] : 0,
          opacity: clicking ? [0.5, 0, 0] : 0,
        }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            marginLeft: -24,
            marginTop: -24,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(201,162,39,0.3) 0%, transparent 70%)',
          }}
        />
      </motion.div>
    </>
  );
};

export default Cursor;
