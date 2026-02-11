import { useMemo, useState } from 'react';
import {
  createInitialGameState,
  makeMove,
  resetGame,
  type GameState,
  type MoveError,
} from '../domain/game';

const moveErrorMessageByCode: Record<MoveError, string> = {
  OUT_OF_BOUNDS: 'That move is outside the board.',
  CELL_TAKEN: 'That cell is already taken.',
  GAME_OVER: 'The game is over. Reset to play again.',
};

function getStatusMessage(state: GameState): string {
  if (state.status === 'won' && state.winner) {
    return `Player ${state.winner} wins!`;
  }

  if (state.status === 'draw') {
    return 'Draw game.';
  }

  return `Current turn: ${state.currentPlayer}`;
}

export function TicTacToeGame() {
  const [state, setState] = useState(createInitialGameState);

  const statusMessage = useMemo(() => getStatusMessage(state), [state]);
  const moveError = state.lastMoveError ? moveErrorMessageByCode[state.lastMoveError] : null;

  function handleCellClick(index: number): void {
    setState((currentState) => makeMove(currentState, index));
  }

  function handleReset(): void {
    setState(resetGame());
  }

  return (
    <section className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-6">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Tic-Tac-Toe</h2>
          <p className="mt-1 text-sm font-medium text-slate-700">{statusMessage}</p>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500"
        >
          Reset
        </button>
      </header>

      {moveError ? (
        <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {moveError}
        </p>
      ) : null}

      <div className="mt-4 grid grid-cols-3 gap-3" role="grid" aria-label="Tic-Tac-Toe board">
        {state.board.map((cell, index) => (
          <button
            key={index}
            type="button"
            onClick={() => handleCellClick(index)}
            className="aspect-square rounded-xl border border-slate-300 bg-white text-4xl font-bold text-slate-900 transition hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500"
            aria-label={`Cell ${index + 1}`}
          >
            {cell}
          </button>
        ))}
      </div>
    </section>
  );
}
