import React, { useState } from 'react'
import confetti from 'canvas-confetti'

export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [xIsNext, setXIsNext] = useState(true)

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
      [0, 4, 8], [2, 4, 6]             // diagonals
    ]
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]
      }
    }
    return null
  }

  const winner = calculateWinner(board)
  const isDraw = !winner && board.every(square => square !== null)

  const handleClick = (i) => {
    if (board[i] || winner) return

    const newBoard = [...board]
    newBoard[i] = xIsNext ? 'X' : 'O'
    setBoard(newBoard)
    setXIsNext(!xIsNext)

    if (calculateWinner(newBoard)) {
      confetti({ particleCount: 200, spread: 100, origin: { y: 0.6 } })
    }
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setXIsNext(true)
  }

  const renderSquare = (i) => (
    <button
      className="w-24 h-24 sm:w-32 sm:h-32 bg-white/60 hover:bg-white/90 glass-panel rounded-2xl shadow-md border border-white flex items-center justify-center text-5xl sm:text-7xl font-bold transition-all duration-200 transform hover:scale-105"
      onClick={() => handleClick(i)}
    >
      <span className={board[i] === 'X' ? 'text-[#E63E8C]' : 'text-[#F4C875]'}>
        {board[i]}
      </span>
    </button>
  )

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#FFD6E8] to-[#FFF6F9] pt-24 pb-20 px-4">
      <div className="max-w-2xl mx-auto flex flex-col items-center">
        
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold text-[#E63E8C] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Tic Tac Toe
          </h2>
          <div className="text-xl text-gray-700 font-medium" style={{ fontFamily: "'Poppins', sans-serif" }}>
            {winner ? (
              <span className="text-2xl text-[#E63E8C] font-bold">Winner: {winner} 🎉</span>
            ) : isDraw ? (
              <span className="text-2xl text-gray-600 font-bold">It's a Draw!</span>
            ) : (
              <span>Next Player: <span className={xIsNext ? 'text-[#E63E8C] font-bold' : 'text-[#F4C875] font-bold'}>{xIsNext ? 'X' : 'O'}</span></span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 sm:gap-4 p-4 glass-panel bg-white/40 rounded-3xl shadow-xl">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>

        <button 
          onClick={resetGame}
          className="mt-10 px-8 py-3 bg-gradient-to-r from-[#FF8FB1] to-[#E63E8C] text-white rounded-full font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all text-lg"
        >
          Restart Game
        </button>

      </div>
    </div>
  )
}
