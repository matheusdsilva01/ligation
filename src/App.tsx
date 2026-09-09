import { Github } from "lucide-react"
import Board from "./components/board"
import { HeaderActions } from "./components/header"
import { GameProvider } from "./context/gameProvider"

function App() {
  return (
    <GameProvider>
      <main className="retro-grid relative flex min-h-svh flex-col justify-center overflow-clip px-3 py-6 text-cream sm:px-6">
        <div aria-hidden="true" className="absolute -left-20 top-16 size-52 rounded-full bg-coral/15 blur-3xl" />
        <div aria-hidden="true" className="absolute -right-16 bottom-8 size-64 rounded-full bg-gold/10 blur-3xl" />

        <section className="relative z-10 mx-auto flex w-full min-w-0 max-w-[34rem] shrink-0 flex-col items-center [@media(max-height:950px)]:max-w-[30rem]">
          <header className="mb-5 text-center sm:mb-7">
            <p className="mb-2 font-mono text-[0.65rem] font-bold tracking-[0.38em] text-gold sm:text-xs">
              ARCADE CLASSIC · 02 PLAYERS
            </p>
            <h1 className="font-display text-4xl leading-none tracking-[-0.06em] text-cream drop-shadow-[4px_4px_0_#ef5b48] sm:text-6xl">
              LIGATION<span className="ml-2 inline-block -rotate-3 rounded-md bg-gold px-2 py-1 text-ink drop-shadow-[3px_3px_0_#ef5b48]">4</span>
            </h1>
            <p className="mt-3 font-mono text-xs uppercase tracking-[0.18em] text-cream/60 sm:text-sm">
              Alinhe quatro fichas. Domine a grade.
            </p>
          </header>

          <div className="cabinet-panel w-full rounded-[1.75rem] border-4 border-ink bg-cabinet p-3 sm:rounded-[2.25rem] sm:p-6">
            <HeaderActions />
            <Board />
          </div>

          <footer className="mt-5">
            <a
              href="https://github.com/matheusdsilva01/ligation"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full px-4 py-2 font-mono text-xs uppercase tracking-widest text-cream/55 transition-colors hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
            >
              <Github className="size-4 transition-transform group-hover:-rotate-6" aria-hidden="true" />
              Ver código-fonte
            </a>
          </footer>
        </section>
      </main>
    </GameProvider>
  )
}

export default App
