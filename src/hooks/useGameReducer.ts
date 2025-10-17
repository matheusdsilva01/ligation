import { useReducer } from "react"

export type Player = "p1" | "p2"

export type Cell = {
  value: number
  player: Player | null
}

export type State = {
    matrix: Cell[][]
    hasWin: boolean
    player: Player
}

export type Action = 
    { type: 'PLAY', col: number }
    | { type: 'RESET' }

const empty: Cell = {
    value: 0,
    player: null
}

const initialState: State = {
    matrix: [
        [empty, empty, empty, empty, empty],
        [empty, empty, empty, empty, empty],
        [empty, empty, empty, empty, empty],
        [empty, empty, empty, empty, empty],
        [empty, empty, empty, empty, empty]
    ],
    hasWin: false,
    player: "p1"
}

function switchPlayer(player: Player): Player {
    return player === "p1" ? "p2" : "p1"
}

function checkWinner(state: Omit<State, 'hasWin'>, r: number, c: number): boolean {
    const { matrix, player } = state
    const E = {
        row: r,
        col: c
    }

    function assertCombinationLine(el: Cell) {
        return !!el && el.value === 1 && el.player === player
    }

    const elementsRight = matrix[E.row].slice(E.col, E.col + 3)

    const elementsLeft = matrix[E.row].slice(E.col - 2 < 0 ? 0 : E.col - 2, E.col + 1)

    const elementsUp = []
    for (let i = E.row; i > E.row - 3; i--) {
        const row = matrix[i]
        if (row) {
            elementsUp.push(row[E.col])
        }
    }

    const elementsDown = []
    for (let i = E.row; i < E.row + 3; i++) {
        const row = matrix[i]
        if (row) {
            elementsDown.push(row[E.col])
        }
    }

    const diagonalUpRight = [matrix[E.row][E.col]]
    const rowsUpRight = [E.row - 1, E.row - 2]
    rowsUpRight.forEach((el, i) => {
        if (el < 0) {
            return
        }

        const curr = matrix[el][E.col + i + 1]
        if (curr) {
            diagonalUpRight.push(curr) 
        }
    })

    const diagonalUpLeft = [matrix[E.row][E.col]]
    const rowsUpLeft = [E.row - 1, E.row - 2]
    rowsUpLeft.forEach((el, i) => {
        if (el < 0) {
            return
        }

        const curr = matrix[el][E.col - (i + 1)]
        if (curr) {
            diagonalUpLeft.push(curr) 
        }
    })

    const diagonalDownRight = [matrix[E.row][E.col]]
    const rowsDownRight = [E.row + 1, E.row + 2]
    rowsDownRight.forEach((el, i) => {
        if (el >= matrix.length) {
            return
        }
        const curr = matrix[el][E.col + (i + 1)]
        if (curr) {
            diagonalDownRight.push(curr) 
        }
    })

    const diagonalDownLeft = [matrix[E.row][E.col]]
    const rowsDownLeft = [E.row + 1, E.row + 2]
    rowsDownLeft.forEach((el, i) => {
        if (el >= matrix.length) {
            return
        }
        const curr = matrix[el][E.col - (i + 1)]
        if (curr) {
            diagonalDownLeft.push(curr) 
        }
    })
    const middleX = [matrix[E.row][E.col - 1], matrix[E.row][E.col], matrix[E.row][E.col + 1]]
    const middleDiagonalLeft = [matrix[E.row - 1]?.[E.col - 1], matrix[E.row][E.col], matrix[E.row + 1]?.[E.col + 1]]
    const middleDiagonalRight = [matrix[E.row - 1]?.[E.col + 1], matrix[E.row][E.col], matrix[E.row + 1]?.[E.col - 1]]

    const possibilities = [middleX, middleDiagonalLeft, middleDiagonalRight, elementsRight, diagonalDownRight, elementsDown, diagonalDownLeft, elementsLeft, diagonalUpLeft, elementsUp, diagonalUpRight]

    const assert = possibilities.find(el => {
        if (el.length < 3) {
            return false
        }
        const assert = el.every(assertCombinationLine)

        return assert
    })

    return !!assert
}

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

                const hasWinner = checkWinner({ matrix: updatedMatrix, player: player }, lastEmptyRowIndex, action.col)
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
