export default function Cup({ pct = 0 }) {
  const clamped = Math.min(100, Math.max(0, pct));
  const fillY = 160 - (clamped / 100) * 148;

  return (
    <div className='flex flex-col items-center gap-2'>
      <svg width='120' height='170' viewBox='0 0 120 170' fill='none'>
        <defs>
          <clipPath id='cup'>
            <path d='M15 10 L8 158 Q8 162 12 162 L108 162 Q112 162 112 158 L105 10 Z' />
          </clipPath>
        </defs>

        <rect
          x='0'
          y={fillY}
          width='120'
          height='160'
          fill='#38bdf8'
          opacity='0.8'
          clipPath='url(#cup)'
          style={{ transition: "y 0.5s cubic-bezier(0.34,1.56,0.64,1)" }}
        />

        <path
          d='M15 10 L8 158 Q8 162 12 162 L108 162 Q112 162 112 158 L105 10 Z'
          stroke='#cbd5e1'
          strokeWidth='2.5'
          fill='none'
        />
      </svg>

      <span className='font-mono text-sm text-slate-400'>{clamped}%</span>
    </div>
  );
}
