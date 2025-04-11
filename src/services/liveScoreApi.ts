const API_KEY = import.meta.env.VITE_LIVE_SCORE_API_KEY;
const API_SECRET = import.meta.env.VITE_LIVE_SCORE_API_SECRET;
const MATCH_ID = import.meta.env.VITE_MATCH_ID;
const BASE_URL = "https://livescore-api.com/api-client";

const withAuth = (url: string) => `${url}&key=${API_KEY}&secret=${API_SECRET}`;

// 🔄 Obtener todos los partidos en vivo
export const getLiveMatches = async () => {
  const res = await fetch(
    withAuth(`${BASE_URL}/matches/live.json?competition_id=329`)
  );
  const data = await res.json();
  return data.data.match || [];
};

// 🆔 Obtener un partido por ID
export const getMatchById = async (matchId: string = MATCH_ID) => {
  const matches = await getLiveMatches();
  return matches.find((m: any) => String(m.id) === String(matchId)) || null;
};

// ⚽ Eventos en vivo del partido
export const getMatchEvents = async (matchId: string = MATCH_ID) => {
  const res = await fetch(
    withAuth(`${BASE_URL}/scores/events.json?id=${matchId}`)
  );
  const data = await res.json();
  return data.data.event || [];
};

// 📊 Estadísticas del partido
export const getMatchStats = async (matchId: string = MATCH_ID) => {
  const res = await fetch(
    withAuth(`${BASE_URL}/matches/stats.json?match_id=${matchId}`)
  );
  const data = await res.json();
  return data.data || {};
};

// 🧑‍🤝‍🧑 Alineaciones del partido
export const getMatchLineups = async (matchId: string = MATCH_ID) => {
  const res = await fetch(
    withAuth(`${BASE_URL}/matches/lineups.json?match_id=${matchId}`)
  );
  const data = await res.json();
  return data.data.lineup;
};
