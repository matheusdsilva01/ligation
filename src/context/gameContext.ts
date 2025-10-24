import { createContext, type ActionDispatch } from "react";
import type { Action, State } from "../hooks/useGameReducer";

export const GameContext = createContext<State>({} as State);

export const GameDispatchContext = createContext<ActionDispatch<[action: Action]>>({} as ActionDispatch<[action: Action]>);
