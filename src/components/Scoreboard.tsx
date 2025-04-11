import { useQuery } from "@tanstack/react-query";
import { getMatchById } from "../services/liveScoreApi";

const matchId = import.meta.env.VITE_MATCH_ID;

const Scoreboard = () => {
  const { data: match } = useQuery({
    queryKey: ["match", matchId],
    queryFn: () => getMatchById(matchId),
    refetchInterval: 5000,
  });

  if (!match) return null;

  const [homeScore, awayScore] = match.scores.score.split(" - ");

  return (
    <div className="bg-white rounded-md shadow border border-gray-300 p-4 flex justify-between items-center">
      <div className="flex flex-col text-left">
        <span className="text-sm text-gray-500 uppercase">Local</span>
        <span className="text-lg font-semibold">{match.home_name}</span>
        <span className="text-4xl font-bold">{homeScore}</span>
      </div>

      <div className="text-center">
        <span className="text-sm text-gray-500">Minuto</span>
        <div className="text-2xl font-bold text-red-600">{match.time}'</div>
      </div>

      <div className="flex flex-col text-right">
        <span className="text-sm text-gray-500 uppercase">Visita</span>
        <span className="text-lg font-semibold">{match.away_name}</span>
        <span className="text-4xl font-bold">{awayScore}</span>
      </div>
    </div>
  );
};

export default Scoreboard;
