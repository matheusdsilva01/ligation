import { Activity, useState } from "react"

const startGame = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
]

function App() {
  const [matrix, setState] = useState(startGame)
  const [hasWin, setWasWin] = useState(false)

  function play(col: number) {
    for (let rowIndex = matrix.length - 1; rowIndex >= 0; rowIndex--) {

      if (matrix[rowIndex][col] === 0) {
        setState(prev => {
          const updatedState = [...prev]
          const updatedRow = updatedState[rowIndex]
          updatedRow[col] = 1
          updatedState[rowIndex] = updatedRow
          return updatedState
        })
        checkWinner(rowIndex, col)
        break
      }
    }
  }

  function checkWinner(r: number, c: number) {
    const E = {
      row: r,
      col: c
    }

    function assertCombinationLine(el: number) {
      return !!el && el === 1
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
    }
  }

  return (
    <section className="max-w-sm border border-red-500 p-4 mx-auto">
      <Activity mode={hasWin? "visible": "hidden"}>
        <p>gg</p>
      </Activity>
      <div className="flex justify-between mb-10">
          <button onClick={() => play(0)} className="cursor-pointer rounded-full bg-purple-500 size-4"></button>
          <button onClick={() => play(1)} className="cursor-pointer rounded-full bg-purple-500 size-4"></button>
          <button onClick={() => play(2)} className="cursor-pointer rounded-full bg-purple-500 size-4"></button>
          <button onClick={() => play(3)} className="cursor-pointer rounded-full bg-purple-500 size-4"></button>
          <button onClick={() => play(4)} className="cursor-pointer rounded-full bg-purple-500 size-4"></button>
      </div>
        <div className="flex flex-col gap-y-4">
          {matrix.map((cells, i) => (
              // row
              <div key={'row-'+i} className="flex justify-between">
                {/* cells */}
                {cells.map((cell, j) => (
                  <div key={'row-'+i+',col'+j} className="rounded-full bg-green-500 flex text-center size-8">
                    {cell === 1 && <span className="block size-4 rounded-full bg-red-500 m-auto"></span>}
                  </div>
                ))}
              </div>
          ))}
        </div>
    </section>
  )
}

export default App
