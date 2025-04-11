import { useQuery } from "@tanstack/react-query";
import { getMatchEvents, getMatchById } from "../services/liveScoreApi";

const matchId = import.meta.env.VITE_MATCH_ID;

const eventIcons: Record<string, string> = {
  GOAL: "⚽️",
  GOAL_PENALTY: "⚽️ (P)",
  OWN_GOAL: "🙈",
  YELLOW_CARD: "🟨",
  RED_CARD: "🟥",
  YELLOW_RED_CARD: "🟨🟥",
  SUBSTITUTION: "🔁",
  MISSED_PENALTY: "❌",
};

const LiveEvents = () => {
  const { data: events = [] } = useQuery({
    queryKey: ["events", matchId],
    queryFn: () => getMatchEvents(matchId),
    refetchInterval: 5000,
  });

  const { data: match } = useQuery({
    queryKey: ["match", matchId],
    queryFn: () => getMatchById(matchId),
    refetchInterval: 5000,
  });

  if (!match) return null;

  return (
    <section className="bg-white rounded-md shadow border border-gray-300 p-4">
      <h2 className="text-lg font-bold mb-3 border-b pb-2 text-gray-800">
        Eventos en vivo
      </h2>
      <ul className="space-y-2 max-h-64 overflow-y-auto pr-2">
        {events.length === 0 && (
          <li className="text-gray-500 text-sm">Aún no hay eventos.</li>
        )}
        {events.map((event: any) => (
          <li
            key={event.id}
            className="text-sm text-gray-800 border-l-4 border-blue-500 pl-2"
          >
            <span className="font-mono text-xs text-gray-500 mr-2">
              {event.time}'
            </span>
            <span className="mr-1">{eventIcons[event.event] ?? "📌"}</span>
            <strong>{event.player}</strong> – {event.event.replaceAll("_", " ")}{" "}
            ({event.home_away === "h" ? match.home_name : match.away_name})
          </li>
        ))}
      </ul>
    </section>
  );
};

export default LiveEvents;
