import { useState } from "react";

// Types
interface SquareProps {
  value: string | null;
  onClick: () => void;
  highlight: boolean;
}

function Square({ value, onClick, highlight }: SquareProps) {
  const isX = value === "X";
  const isO = value === "O";

  return (
    <button
      className={`w-20 h-20 text-3xl font-bold transition-all ${
        highlight
          ? "bg-green-400 text-white"
          : "bg-white hover:bg-gray-50"
      } ${isX ? "text-red-500" : isO ? "text-green-500" : ""}`}
      onClick={onClick}
      data-testid="square"
    >
      {value}
    </button>
  );
}

interface Move {
  squares: (string | null)[];
  location: [number, number] | null;
}

function calculateWinner(squares: (string | null)[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return { winner: squares[a], line: [a, b, c] };
    }
  }
  return null;
}

const BOARD_SIZE = 3;

export default function TicTacToe() {
  const [history, setHistory] = useState<Move[]>([
    { squares: Array(9).fill(null), location: null },
  ]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [ascOrder, setAscOrder] = useState(true);

  const current = history[stepNumber];
  const winnerInfo = calculateWinner(current.squares);
  const isDraw = !winnerInfo && current.squares.every(Boolean);

  function handleClick(i: number) {
    const hist = history.slice(0, stepNumber + 1);
    const current = hist[hist.length - 1];
    const squares = current.squares.slice();
    if (winnerInfo || squares[i]) return;
    squares[i] = xIsNext ? "X" : "O";
    setHistory(
      hist.concat([
        {
          squares,
          location: [Math.floor(i / BOARD_SIZE) + 1, (i % BOARD_SIZE) + 1],
        },
      ])
    );
    setStepNumber(hist.length);
    setXIsNext(!xIsNext);
  }

  function jumpTo(step: number) {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  }

  function renderSquare(i: number, highlight: boolean) {
    return (
      <Square
        key={i}
        value={current.squares[i]}
        onClick={() => handleClick(i)}
        highlight={highlight}
      />
    );
  }

  // Board with two loops
  function renderBoard() {
    const board = [];
    for (let row = 0; row < BOARD_SIZE; row++) {
      const squares = [];
      for (let col = 0; col < BOARD_SIZE; col++) {
        const idx = row * BOARD_SIZE + col;
        const highlight =
          winnerInfo ? winnerInfo.line.includes(idx) : false;
        squares.push(renderSquare(idx, highlight));
      }
      board.push(
        <div className="flex" key={row}>
          {squares}
        </div>
      );
    }
    return board;
  }

  // Move history with location and toggle
  const moves = history.map((step, move) => {
    const player = move % 2 === 0 ? "O" : "X";
    const isCurrentMove = move === stepNumber;

    if (move === 0) {
      return (
        <div
          key={move}
          onClick={() => jumpTo(move)}
          className={`rounded-lg p-3 mb-2 ${
            isCurrentMove
              ? "bg-gray-100 cursor-default"
              : "bg-gray-50 cursor-pointer hover:bg-gray-100 border border-gray-200"
          }`}
        >
          <div className="flex items-center gap-2">
            <span>🎮</span>
            <span className="font-medium text-gray-700">Game Start</span>
          </div>
        </div>
      );
    }

    const [row, col] = step.location!;
    return (
      <div
        key={move}
        onClick={() => !isCurrentMove && jumpTo(move)}
        className={`rounded-lg p-3 mb-2 ${
          isCurrentMove
            ? "bg-gray-100 cursor-default"
            : "bg-gray-50 cursor-pointer hover:bg-gray-100 border border-gray-200"
        }`}
      >
        {isCurrentMove ? (
          <>
            <div className="font-semibold text-blue-600">
              You are at move #{move}
            </div>
            <div className="mt-1 text-xs">
              <div className={`font-medium ${player === "X" ? "text-red-500" : "text-green-500"}`}>
                Player: {player}
              </div>
              <div className="text-green-600">
                Location: ({row - 1}, {col - 1})
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-800">Move {move}</span>
              <button className="px-3 py-1 bg-gray-600 text-white text-xs rounded hover:bg-gray-700">
                Go to
              </button>
            </div>
            <div className="mt-1 text-xs">
              <div className={`font-medium ${player === "X" ? "text-red-500" : "text-green-500"}`}>
                Player: {player}
              </div>
              <div className="text-green-600">
                Location: ({row - 1}, {col - 1})
              </div>
            </div>
          </>
        )}
      </div>
    );
  });
  if (!ascOrder) moves.reverse();

  function resetGame() {
    setHistory([{ squares: Array(9).fill(null), location: null }]);
    setStepNumber(0);
    setXIsNext(true);
  }

  return (
    <div className="bg-white h-screen overflow-hidden p-2">
      <div className="max-w-5xl mx-auto h-full flex flex-col">
        <h1 className="text-2xl font-bold text-center mb-2 bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
          Tic Tac Toe
        </h1>

        <div className="text-center mb-2">
          <div className="inline-block bg-gray-200 rounded-full px-3 py-0.5 mb-1">
            <span className="text-xs font-medium text-gray-700">
              You are at move #{stepNumber}
            </span>
          </div>

          {winnerInfo && (
            <div className="inline-block bg-green-500 text-white rounded-full px-4 py-1 text-sm font-bold">
              Winner: {winnerInfo.winner}
            </div>
          )}

          {isDraw && (
            <div className="inline-block bg-orange-500 text-white rounded-full px-4 py-1 text-sm font-bold">
              Draw! No one wins.
            </div>
          )}
        </div>

        <div className="flex justify-center gap-4 items-start flex-1">
          <div className="bg-gray-50 rounded-xl p-2 shadow-lg border border-gray-200">
            <div className="bg-gray-800 rounded-lg p-2 inline-block">
              {renderBoard()}
            </div>

            <div className="flex gap-2 mt-2 justify-center">
              <button
                onClick={resetGame}
                className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white text-xs rounded-lg hover:bg-red-600 transition-colors font-medium"
              >
                <span>🔄</span>
                Reset
              </button>
              <button
                onClick={() => setAscOrder((o) => !o)}
                className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white text-xs rounded-lg hover:bg-blue-600 transition-colors font-medium"
              >
                <span>📊</span>
                {ascOrder ? "Asc" : "Desc"}
              </button>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl shadow-lg border border-gray-200 w-72 flex flex-col max-h-[calc(100vh-120px)]">
            <div className="bg-gray-800 text-white px-3 py-1.5 rounded-t-xl flex-shrink-0">
              <div className="flex items-center gap-2">
                <span>📋</span>
                <span className="font-bold text-sm">Move History</span>
              </div>
            </div>
            <div className="p-2 overflow-y-auto flex-1">
              {moves}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
