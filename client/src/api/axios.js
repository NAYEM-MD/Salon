import axios from 'axios';

// Dev: CRA proxy → /api. Production: set REACT_APP_API_URL in Vercel (e.g. https://your-api.com/api)
const raw = process.env.REACT_APP_API_URL;
const baseURL = (typeof raw === 'string' && raw.trim() ? raw.trim().replace(/\/$/, '') : '') || '/api';

const api = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
});

export default api;
