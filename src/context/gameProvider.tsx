import { type ReactNode } from "react";
import { useGameReducer } from "../hooks/useGameReducer";
import { GameContext, GameDispatchContext } from "./gameContext";

type GameProviderProps = { children: ReactNode }

export function GameProvider({ children }: GameProviderProps) {
  const [state, dispatch] = useGameReducer()

  return (
    <GameContext.Provider value={state}>
      <GameDispatchContext.Provider value={dispatch}>
        {children}
      </GameDispatchContext.Provider>
    </GameContext.Provider>
  )
}