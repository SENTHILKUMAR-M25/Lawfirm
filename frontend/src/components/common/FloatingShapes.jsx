const FloatingShapes = () => {
  const shapes = [
    { size: 400, top: '5%', right: '-8%', bg: 'bg-gold/[0.03]', delay: '0s' },
    { size: 250, top: '50%', left: '-5%', bg: 'bg-gold/[0.03]', delay: '-3s' },
    { size: 180, bottom: '15%', right: '20%', bg: 'bg-gold/[0.03]', delay: '-6s' },
    { size: 300, top: '20%', left: '30%', bg: 'bg-gold/[0.02]', delay: '-2s' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {shapes.map((s, i) => (
        <div
          key={i}
          className="floating-shape rounded-full"
          style={{
            width: s.size,
            height: s.size,
            top: s.top,
            left: s.left,
            right: s.right,
            bottom: s.bottom,
            background: s.bg,
            animationDelay: s.delay,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingShapes;
