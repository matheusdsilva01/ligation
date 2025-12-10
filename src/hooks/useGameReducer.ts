import { useReducer } from "react"
import { checkWinner, initialState, switchPlayer, type Action, type State } from "../lib/game-logic";

export function useGameReducer() {
    function reducer(state: State, action: Action): State {
        switch (action.type) {
            case "RESET":
                return initialState;
            case "PLAY": {
                const { matrix, player } = state

                let lastEmptyRowIndex = -1
                for (let rowIndex = matrix.length - 1; rowIndex >= 0; rowIndex--) {
                    if (matrix[rowIndex][action.col].value === 0) {
                        lastEmptyRowIndex = rowIndex
                        break
                    }
                }
                if (lastEmptyRowIndex === -1) return state
                const updatedMatrix = JSON.parse(JSON.stringify(matrix))

                updatedMatrix[lastEmptyRowIndex][action.col] = {
                    value: 1,
                    player: player
                }

                const hasWinner = checkWinner({ matrix: updatedMatrix, player: player })

                return {
                    matrix: updatedMatrix,
                    hasWin: hasWinner,
                    player: hasWinner ? player : switchPlayer(player)
                }
            }
        }
    }
    return useReducer(reducer, initialState)
}
