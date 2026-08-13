import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import confetti from 'canvas-confetti'
import content from '../content.json'

// Game 1: Emoji Math
function EmojiMath({ onComplete }) {
  const [answer, setAnswer] = useState('')
  const [error, setError] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (answer.trim() === '30') { // 🎂(14) + 🎈(6) + 🎁(10) = 30
      onComplete()
    } else {
      setError(true)
      setTimeout(() => setError(false), 500)
    }
  }

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-2xl font-bold text-[#E63E8C] mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
        Puzzle 1: Emoji Math
      </h3>
      <div className="text-xl md:text-2xl font-bold text-gray-800 space-y-4 mb-8 bg-white/50 p-6 rounded-2xl">
        <p>🎂 + 🎂 = 28</p>
        <p>🎂 + 🎈 = 20</p>
        <p>🎈 + 🎁 = 16</p>
        <div className="border-t-2 border-gray-300 pt-4 mt-4">
          <p className="text-[#E63E8C] text-3xl">🎂 + 🎈 + 🎁 = ?</p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="flex gap-4">
        <input 
          type="number" 
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Enter number"
          className={`px-4 py-3 rounded-xl border-2 outline-none text-xl w-40 text-center ${error ? 'border-red-500 animate-shake' : 'border-[#FFD6E8] focus:border-[#E63E8C]'}`}
        />
        <button type="submit" className="px-6 py-3 bg-[#E63E8C] text-white font-bold rounded-xl hover:bg-[#D5317C] transition-colors">
          Submit
        </button>
      </form>
    </div>
  )
}

// Game 2: Word Scramble
function WordScramble({ onComplete }) {
  const correctWord = 'AYUSHI'
  const scrambled = ['S', 'I', 'H', 'Y', 'U', 'A']
  const [selected, setSelected] = useState([])
  const [error, setError] = useState(false)

  const handleSelect = (letter, index) => {
    if (selected.length < correctWord.length) {
      setSelected([...selected, { letter, index }])
    }
  }

  const handleReset = () => {
    setSelected([])
  }

  useEffect(() => {
    if (selected.length === correctWord.length) {
      const word = selected.map(s => s.letter).join('')
      if (word === correctWord) {
        onComplete()
      } else {
        setError(true)
        setTimeout(() => {
          setError(false)
          setSelected([])
        }, 800)
      }
    }
  }, [selected])

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-2xl font-bold text-[#E63E8C] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
        Puzzle 2: Name Scramble
      </h3>
      <p className="text-gray-600 mb-8 font-medium">Tap the letters to spell your name correctly!</p>
      
      {/* Target Boxes */}
      <div className={`flex gap-2 md:gap-4 mb-12 ${error ? 'animate-shake' : ''}`}>
        {Array(correctWord.length).fill(null).map((_, i) => (
          <div key={i} className="w-12 h-14 md:w-16 md:h-16 rounded-xl border-2 border-dashed border-[#FF8FB1] flex items-center justify-center text-2xl font-bold text-gray-800 bg-white/30">
            {selected[i] ? selected[i].letter : ''}
          </div>
        ))}
      </div>

      {/* Scrambled Letters */}
      <div className="flex flex-wrap justify-center gap-3">
        {scrambled.map((letter, i) => {
          const isUsed = selected.some(s => s.index === i)
          return (
            <button
              key={i}
              onClick={() => handleSelect(letter, i)}
              disabled={isUsed}
              className={`w-14 h-14 md:w-16 md:h-16 rounded-xl text-2xl font-bold shadow-md transition-all ${
                isUsed ? 'bg-gray-200 text-gray-400 opacity-50 scale-95' : 'bg-white hover:bg-[#FFD6E8] text-[#E63E8C] hover:scale-110'
              }`}
            >
              {letter}
            </button>
          )
        })}
      </div>
      
      <button onClick={handleReset} className="mt-8 text-gray-500 hover:text-[#E63E8C] underline font-medium">
        Reset
      </button>
    </div>
  )
}

// Game 3: Blurred Memory
function BlurredMemory({ onComplete }) {
  const photo = content.welcomePhoto || "https://images.unsplash.com/photo-1518895949257-7621c3c786d7"
  const [blurAmount, setBlurAmount] = useState(25)
  const [answer, setAnswer] = useState('')
  const [error, setError] = useState(false)
  
  // Accept almost anything that hints at her or baby or ayushi for simplicity
  const validAnswers = ['me', 'ayushi', 'baby', 'child', 'girl', 'i']

  const handleSubmit = (e) => {
    e.preventDefault()
    const ans = answer.toLowerCase().trim()
    if (validAnswers.some(v => ans.includes(v))) {
      onComplete()
    } else {
      setError(true)
      setTimeout(() => setError(false), 800)
    }
  }

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-2xl font-bold text-[#E63E8C] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
        Puzzle 3: The Blurred Memory
      </h3>
      <p className="text-gray-600 mb-6 font-medium text-center">Slide to reveal, but try to guess who is in the photo!</p>
      
      <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden shadow-2xl mb-8 border-4 border-white">
        <img 
          src={photo} 
          alt="Blurred memory" 
          className="w-full h-full object-cover transition-all duration-75"
          style={{ filter: `blur(${blurAmount}px)` }}
        />
      </div>

      <input 
        type="range" 
        min="0" max="30" 
        value={30 - blurAmount}
        onChange={(e) => setBlurAmount(30 - e.target.value)}
        className="w-full max-w-xs mb-8 accent-[#E63E8C]"
      />

      <form onSubmit={handleSubmit} className="flex gap-4 w-full max-w-xs">
        <input 
          type="text" 
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Who is this?"
          className={`flex-1 px-4 py-3 rounded-xl border-2 outline-none ${error ? 'border-red-500 animate-shake' : 'border-[#FFD6E8] focus:border-[#E63E8C]'}`}
        />
        <button type="submit" className="px-6 py-3 bg-[#E63E8C] text-white font-bold rounded-xl hover:bg-[#D5317C] transition-colors">
          Guess
        </button>
      </form>
    </div>
  )
}

