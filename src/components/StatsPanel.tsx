import { useQuery } from "@tanstack/react-query";
import { getMatchStats, getMatchById } from "../services/liveScoreApi";

const matchId = import.meta.env.VITE_MATCH_ID;

const parseStat = (value: string | null): [string, string] =>
  value?.includes(":") ? (value.split(":") as [string, string]) : ["-", "-"];

const StatRow = ({
  label,
  homeValue,
  awayValue,
}: {
  label: string;
  homeValue: string;
  awayValue: string;
}) => (
  <div className="flex justify-between items-center py-1 border-b last:border-none text-sm text-gray-800">
    <span className="w-1/3 text-left">{homeValue}</span>
    <span className="w-1/3 text-center font-semibold text-gray-600">
      {label}
    </span>
    <span className="w-1/3 text-right">{awayValue}</span>
  </div>
);

const StatsPanel = () => {
  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["stats", matchId],
    queryFn: () => getMatchStats(matchId),
    refetchInterval: 5000,
  });

  const { data: match } = useQuery({
    queryKey: ["match", matchId],
    queryFn: () => getMatchById(matchId),
    refetchInterval: 5000,
  });

  if (isLoading || !match) return null;

  return (
    <section className="bg-white rounded-md shadow border border-gray-300 p-4">
      <h2 className="text-lg font-bold mb-3 border-b pb-2 text-gray-800">
        Estadísticas
      </h2>
      <div className="grid grid-cols-1 gap-2">
        <div className="text-xs text-gray-500 font-medium text-center pb-1">
          {match.home_name} vs {match.away_name}
        </div>
        {[
          ["Posesión", stats.possesion],
          ["Tiros al arco", stats.shots_on_target],
          ["Tiros fuera", stats.shots_off_target],
          ["Faltas", stats.fauls],
          ["Corners", stats.corners],
          ["Offsides", stats.offsides],
          ["Atajadas", stats.saves],
          ["Amarillas", stats.yellow_cards],
          ["Rojas", stats.red_cards],
        ].map(([label, value]) => {
          const [home, away] = parseStat(value);
          return (
            <StatRow
              key={label}
              label={label}
              homeValue={home}
              awayValue={away}
            />
          );
        })}
      </div>
    </section>
  );
};

export default StatsPanel;
