import { ChevronDownIcon, CircleIcon, XIcon } from "lucide-react"
import { Activity, useState } from "react"

const empty: Cell = {
  value: 0,
  player: null
}

type Player = "p1" | "p2"

type Cell = {
  value: number
  player: Player | null
}

const startGame = [
    [empty, empty, empty, empty, empty],
    [empty, empty, empty, empty, empty],
    [empty, empty, empty, empty, empty],
    [empty, empty, empty, empty, empty],
    [empty, empty, empty, empty, empty]
]

function App() {
  const [matrix, setState] = useState(startGame)
  const [hasWin, setWasWin] = useState(false)
  const [player, setPlayer] = useState<Player>("p1")

  function play(col: number) {
    for (let rowIndex = matrix.length - 1; rowIndex >= 0; rowIndex--) {

      if (matrix[rowIndex][col].value === 0) {
        setState(prev => {
          const updatedState = [...prev]
          const updatedRow = updatedState[rowIndex]
          updatedRow[col] = {
            value: 1,
            player
          }
          updatedState[rowIndex] = updatedRow
          return updatedState
        })
        checkWinner(rowIndex, col)
        break
      }
    }
  }

  function changePlayer() {
    setPlayer(prev => prev === "p1" ? "p2" : "p1")
  }

  function checkWinner(r: number, c: number) {
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
    if (assert) {
      setWasWin(true)
    } else {
      changePlayer()
    }
  }

  function reset() {
    setState(startGame)
    setWasWin(false)
    setPlayer("p1")
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Activity mode={hasWin ? "visible" : "hidden"}>
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <section className="max-w-md w-full p-8 bg-white rounded-2xl flex flex-col gap-y-6 text-center border animate-fade-in">
            <img src="https://cdn.betterttv.net/emote/55b6f480e66682f576dd94f5/3x.webp" className="size-16 mx-auto" />
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Parabéns!</h2>
              <p className="text-lg text-gray-600">
                Jogador <span className="font-bold text-purple-600 uppercase">{player}</span> venceu!
              </p>
            </div>
            <button 
              onClick={reset} 
              className="bg-purple-600 px-6 py-3 rounded-xl font-semibold hover:bg-purple-700 transition-all"
            >
              Jogar Novamente
            </button>
          </section>
        </div>
      </Activity>

      <section className="w-full max-w-xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-orange-400 mb-2">
            Ligue 3
          </h1>
          <p className="text-gray-400 text-sm">Conecte 3 peças para vencer!</p>
        </div>

        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl shadow-2xl p-8 border border-gray-700">
          {!hasWin && (
            <div className="mb-8 text-center">
              <div className="inline-flex items-center gap-3 bg-gray-700/50 px-6 py-3 rounded-full border border-gray-600">
                <div className={`size-3 rounded-full ${player === "p1" ? "bg-purple-500" : "bg-orange-500"}`}></div>
                <h2 className="text-lg font-medium">
                  Vez do Jogador <span className={`font-bold uppercase ${player === "p1" ? "text-purple-400" : "text-orange-400"}`}>{player}</span>
                </h2>
              </div>
            </div>
          )}

          <div className="flex justify-between gap-3 mb-6 px-6">
            {Array.from({length: 5}).map((_, i) => (
              <button 
                disabled={hasWin} 
                key={i} 
                onClick={() => play(i)} 
                className="group cursor-pointer rounded-full bg-purple-500 hover:bg-purple-400 size-12 p-2 disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:shadow-lg hover:shadow-purple-500/50 flex items-center justify-center"
              >
                <ChevronDownIcon className="size-full text-white group-hover:animate-bounce" />
              </button>
            ))}
          </div>

          <div className="bg-blue-900/40 rounded-2xl p-6 border-2 border-blue-800">
            <div className="flex flex-col gap-3">
              {matrix.map((cells, i) => (
                <div key={'row-'+i} className="flex justify-between gap-3">
                  {cells.map((cell, j) => (
                    <div 
                      key={'row-'+i+',col'+j} 
                      className="rounded-full border-4 border-blue-700/60 bg-blue-950/60 flex items-center justify-center size-12 transition-all"
                    >
                      {cell.value === 1 && (cell.player === "p1"
                        ? (
                          <div>
                            <XIcon className="size-10 text-purple-400 bg-purple-900/40 rounded-full p-1" strokeWidth={3} />
                          </div>
                        ) : (
                          <div>
                            <CircleIcon className="size-10 text-orange-400 bg-orange-900/40 rounded-full p-1" strokeWidth={3} />
                          </div>
                        ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center gap-8 mt-6">
            <div className="flex items-center gap-2">
              <XIcon className="size-6 text-purple-400" strokeWidth={3} />
              <span className="text-sm text-gray-400">Jogador P1</span>
            </div>
            <div className="flex items-center gap-2">
              <CircleIcon className="size-6 text-orange-400" strokeWidth={3} />
              <span className="text-sm text-gray-400">Jogador P2</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default App
