export type Player = 'X' | 'O';
export type CellValue = Player | null;
export type Board = ReadonlyArray<CellValue>;
export type GameStatus = 'in_progress' | 'won' | 'draw';
export type MoveError = 'OUT_OF_BOUNDS' | 'CELL_TAKEN' | 'GAME_OVER';

export interface GameState {
  board: Board;
  currentPlayer: Player;
  status: GameStatus;
  winner: Player | null;
  lastMoveError: MoveError | null;
}

const BOARD_CELL_COUNT = 9;
const WINNING_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
] as const;

function createEmptyBoard(): Board {
  return Array.from({ length: BOARD_CELL_COUNT }, () => null);
}

function getNextPlayer(player: Player): Player {
  return player === 'X' ? 'O' : 'X';
}

function isValidCellIndex(index: number): boolean {
  return Number.isInteger(index) && index >= 0 && index < BOARD_CELL_COUNT;
}

export function createInitialGameState(): GameState {
  return {
    board: createEmptyBoard(),
    currentPlayer: 'X',
    status: 'in_progress',
    winner: null,
    lastMoveError: null,
  };
}

export function resetGame(): GameState {
  return createInitialGameState();
}

export function getWinner(board: Board): Player | null {
  for (const [a, b, c] of WINNING_LINES) {
    const firstCell = board[a];
    if (!firstCell) {
      continue;
    }

    if (firstCell === board[b] && firstCell === board[c]) {
      return firstCell;
    }
  }

  return null;
}

export function isBoardFull(board: Board): boolean {
  return board.every((cell) => cell !== null);
}

export function makeMove(state: GameState, index: number): GameState {
  if (!isValidCellIndex(index)) {
    return { ...state, lastMoveError: 'OUT_OF_BOUNDS' };
  }

  if (state.status !== 'in_progress') {
    return { ...state, lastMoveError: 'GAME_OVER' };
  }

  if (state.board[index] !== null) {
    return { ...state, lastMoveError: 'CELL_TAKEN' };
  }

  const nextBoard = [...state.board];
  nextBoard[index] = state.currentPlayer;

  const winner = getWinner(nextBoard);
  if (winner) {
    return {
      ...state,
      board: nextBoard,
      status: 'won',
      winner,
      lastMoveError: null,
    };
  }

  if (isBoardFull(nextBoard)) {
    return {
      ...state,
      board: nextBoard,
      status: 'draw',
      winner: null,
      lastMoveError: null,
    };
  }

  return {
    ...state,
    board: nextBoard,
    currentPlayer: getNextPlayer(state.currentPlayer),
    lastMoveError: null,
  };
}
