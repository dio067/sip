import { useState, useEffect } from "react";
import Cup from "./components/Cup";
import TapButton from "./components/TapButton";
import History from "./components/History";
import { getTodayLogs, logGlass, deleteLog, getHistory } from "./api";

export default function App() {
  const [logs, setLogs] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [goal] = useState(8);
  const [tab, setTab] = useState("today");

  const pct =
    goal > 0 ? Math.min(100, Math.round((logs.length / goal) * 100)) : 0;

  async function fetchToday() {
    const res = await getTodayLogs();
    setLogs(res.data);
  }

  async function fetchHistory() {
    const res = await getHistory();
    setHistory(res.data);
  }

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        await Promise.all([fetchToday(), fetchHistory()]);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();

    return () => {
      mounted = false;
    };
  }, []);

  async function handleLog() {
    await logGlass();
    await fetchToday();
  }

  async function handleDelete(id) {
    await deleteLog(id);
    await fetchToday();
  }

  if (loading)
    return (
      <div className='min-h-screen flex items-center justify-center text-sky-400 text-2xl'>
        {`:)`}
      </div>
    );

  return (
    <div className='min-h-screen bg-slate-50 font-sans'>
      {/* nav */}
      <nav className='bg-white border-b border-slate-100 px-4 h-14 flex items-center justify-between'>
        <span className='font-extrabold text-sky-500 text-xl'>sip.</span>
        <div className='flex gap-4'>
          <button
            onClick={() => setTab("today")}
            className={`font-mono text-xs pb-0.5 border-b-2 transition-colors ${tab === "today" ? "border-sky-400 text-sky-500" : "border-transparent text-slate-400"}`}
          >
            today
          </button>
          <button
            onClick={() => setTab("history")}
            className={`font-mono text-xs pb-0.5 border-b-2 transition-colors ${tab === "history" ? "border-sky-400 text-sky-500" : "border-transparent text-slate-400"}`}
          >
            history
          </button>
        </div>
      </nav>

      <main className='max-w-sm mx-auto px-4 py-10 flex flex-col items-center gap-8'>
        {tab === "today" && (
          <>
            <Cup pct={pct} />

            <div className='text-center'>
              <span className='text-4xl font-extrabold text-sky-500'>
                {logs.length}
              </span>
              <span className='text-slate-400 font-light'>
                {" "}
                / {goal} glasses
              </span>
            </div>

            <TapButton onClick={handleLog} />

            {logs.length > 0 && (
              <div className='w-full flex flex-col gap-2'>
                {logs.map((log) => (
                  <div
                    key={log.id}
                    className='flex justify-between items-center bg-white rounded-xl px-4 py-2 border border-slate-100'
                  >
                    <span className='font-mono text-xs text-slate-400'>
                      {new Date(log.logged_at).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                    <button
                      onClick={() => handleDelete(log.id)}
                      className='text-slate-300 hover:text-red-400 transition-colors text-sm'
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {tab === "history" && <History data={history} goal={goal} />}
      </main>
    </div>
  );
}
