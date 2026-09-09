import { ChevronDownIcon, CircleIcon, XIcon } from "lucide-react";
import { use } from "react";
import { GameContext, GameDispatchContext } from "../context/gameContext";

export default function Board() {
  const { matrix, hasWin, player } = use(GameContext)
  const dispatch = use(GameDispatchContext)
  const isPlayerOne = player === "p1"
  const isDraw = !hasWin && matrix.every(row => row.every(cell => cell.value === 1))

  return (
    <section aria-label="Tabuleiro de Ligação 4">
      <div className="relative z-10 mb-2 grid grid-cols-7 gap-1 px-3 sm:mb-3 sm:gap-2 sm:px-5">
        {Array.from({length: 7}).map((_, i) => (
          <button
            disabled={hasWin || isDraw || matrix[0][i].value === 1}
            key={i}
            onClick={() => dispatch({ type: 'PLAY', col: i })}
            aria-label={`Jogar na coluna ${i + 1}`}
            className={`group grid aspect-square place-items-center rounded-t-xl border-2 border-b-0 border-ink transition-all hover:-translate-y-1 focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-25 disabled:hover:translate-y-0 ${isPlayerOne ? 'bg-coral text-ink' : 'bg-gold text-ink'}`}
          >
            <ChevronDownIcon className="size-4 transition-transform group-hover:translate-y-0.5 sm:size-6" strokeWidth={3} aria-hidden="true" />
          </button>
        ))}
      </div>

      <div className="board-shell rounded-[1.25rem] border-4 border-ink bg-board p-3 sm:rounded-[1.75rem] sm:p-5">
        <div role="grid" aria-label="Grade de seis linhas por sete colunas" className="grid gap-1.5 sm:gap-2.5">
          {matrix.map((row, i) => (
              <div role="row" key={'row-'+i} className="grid grid-cols-7 gap-1.5 sm:gap-2.5">
                {row.map((cell, j) => (
                  <div
                    key={'row-'+i+',col'+j}
                    role="gridcell"
                    aria-label={`Linha ${i + 1}, coluna ${j + 1}: ${cell.value === 0 ? 'vazia' : cell.player === 'p1' ? 'Jogador 1' : 'Jogador 2'}`}
                    className="slot grid aspect-square place-items-center rounded-full border-2 border-ink/85 bg-slot sm:border-[3px]"
                  >
                    {cell.value === 1 && (cell.player === "p1"
                      ? (
                        <div className="token token-drop size-[88%] rounded-full border-2 border-ink bg-coral sm:border-[3px]"
                          style={{
                            // @ts-expect-error TS doesn't know this property
                            "--drop-rows": i + 1,
                          }}
                        >
                          <XIcon className="size-full p-[18%] text-ink" strokeWidth={3.5} aria-hidden="true" />
                        </div>
                      ) : (
                        <div className="token token-drop size-[88%] rounded-full border-2 border-ink bg-gold sm:border-[3px]"
                          style={{
                            // @ts-expect-error TS doesn't know this property
                            "--drop-rows": i + 1,
                          }}
                        >
                          <CircleIcon className="size-full p-[19%] text-ink" strokeWidth={3.5} aria-hidden="true" />
                        </div>
                      )
                    )}
                  </div>
                ))}
              </div>
            ))}
        </div>
      </div>
      <div className="mx-auto flex w-[88%] justify-between rounded-b-2xl border-x-4 border-b-4 border-ink bg-screen px-4 py-3 font-mono text-[0.62rem] uppercase tracking-wider text-cream/65 sm:px-8 sm:text-xs">
        <div className="flex items-center gap-2">
          <span className="grid size-6 place-items-center rounded-full border-2 border-ink bg-coral sm:size-7">
            <XIcon className="size-4 text-ink sm:size-5" strokeWidth={3.5} aria-hidden="true" />
          </span>
          <span>Jogador 1</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="grid size-6 place-items-center rounded-full border-2 border-ink bg-gold sm:size-7">
            <CircleIcon className="size-4 text-ink sm:size-5" strokeWidth={3.5} aria-hidden="true" />
          </span>
          <span>Jogador 2</span>
        </div>
      </div>
    </section>
  )
}
