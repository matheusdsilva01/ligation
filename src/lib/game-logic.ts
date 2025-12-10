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
        [empty, empty, empty, empty, empty, empty, empty],
        [empty, empty, empty, empty, empty, empty, empty],
        [empty, empty, empty, empty, empty, empty, empty],
        [empty, empty, empty, empty, empty, empty, empty],
        [empty, empty, empty, empty, empty, empty, empty],
        [empty, empty, empty, empty, empty, empty, empty],
    ],
    hasWin: false,
    player: "p1"
}

function switchPlayer(player: Player): Player {
    return player === "p1" ? "p2" : "p1"
}

function assertCombinationLine(el: Cell, player: Player) {
    return !!el && el.value === 1 && el.player === player
}

function assert(window: Cell[], player: Player) {
    return window.every(el => assertCombinationLine(el, player))
}

function checkWinner(state: Omit<State, 'hasWin'>): boolean {
    const { matrix, player } = state

    for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 6; j++) {
                    const row = j
                    const colStart = i;
                    const colEnd = i + 4;
    
                    const xWindow = matrix[row].slice(colStart, colEnd);
    
                    if (xWindow.length === 4 && assert(xWindow, player)) {
                        return true
                    }
            }
    
            if (i < 3) {
                for (let j = 0; j < 7; j++) {
                    const yWindow = [matrix[i][j], matrix[i + 1][j], matrix[i + 2][j], matrix[i + 3][j]]
                    if (yWindow.length === 4 && assert(yWindow, player)) {
                        return true
                    }
                }
            }
        }
    
        for (let i = 5; i >= 3; i--) {
            let zRef = 0
    
            while (matrix[i - (3 + zRef)]) {
                const diagonalReverse = [
                    matrix[i - zRef][(6 - zRef)],
                    matrix[i - zRef - 1][(5 - zRef)],
                    matrix[i - zRef - 2][(4 - zRef)],
                    matrix[i - zRef - 3][(3 - zRef)]
                ]
                const diagonalReverseDownLeft = [
                    matrix[5 - zRef][(i - zRef)],
                    matrix[5 - zRef - 1][(i - zRef - 1)],
                    matrix[5 - zRef - 2][(i - zRef - 2)],
                    matrix[5 - zRef - 3][(i - zRef - 3)],
                ]
    
                const normalDiagonalUp = [
                    matrix[i - zRef][zRef],
                    matrix[i - (zRef + 1)][(zRef + 1)],
                    matrix[i - (zRef + 2)][(zRef + 2)],
                    matrix[i - (zRef + 3)][(zRef + 3)]
                ]
                const normalDiagonalUpRight = [
                    matrix[zRef + (5 - i)][6 - zRef],
                    matrix[zRef + (5 - i) + 1][(6 - zRef) - 1],
                    matrix[zRef + (5 - i) + 2][(6 - zRef) - 2],
                    matrix[zRef + (5 - i) + 3][(6 - zRef) - 3],
                ]

                if (
                    assert(diagonalReverse, player) ||
                    assert(normalDiagonalUp, player) ||
                    assert(normalDiagonalUpRight, player) ||
                    assert(diagonalReverseDownLeft, player)
                ) {
                    return true
                }
                zRef++
            }
        }
        return false
}

export { initialState, checkWinner, switchPlayer }
