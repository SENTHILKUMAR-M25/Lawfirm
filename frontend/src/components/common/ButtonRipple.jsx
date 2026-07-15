import { useState } from 'react';

const ButtonRipple = ({ children, className = '', onClick, ...props }) => {
  const [ripples, setRipples] = useState([]);

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples((prev) => [...prev, { id, x, y }]);
    setTimeout(() => setRipples((prev) => prev.filter(r => r.id !== id)), 600);
    onClick?.(e);
  };

  return (
    <button className={`relative overflow-hidden ${className}`} onClick={handleClick} {...props}>
      {children}
      {ripples.map(r => (
        <span
          key={r.id}
          className="absolute rounded-full bg-white/25 animate-ripple"
          style={{ left: r.x - 10, top: r.y - 10, width: 20, height: 20 }}
        />
      ))}
    </button>
  );
};

export default ButtonRipple;
