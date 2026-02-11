import { describe, expect, it } from 'vitest';
import { createInitialGameState, makeMove, type GameState, type MoveError } from './game';

function playMoves(moves: ReadonlyArray<number>): GameState {
  return moves.reduce((state, moveIndex) => makeMove(state, moveIndex), createInitialGameState());
}

describe('tic-tac-toe domain', () => {
  it('creates an initial game state', () => {
    const state = createInitialGameState();

    expect(state.currentPlayer).toBe('X');
    expect(state.status).toBe('in_progress');
    expect(state.winner).toBeNull();
    expect(state.board).toEqual([null, null, null, null, null, null, null, null, null]);
  });

  it('applies a valid move and switches players', () => {
    const state = createInitialGameState();
    const nextState = makeMove(state, 0);

    expect(nextState.board[0]).toBe('X');
    expect(nextState.currentPlayer).toBe('O');
    expect(nextState.lastMoveError).toBeNull();
  });

  it('rejects selecting an already occupied cell', () => {
    const movedState = makeMove(createInitialGameState(), 0);
    const invalidState = makeMove(movedState, 0);

    expect(invalidState.board).toEqual(movedState.board);
    expect(invalidState.currentPlayer).toBe(movedState.currentPlayer);
    expect(invalidState.lastMoveError).toBe<MoveError>('CELL_TAKEN');
  });

  it('detects a winner and stops progression', () => {
    const wonState = playMoves([0, 3, 1, 4, 2]);

    expect(wonState.status).toBe('won');
    expect(wonState.winner).toBe('X');
    expect(wonState.board).toEqual(['X', 'X', 'X', 'O', 'O', null, null, null, null]);

    const afterEndMove = makeMove(wonState, 5);
    expect(afterEndMove.board).toEqual(wonState.board);
    expect(afterEndMove.lastMoveError).toBe<MoveError>('GAME_OVER');
  });

  it('detects a draw when all cells are filled without a winner', () => {
    const drawState = playMoves([0, 1, 2, 4, 3, 5, 7, 6, 8]);

    expect(drawState.status).toBe('draw');
    expect(drawState.winner).toBeNull();
    expect(drawState.lastMoveError).toBeNull();
  });
});
