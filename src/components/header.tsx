import { Handshake, RotateCcw, Trophy } from 'lucide-react'
import { use } from 'react'
import { GameContext, GameDispatchContext } from '../context/gameContext'

export function HeaderActions() {
  const { hasWin, matrix, player } = use(GameContext)
  const dispatch = use(GameDispatchContext)

  const isPlayerOne = player === 'p1'
  const playerLabel = isPlayerOne ? 'Jogador 1' : 'Jogador 2'
  const isDraw = !hasWin && matrix.every(row => row.every(cell => cell.value === 1))

  if (hasWin || isDraw) {
    return (
      <section aria-live="polite" className="mb-4 flex items-center justify-between gap-3 rounded-2xl border-2 border-ink bg-cream px-4 py-3 text-ink shadow-[4px_4px_0_#080b18] sm:mb-6 sm:px-5">
        <div className="flex min-w-0 items-center gap-3">
          <span className={`grid size-10 shrink-0 place-items-center rounded-full border-2 border-ink ${isDraw ? 'bg-board text-cream' : isPlayerOne ? 'bg-coral' : 'bg-gold'}`}>
            {isDraw
              ? <Handshake className="size-5" strokeWidth={2.5} aria-hidden="true" />
              : <Trophy className="size-5" strokeWidth={2.5} aria-hidden="true" />}
          </span>
          <div className="min-w-0">
            <p className="font-mono text-[0.6rem] font-bold uppercase tracking-[0.2em] text-ink/70">Fim de jogo</p>
            <h2 className="font-display text-lg uppercase leading-tight sm:text-2xl">
              {isDraw ? 'Empate!' : (
                <>
                  <span className="sm:hidden">{isPlayerOne ? 'J1' : 'J2'} venceu!</span>
                  <span className="hidden sm:inline">{playerLabel} venceu!</span>
                </>
              )}
            </h2>
          </div>
        </div>
        <button
          onClick={() => dispatch({ type: 'RESET' })}
          className="group inline-flex shrink-0 items-center gap-2 rounded-xl border-2 border-ink bg-gold px-3 py-2 font-mono text-[0.65rem] font-bold uppercase tracking-wider shadow-[3px_3px_0_#080b18] transition-transform hover:-translate-y-0.5 hover:shadow-[3px_5px_0_#080b18] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink active:translate-y-0.5 active:shadow-[1px_1px_0_#080b18] sm:px-4 sm:text-xs"
        >
          <RotateCcw className="size-4 transition-transform group-hover:-rotate-45" aria-hidden="true" />
          <span className="hidden sm:inline">Nova partida</span>
          <span className="sm:hidden">Reiniciar</span>
        </button>
      </section>
    )
  }

  return (
    <section aria-live="polite" className="mb-4 flex items-center justify-between gap-4 rounded-2xl border-2 border-ink bg-screen px-4 py-3 shadow-[inset_0_0_0_2px_rgba(255,248,221,0.08),3px_3px_0_#080b18] sm:mb-6 sm:px-5">
      <div>
        <p className="font-mono text-[0.6rem] font-bold uppercase tracking-[0.22em] text-cream/65 sm:text-[0.68rem]">Próxima jogada</p>
        <h2 className="mt-1 font-display text-lg uppercase tracking-wide text-cream sm:text-2xl">{playerLabel}</h2>
      </div>
      <div className="flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-widest text-cream/55 sm:text-xs">
        <span className={`status-light size-4 rounded-full border-2 border-ink sm:size-5 ${isPlayerOne ? 'bg-coral' : 'bg-gold'}`} />
        <span>{isPlayerOne ? 'X' : 'O'} ativo</span>
      </div>
    </section>
  )
}
