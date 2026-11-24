import { useRef, useState, type MouseEvent, type ReactNode } from 'react';
import { computeTilt3D, type Tilt3DState } from '../utils/portfolio';

interface Tilt3DCardProps {
  children: ReactNode;
  className?: string;
  maxTiltDeg?: number;
  elevateOnHover?: boolean;
}

const REST_TILT: Tilt3DState = {
  rotateX: 0,
  rotateY: 0,
  glowX: 50,
  glowY: 50,
};

export function Tilt3DCard({
  children,
  className = '',
  maxTiltDeg = 6,
  elevateOnHover = true,
}: Tilt3DCardProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [tilt, setTilt] = useState<Tilt3DState>(REST_TILT);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!el) return;
    if (
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }
    const rect = el.getBoundingClientRect();
    setTilt(computeTilt3D(event.clientX, event.clientY, rect, maxTiltDeg));
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt(REST_TILT);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`tilt-3d-stage relative ${className}`}
      style={{ perspective: '1150px' }}
    >
      <div
        className="tilt-3d-body relative w-full h-full rounded-2xl"
        style={{
          transformStyle: 'preserve-3d',
          transform: isHovered
            ? `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) ${
                elevateOnHover ? 'translate3d(0, -4px, 8px)' : ''
              }`
            : 'rotateX(0deg) rotateY(0deg) translate3d(0, 0, 0)',
          transition: isHovered
            ? 'transform 130ms cubic-bezier(0.22, 1, 0.36, 1)'
            : 'transform 450ms cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        {/* Interactive Powder Blue + Warm Sunset Peach specular glare layer */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300 z-20"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(420px circle at ${tilt.glowX}% ${tilt.glowY}%, rgba(141, 185, 240, 0.2), rgba(245, 182, 158, 0.1) 42%, transparent 72%)`,
          }}
        />
        {children}
      </div>
    </div>
  );
}
