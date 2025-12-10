import { createContext, type ActionDispatch } from "react";
import type { State, Action } from "../lib/game-logic";

export const GameContext = createContext<State>({} as State);

export const GameDispatchContext = createContext<ActionDispatch<[action: Action]>>({} as ActionDispatch<[action: Action]>);
