import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import Scoreboard from "./components/Scoreboard";
import LiveEvents from "./components/LiveEvents";
import StatsPanel from "./components/StatsPanel";
import TeamLineup from "./components/TeamLineup";
import { getMatchById } from "./services/liveScoreApi";

const queryClient = new QueryClient();
const matchId = import.meta.env.VITE_MATCH_ID;

function MatchLogos() {
  const { data: match } = useQuery({
    queryKey: ["match", matchId],
    queryFn: () => getMatchById(matchId),
    refetchInterval: 5000,
  });

  if (!match) return null;

  return (
    <div className="flex items-center justify-between  rounded-md p-3 ">
      <img
        src={match.home.logo}
        alt={match.home_name}
        className="h-24 w-auto"
      />
      <div className="text-center text-white font-bold">vs</div>
      <img
        src={match.away.logo}
        alt={match.away_name}
        className="h-24 w-auto"
      />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="min-h-screen bg-black p-4 text-gray-900">
        <div className="max-w-4xl mx-auto grid gap-6">
          {/* Logo de Canal1Peru */}
          <div className="w-full flex justify-end">
            <img
              src="https://scontent.flim38-1.fna.fbcdn.net/v/t39.30808-6/270068489_7334957499855041_6598687454629360923_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=zyxWXhB1F4IQ7kNvwGH6BTG&_nc_oc=Adkn9axyawE2PfCj_CEHyMf2XZMJTAstrD8PArU_syHCu1_YzTLDaggtYvLd7q8uibw&_nc_zt=23&_nc_ht=scontent.flim38-1.fna&_nc_gid=_-_aS4hg9edb8fTnS-F-dA&oh=00_AfHGOhm0onLq5u5QYzt6po4r9upzj7ZdeiwposEVA1ZN4w&oe=67FE1E72"
              alt="Canal1Peru"
              className="w-24 h-auto opacity-90"
            />
          </div>

          {/* Logos de los equipos */}
          <MatchLogos />

          <Scoreboard />
          <LiveEvents />
          <StatsPanel />
          <TeamLineup />
        </div>
      </main>
    </QueryClientProvider>
  );
}

export default App;
