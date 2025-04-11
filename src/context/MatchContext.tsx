import React, { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { getLiveMatches } from "../services/liveScoreApi";

const MatchContext = createContext<any>(null);

export const MatchProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const matchId = import.meta.env.VITE_MATCH_ID;
  const { data } = useQuery({
    queryKey: ["liveMatch"],
    queryFn: getLiveMatches,
    refetchInterval: 60000,
  });

  const match = data?.find((m) => String(m.id) === matchId);

  return (
    <MatchContext.Provider value={match}>{children}</MatchContext.Provider>
  );
};

export const useMatch = () => {
  const context = useContext(MatchContext);
  if (!context) throw new Error("useMatch must be used within a MatchProvider");
  return context;
};