export default function QuizPage({ coins, setCoins }) {
  const [currentStage, setCurrentStage] = useState(0)
  const [completed, setCompleted] = useState(false)
  const [feedback, setFeedback] = useState(null)
  
  useEffect(() => {
    if (coins >= 100 && !completed) {
      setCompleted(true)
    }
  }, [coins, completed])

  const handleStageComplete = () => {
    setFeedback('correct')
    
    // Awards: Stage 1 = 34, Stage 2 = 33, Stage 3 = 33 -> Total 100
    const award = currentStage === 0 ? 34 : 33
    setCoins(prev => Math.min(prev + award, 100))
    
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FFD6E8', '#FF8FB1', '#E63E8C']
    })

    setTimeout(() => {
      setFeedback(null)
      if (currentStage < 2) {
        setCurrentStage(prev => prev + 1)
      } else {
        setCompleted(true)
      }
    }, 2000)
  }

  return (
    <div className="w-full min-h-screen relative font-sans bg-[#FFF0F5] pt-12 pb-10 px-4 flex flex-col items-center justify-center overflow-x-hidden">
      
      {/* Animated Mesh Gradient Background Elements */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-br from-[#FFB6C1]/60 to-[#FF69B4]/40 blur-[100px] animate-blob"></div>
        <div className="absolute top-[20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-tr from-[#FFDAB9]/50 to-[#FFC0CB]/40 blur-[120px] animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-[70vw] h-[70vw] rounded-full bg-gradient-to-t from-[#E6E6FA]/60 to-[#FFB6C1]/30 blur-[150px] animate-blob animation-delay-4000"></div>
      </div>
      
      {/* Premium Noise Overlay */}
      <div className="bg-noise"></div>

      {/* Wallet UI */}
      <div className="fixed top-6 right-6 z-50 glass-panel rounded-full px-6 py-3 shadow-lg flex items-center gap-3 bg-white/80">
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#F4C875] to-[#FFD6E8] flex items-center justify-center text-white font-bold shadow-inner">
          C
        </div>
        <span className="text-xl font-bold text-[#E63E8C] font-serif tracking-widest">{coins} / 100</span>
      </div>

      <div className="text-center mb-8 relative z-30 max-w-2xl">
        <h2 className="text-4xl md:text-5xl font-bold text-[#E63E8C] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
          The Brain Test
        </h2>
        {!completed && (
          <p className="text-gray-700 font-medium text-lg" style={{ fontFamily: "'Poppins', sans-serif" }}>
            Let's see if you're as smart as you think you are!
          </p>
        )}
      </div>

      <div id="quiz-container" className="glass-panel w-full max-w-2xl p-8 md:p-12 rounded-3xl shadow-xl bg-white/80 backdrop-blur-xl border border-white transition-all relative overflow-hidden min-h-[400px] flex items-center justify-center">
        
        {/* Feedback Overlay */}
        {feedback === 'correct' && (
          <div className="absolute inset-0 bg-green-500/10 backdrop-blur-sm flex items-center justify-center z-50 rounded-3xl animate-in fade-in zoom-in duration-300">
            <div className="bg-white px-8 py-6 rounded-2xl shadow-2xl transform scale-110">
              <span className="text-5xl block mb-2 text-center">🎉</span>
              <h3 className="text-3xl font-bold text-green-500" style={{ fontFamily: "'Playfair Display', serif" }}>Awesome!</h3>
            </div>
          </div>
        )}

        {completed ? (
          <div className="text-center animate-in fade-in zoom-in duration-500">
            <span className="text-6xl block mb-6 text-center">🎂</span>
            <h3 className="text-4xl font-bold text-[#E63E8C] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              100 Coins Collected!
            </h3>
            <p className="text-xl text-gray-700 mb-8" style={{ fontFamily: "'Poppins', sans-serif" }}>
              You passed all the tests! You've unlocked the finale.
            </p>
            <Link 
              to="/"
              className="inline-block py-4 px-10 rounded-full bg-gradient-to-r from-[#FF8FB1] to-[#E63E8C] text-white text-xl font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Go Back to Party
            </Link>
          </div>
        ) : (
          <div className="w-full h-full flex flex-col items-center">
            {currentStage === 0 && <EmojiMath onComplete={handleStageComplete} />}
            {currentStage === 1 && <WordScramble onComplete={handleStageComplete} />}
            {currentStage === 2 && <BlurredMemory onComplete={handleStageComplete} />}
          </div>
        )}
      </div>
      
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
        }
      `}</style>
    </div>
  )
}
