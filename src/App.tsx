import React, { useState } from 'react';

const initialBoard = Array(9).fill(null);

const App: React.FC = () => {
  const [board, setBoard] = useState<string[]>(initialBoard);
  const [xIsNext, setXIsNext] = useState<boolean>(true);
  const [xScore, setXScore] = useState<number>(0);
  const [oScore, setOScore] = useState<number>(0);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  const calculateWinner = (squares: string[]): string | null => {
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
    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (i: number) => {
    if (isGameOver) return; 

    const newBoard = [...board];
    if (calculateWinner(newBoard) || newBoard[i]) {
      return;
    }
    newBoard[i] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);

    const winner = calculateWinner(newBoard);
    if (winner) {
      if (winner === 'X') {
        setXScore(xScore + 1);
      } else if (winner === 'O') {
        setOScore(oScore + 1);
      }
      setIsGameOver(true); 
    }
  };

  const handleNewGame = () => {
    setBoard(initialBoard);
    setXIsNext(true);
    setIsGameOver(false);
  };

  const winner = calculateWinner(board);
  const status = winner ? `Winner: ${winner}` : `Next player: ${xIsNext ? 'X' : 'O'}`;

  const renderSquare = (i: number) => (
    <button
      onClick={() => handleClick(i)}
      className={`${
        board[i] === 'X' ? 'first-color' : board[i] === 'O' ? 'second-color' : ''
      } w-16 h-16 bg-white border border-gray-300`}
    >
      {board[i]}
    </button>
  );

  return (
    <div className="bg-green flex flex-col items-center justify-center h-screen">
      <div className= "grid grid-cols-3 gap-2 ">
        <div className="flex justify-center">
          {renderSquare(0)}
        </div>
        <div className="flex justify-center">
          {renderSquare(1)}
        </div>
        <div className="flex justify-center">
          {renderSquare(2)}
        </div>
        <div className="flex justify-center">
          {renderSquare(3)}
        </div>
        <div className="flex justify-center">
          {renderSquare(4)}
        </div>
        <div className="flex justify-center">
          {renderSquare(5)}
        </div>
        <div className="flex justify-center">
          {renderSquare(6)}
        </div>
        <div className="flex justify-center">
          {renderSquare(7)}
        </div>
        <div className="flex justify-center">
          {renderSquare(8)}
        </div>
      </div>
      <div className="mt-4 text-xl font-semibold text-center">
        {status}
      </div>
      <div className="mt-4 text-center">
        <p>Player X Score: {xScore}</p>
        <p>Player O Score: {oScore}</p>
        <button
          onClick={handleNewGame}
          className="mt-4 p-2 bg-blue text-white rounded-md hover:bg-blue-600"
        >
          New Game
        </button>
      </div>
    </div>
  );
};

export default App;





