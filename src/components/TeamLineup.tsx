import { useQuery } from "@tanstack/react-query";
import { getMatchLineups } from "../services/liveScoreApi";

const matchId = import.meta.env.VITE_MATCH_ID;

const PlayerList = ({ title, players }: { title: string; players: any[] }) => (
  <div>
    <h3 className="font-semibold text-center text-gray-600 mb-2">{title}</h3>
    <ul className="space-y-1 text-sm text-gray-800">
      {players.map((player) => (
        <li
          key={player.id}
          className="border-b pb-1 last:border-none flex justify-between"
        >
          <span>{player.name}</span>
          <span className="text-gray-500">#{player.shirt_number}</span>
        </li>
      ))}
    </ul>
  </div>
);

const TeamLineup = () => {
  const { data: lineupData, isLoading } = useQuery({
    queryKey: ["lineups", matchId],
    queryFn: () => getMatchLineups(matchId),
  });

  if (isLoading || !lineupData) return null;

  const homeTeam = lineupData.home;
  const awayTeam = lineupData.away;

  const filterStarters = (players: any[]) =>
    players.filter((p) => p.substitution === "0");
  const filterSubs = (players: any[]) =>
    players.filter((p) => p.substitution === "1");

  return (
    <section className="bg-white rounded-md shadow border border-gray-300 p-4">
      <h2 className="text-lg font-bold mb-3 border-b pb-2 text-gray-800">
        Alineaciones
      </h2>
      <div className="grid grid-cols-2 gap-6">
        <PlayerList
          title={`${homeTeam.team.name} (Titulares)`}
          players={filterStarters(homeTeam.players)}
        />
        <PlayerList
          title={`${awayTeam.team.name} (Titulares)`}
          players={filterStarters(awayTeam.players)}
        />
        <PlayerList
          title={`${homeTeam.team.name} (Suplentes)`}
          players={filterSubs(homeTeam.players)}
        />
        <PlayerList
          title={`${awayTeam.team.name} (Suplentes)`}
          players={filterSubs(awayTeam.players)}
        />
      </div>
    </section>
  );
};

export default TeamLineup;
