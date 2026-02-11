import { Link } from 'react-router-dom';
import { TicTacToeGame } from '../features/tic-tac-toe/ui/TicTacToeGame';

export function TicTacToePage() {
  return (
    <main className="min-h-screen bg-slate-100 px-6 py-16">
      <section className="mx-auto w-full max-w-3xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Gridcraft
            </h1>
            <p className="mt-3 text-lg text-slate-600">Tic-Tac-Toe</p>
          </div>

          <Link
            to="/"
            className="inline-flex rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500"
          >
            Back home
          </Link>
        </header>

        <TicTacToeGame />
      </section>
    </main>
  );
}
