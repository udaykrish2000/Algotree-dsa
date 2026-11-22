import React, { useMemo } from 'react';

export default function SnowEffect() {
  const snowflakes = useMemo(() => {
    return Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      animationDuration: `${5 + Math.random() * 8}s`,
      animationDelay: `${Math.random() * 5}s`,
      fontSize: `${0.8 + Math.random() * 1.2}rem`,
      opacity: 0.3 + Math.random() * 0.7
    }));
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
      {snowflakes.map((sf) => (
        <div
          key={sf.id}
          className="snowflake"
          style={{
            left: sf.left,
            animationDuration: sf.animationDuration,
            animationDelay: sf.animationDelay,
            fontSize: sf.fontSize,
            opacity: sf.opacity
          }}
        >
          ❄
        </div>
      ))}
    </div>
  );
}
