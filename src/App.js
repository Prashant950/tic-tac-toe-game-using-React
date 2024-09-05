import './App.css';
import { useState } from 'react';

function Square({ value, onSquareClick, isGameStarted }) {
  function handleClick() {
    if (!isGameStarted) {
      window.alert('Before start game please click "Start Game" button');
      return;
    }
    onSquareClick();
  }

  return (
    <button className="square" onClick={handleClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay, isGameStarted }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  const isDraw = squares.every(Boolean);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
    setTimeout(() => {
      window.alert(`Congratulations! Player ${winner} has won the game!`);
    }, 100);
  } else if (isDraw) {
    status = 'Draw!';
    setTimeout(() => {
      window.alert("It's a draw! Want to restart the game?");
    }, 100);
  } else if (isGameStarted) {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  } else {
    status = 'Click "Start Game" to begin!';
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} isGameStarted={isGameStarted} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} isGameStarted={isGameStarted} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} isGameStarted={isGameStarted} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} isGameStarted={isGameStarted} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} isGameStarted={isGameStarted} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} isGameStarted={isGameStarted} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} isGameStarted={isGameStarted} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} isGameStarted={isGameStarted} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} isGameStarted={isGameStarted} />
      </div>
    </>
  );
}

export default function Game() {
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const currentSquares = history[stepNumber];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, stepNumber + 1), nextSquares];
    setHistory(nextHistory);
    setStepNumber(nextHistory.length - 1);
    setXIsNext(!xIsNext);
  }

  function jumpTo(step) {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  }

  function startGame() {
    setIsGameStarted(true);
  }

  function resetGame() {
    const confirmed = window.confirm('Are you sure you want to restart the game?');
    if (confirmed) {
      setHistory([Array(9).fill(null)]);
      setStepNumber(0);
      setXIsNext(true);
      setIsGameStarted(false);
    }
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} isGameStarted={isGameStarted} />
      </div>
      <div className="game-info">
        <button className="start-button" onClick={startGame} disabled={isGameStarted}>
          Start Game
        </button>
        <button className="reset-button" onClick={resetGame}>
          Restart Game
        </button>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
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
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
