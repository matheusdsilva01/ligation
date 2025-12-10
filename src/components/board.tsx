import { ChevronDownIcon, CircleIcon, XIcon } from "lucide-react";
import { use } from "react";
import { GameContext, GameDispatchContext } from "../context/gameContext";

export default function Board() {
  const { matrix, hasWin } = use(GameContext)
  const dispatch = use(GameDispatchContext)

  return (
    <section className="[--cell-size:calc(var(--spacing)*9)] md:[--cell-size:calc(var(--spacing)*12)]">
      <div className="flex justify-between gap-3 mb-6 px-4 md:px-6 z-10 relative">
        {Array.from({length: 7}).map((_, i) => (
          <button 
            disabled={hasWin} 
            key={i} 
            onClick={() => dispatch({ type: 'PLAY', col: i })} 
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
                      )
                    )}
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
    </section>
  )
}
