import { Link } from 'react-router-dom';

export function HomePage() {
  return (
    <main className="min-h-screen bg-slate-100 px-6 py-16">
      <section className="mx-auto w-full max-w-3xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">Gridcraft</h1>
        <p className="mt-3 text-lg text-slate-600">Classic grid games, rebuilt for the web.</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <article className="rounded-xl border border-slate-200 bg-slate-50 p-5">
            <h2 className="text-xl font-semibold text-slate-900">Tic-Tac-Toe</h2>
            <p className="mt-2 text-sm text-slate-600">
              Take turns placing X and O on a 3x3 board.
            </p>
            <Link
              to="/tic-tac-toe"
              className="mt-4 inline-flex rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500"
            >
              Play now
            </Link>
          </article>

          <article className="rounded-xl border border-slate-200 bg-slate-50 p-5">
            <h2 className="text-xl font-semibold text-slate-900">Four in a Row</h2>
            <p className="mt-2 text-sm text-slate-600">Drop discs and connect four in a line.</p>
            <p className="mt-4 inline-flex rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-500">
              Coming soon
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
