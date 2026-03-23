export default function History({ data = [], goal = 8 }) {
  if (!data.length)
    return (
      <p className='text-slate-400 text-sm text-center italic mt-4'>
        no history yet
      </p>
    );

  return (
    <div className='flex flex-col gap-2 w-full'>
      {data.map((day) => {
        const pct = Math.min(100, Math.round((day.glasses / goal) * 100));
        return (
          <div
            key={day.date}
            className='bg-white rounded-xl p-3 border border-slate-100'
          >
            <div className='flex justify-between items-center mb-1'>
              <span className='font-mono text-xs text-slate-400'>
                {day.date}
              </span>
              <span className='text-sm font-semibold text-sky-600'>
                {day.glasses} glasses
              </span>
            </div>
            <div className='h-1.5 bg-slate-100 rounded-full'>
              <div
                className='h-1.5 bg-sky-400 rounded-full transition-all'
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
