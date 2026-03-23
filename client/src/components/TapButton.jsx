export default function TapButton({ onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className='
        w-24 h-24 rounded-full
        bg-sky-400 hover:bg-sky-500 active:scale-95
        text-white text-4xl
        shadow-xl shadow-sky-300
        transition-all duration-150
        disabled:opacity-40 disabled:cursor-not-allowed
        select-none'
    >{`:)`}</button>
  );
}
