import { use } from 'react'
import { GameContext, GameDispatchContext } from '../context/gameContext'

export function HeaderActions() {
  const { hasWin, player } = use(GameContext)
  const dispatch = use(GameDispatchContext)

  return hasWin ? (
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
        onClick={() => dispatch({ type: 'RESET' })} 
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
  )
}
