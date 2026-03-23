import axios from "axios";

const BASE = import.meta.env.VITE_API_URL || "http://localhost:3001";

const getDate = () => {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

export const getTodayLogs = () =>
  axios.get(`${BASE}/api/logs`, { params: { date: getDate() } });

export const logGlass = () =>
  axios.post(`${BASE}/api/logs`, { date: getDate() });

export const deleteLog = (id) => axios.delete(`${BASE}/api/logs/${id}`);

export const getHistory = () => axios.get(`${BASE}/api/logs/history`);
