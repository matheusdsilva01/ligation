import { ChevronDownIcon, CircleIcon, XIcon } from "lucide-react"
import { Activity, useState } from "react"

const empty: Cell = {
  value: 0,
  player: undefined
}

type Player = "p1" | "p2"

type Cell = {
  value: number
  player?: Player
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
    <>
      <Activity mode={hasWin? "visible": "hidden"}>
        <section className="max-w-sm p-4 mx-auto bg-white flex flex-col gap-y-4 text-center text-black">
          <p>O jogador {player} venceu!</p>
          <button onClick={reset} className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors cursor-pointer">Reiniciar</button>
        </section>
      </Activity>
      <section className="max-w-sm border border-red-500 p-4 mx-auto">
        {!hasWin && (
          <div className="mb-10">
            <h2>
              Vez de <span className="font-bold uppercase">{player}</span>
            </h2>
          </div>
        )}
        <div className="flex justify-between mb-10">
          {Array.from({length: 5}).map((_, i) => (
            <button disabled={hasWin} key={i} onClick={() => play(i)} className="cursor-pointer rounded-full bg-purple-500 size-8 p-1 disabled:opacity-50 disabled:cursor-not-allowed">
              <ChevronDownIcon className="size-full" />
            </button>
          ))}
        </div>
          <div className="flex flex-col gap-y-4">
            {matrix.map((cells, i) => (
                // row
                <div key={'row-'+i} className="flex justify-between">
                  {/* cells */}
                  {cells.map((cell, j) => (
                    <div key={'row-'+i+',col'+j} className="rounded-full border-2 border-cyan-500 flex text-center size-8">
                      {cell.value === 1 && (cell.player === "p1"
                        ? (
                          <XIcon className="m-auto text-purple-500 bg-purple-100 rounded-full size-full" />
                        ) : (
                          <CircleIcon className="m-auto text-orange-500 bg-orange-100 size-full rounded-full" />
                        ))}
                    </div>
                  ))}
                </div>
            ))}
          </div>
      </section>
    </>
  )
}

export default App
