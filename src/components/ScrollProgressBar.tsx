interface ScrollProgressBarProps {
  progress: number;
}

export function ScrollProgressBar({ progress }: ScrollProgressBarProps) {
  const clampedProgress = Math.min(1, Math.max(0, progress));
  const percentage = Math.round(clampedProgress * 100);

  return (
    <div
      role="progressbar"
      aria-label="Page scroll progress"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={percentage}
      data-testid="scroll-progress-bar"
      className="fixed top-0 inset-x-0 z-50 h-[3px] bg-[var(--track-progress)] pointer-events-none"
    >
      <div
        className="h-full w-full origin-left bg-gradient-to-r from-[#8db9f0] via-[#326192] to-[#f5b69e] transition-transform duration-150 ease-out will-change-transform"
        style={{ transform: `scaleX(${clampedProgress})` }}
      />
    </div>
  );
}
