import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MatchProvider } from "./context/MatchContext";
import Scoreboard from "./components/Scoreboard";
import LiveEvents from "./components/LiveEvents";
import StatsPanel from "./components/StatsPanel";
import TeamLineup from "./components/TeamLineup";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="min-h-screen bg-gray-100 p-4 text-gray-900">
        <div className="max-w-4xl mx-auto grid gap-6">
          {/* Logo de Canal1Peru */}
          {/* <div className="w-full flex justify-end">
              <img
                src="/canal1-logo.svg"
                alt="Canal1Peru"
                className="w-24 h-auto opacity-90"
              />
            </div> */}

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
