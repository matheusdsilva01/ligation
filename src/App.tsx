import { useState } from "react"

const startGame = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0]
]

function App() {
  const [matrix, setState] = useState(startGame)

  function play(col: number) {
    for (let rowIndex = matrix.length - 1; rowIndex >= 0; rowIndex--) {

      if (matrix[rowIndex][col] === 0) {
        console.log('brutal, sobrou algo pro betinha no indice', rowIndex)
        setState(prev => {
          const updatedState = [...prev]
          const updatedRow = updatedState[rowIndex]
          updatedRow[col] = 1
          updatedState[rowIndex] = updatedRow
          return updatedState
        })
        break
      }
    }
  }

  return (
    <section className="max-w-3xl p-4 mx-auto">
      <div className="flex gap-2 mb-6">
          <button onClick={() => play(0)} className="cursor-pointer rounded-full bg-purple-500 size-5"></button>
          <button onClick={() => play(1)} className="cursor-pointer rounded-full bg-purple-500 size-5"></button>
          <button onClick={() => play(2)} className="cursor-pointer rounded-full bg-purple-500 size-5"></button>
          <button onClick={() => play(3)} className="cursor-pointer rounded-full bg-purple-500 size-5"></button>
          <button onClick={() => play(4)} className="cursor-pointer rounded-full bg-purple-500 size-5"></button>
      </div>
        <div className="flex flex-col gap-2">
          {matrix.map((cells, i) => (
              // row
              <div key={'row-'+i} className="flex gap-2">
                {/* cells */}
                {cells.map((cell, j) => (
                  <p key={'row-'+i+',col'+j} className="rounded-full bg-green-500 text-center size-5">{cell}</p>
                ))}
              </div>
          ))}
        </div>
    </section>
  )
}

export default App
