import { CircleIcon, Github, XIcon } from "lucide-react"
import Board from "./components/board"
import { HeaderActions } from "./components/header"
import { GameProvider } from "./context/gameProvider"

function App() {
  return (
    <GameProvider>
      <div className="min-h-screen flex items-center justify-center md:p-4">
        <section className="w-full max-w-xl flex flex-col">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-purple-400 mb-2">
              Ligue 3
            </h1>
            <p className="text-gray-400 text-sm">Conecte 3 peças para vencer!</p>
          </div>

          <div className="bg-gray-900 rounded-3xl shadow-2xl p-2 md:p-8 border border-gray-700">
            <HeaderActions />
            <Board />
          </div>
          <section className="mx-auto mt-2">
            <a
              href="https://github.com/matheusdsilva01/ligation"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-gray-300 transition-all"
            >
              Link para o código do projeto
              <Github className="inline size-5 ml-2" />
            </a>
          </section>
        </section>
      </div>
    </GameProvider>
  )
}

export default App
