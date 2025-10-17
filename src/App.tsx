import { ChevronDownIcon, CircleIcon, XIcon } from "lucide-react"
import { useGameReducer } from "./hooks/useGameReducer"

function App() {
  const [state, dispatch] = useGameReducer()
  const { matrix, hasWin, player } = state
  
  function play(col: number) {
    dispatch({ type: 'PLAY', col })
  }

  function reset() {
    dispatch({ type: 'RESET' })
  }

  return (
    <div className="min-h-screen flex items-center justify-center md:p-4">
      <section className="w-full max-w-xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-purple-400 mb-2">
            Ligue 3
          </h1>
          <p className="text-gray-400 text-sm">Conecte 3 peças para vencer!</p>
        </div>

        <div className="bg-gray-900 rounded-3xl shadow-2xl p-2 md:p-8 border border-gray-700">
          {hasWin ? (
            <section className="flex flex-col text-center mb-8">
              <div>
                <div className="flex justify-center items-end">
                  <img src="https://cdn.betterttv.net/emote/55b6f480e66682f576dd94f5/3x.webp" className="size-8" />
                  <h2 className="text-2xl font-bold leading-none">Parabéns!</h2>
                </div>
                <p className="text-lg">
                  Jogador <span className={`font-bold uppercase ${player === "p1" ? "text-purple-600" : "text-orange-600"}`}>{player}</span> venceu!
                </p>
              </div>
              <button 
                onClick={() => reset()} 
                className={`bg-purple-600 max-w-56 w-full mx-auto px-4 py-2 mt-2 rounded-xl font-semibold hover:bg-purple-700 transition-all`}
              >
                Jogar Novamente
              </button>
            </section>
          ) : (
            <div className="mb-8 text-center">
              <div className="inline-flex items-center gap-3 bg-gray-700/50 px-6 py-3 rounded-full border border-gray-600">
                <div className={`size-3 rounded-full ${player === "p1" ? "bg-purple-500" : "bg-orange-500"}`}></div>
                <h2 className="text-lg font-medium">
                  Vez do Jogador <span className={`font-bold uppercase ${player === "p1" ? "text-purple-400" : "text-orange-400"}`}>{player}</span>
                </h2>
              </div>
            </div>
          )}
          <section className="[--cell-size:calc(var(--spacing)*9)] md:[--cell-size:calc(var(--spacing)*12)]">
          <div className="flex justify-between gap-3 mb-6 px-4 md:px-6 z-10 relative">
            {Array.from({length: 5}).map((_, i) => (
              <button 
                disabled={hasWin} 
                key={i} 
                onClick={() => play(i)} 
                className="group cursor-pointer rounded-full bg-purple-500 hover:bg-purple-400 size-(--cell-size) md:p-2 disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:shadow-purple-500/50 flex items-center justify-center"
              >
                <ChevronDownIcon className="size-full text-white group-hover:animate-bounce"/>
              </button>
            ))}
          </div>

          <div className="bg-blue-900/40 rounded-2xl py-6 px-4 md:px-6 border-blue-800">
            <div className="flex flex-col gap-3">
              {matrix.map((row, i) => (
                <div key={'row-'+i} className="flex justify-between gap-3">
                  {row.map((cell, j) => (
                    <div 
                      key={'row-'+i+',col'+j} 
                      className="rounded-full border-3 md:border-4 border-blue-700/60 bg-blue-950/60 flex items-center justify-center size-(--cell-size) transition-all"
                    >
                      {cell.value === 1 && (cell.player === "p1"
                        ? (
                          <div className="animate-bounce-complex size-full"
                            style={{
                              // @ts-expect-error TS doesn't know this property
                              "--number-cells-before": i + 1,
                              animationDuration: `${0.3 + (i * 0.1)}s`
                            }}
                          >
                            <XIcon className="text-purple-400 bg-purple-900/40 rounded-full size-full p-1" strokeWidth={3} />
                          </div>
                        ) : (
                          <div className="animate-bounce-complex size-full"
                            style={{
                              // @ts-expect-error TS doesn't know this property
                              "--number-cells-before": i + 1,
                              animationDuration: `${0.3 + (i * 0.1)}s`
                            }}
                          >
                            <CircleIcon className="text-orange-400 bg-orange-900/40 rounded-full size-full p-1" strokeWidth={3} />
                          </div>
                        ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          </section>

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
