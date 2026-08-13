import React, { useState, useEffect } from 'react'
import confetti from 'canvas-confetti'
import content from '../content.json'

// Grab 6 unique photos to make 12 cards total
const photos = [
  ...content.childhoodPhotos.map(p => p.src),
  ...content.friendsPhotos.map(p => p.src)
].slice(0, 6)

// Duplicate and shuffle
const generateDeck = () => {
  const deck = [...photos, ...photos]
    .sort(() => Math.random() - 0.5)
    .map((src, id) => ({ id, src, isFlipped: false, isMatched: false }))
  return deck
}

export default function MemoryMatch() {
  const [cards, setCards] = useState([])
  const [flippedIndices, setFlippedIndices] = useState([])
  const [matches, setMatches] = useState(0)

  useEffect(() => {
    setCards(generateDeck())
  }, [])

  const handleCardClick = (index) => {
    // Prevent clicking if two cards are already flipped, or if card is already matched/flipped
    if (flippedIndices.length === 2 || cards[index].isFlipped || cards[index].isMatched) return

    const newCards = [...cards]
    newCards[index].isFlipped = true
    setCards(newCards)

    const newFlipped = [...flippedIndices, index]
    setFlippedIndices(newFlipped)

    // Check for match when 2 cards are flipped
    if (newFlipped.length === 2) {
      const [first, second] = newFlipped
      if (newCards[first].src === newCards[second].src) {
        // Match!
        setTimeout(() => {
          setCards(prev => {
            const matched = [...prev]
            matched[first].isMatched = true
            matched[second].isMatched = true
            return matched
          })
          setFlippedIndices([])
          setMatches(m => {
            const newMatches = m + 1
            if (newMatches === 6) {
              confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } })
            }
            return newMatches
          })
        }, 500)
      } else {
        // No match
        setTimeout(() => {
          setCards(prev => {
            const reset = [...prev]
            reset[first].isFlipped = false
            reset[second].isFlipped = false
            return reset
          })
          setFlippedIndices([])
        }, 1000)
      }
    }
  }

  const handleReset = () => {
    setCards(generateDeck())
    setFlippedIndices([])
    setMatches(0)
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#FFD6E8] to-[#FFF6F9] pt-24 pb-20 px-4">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-[#E63E8C] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            Memory Match
          </h2>
          <p className="text-gray-700 font-medium" style={{ fontFamily: "'Poppins', sans-serif" }}>
            Find all 6 pairs to win!
          </p>
        </div>

        {matches === 6 && (
          <div className="mb-8 p-6 glass-panel bg-white/80 rounded-2xl text-center shadow-lg animate-bounce">
            <h3 className="text-2xl font-bold text-[#E63E8C]">You Won! 🎉</h3>
            <button 
              onClick={handleReset}
              className="mt-4 px-6 py-2 bg-[#E63E8C] text-white rounded-full font-bold shadow-md hover:scale-105 transition-transform"
            >
              Play Again
            </button>
          </div>
        )}

        <div className="grid grid-cols-3 md:grid-cols-4 gap-4 w-full max-w-2xl">
          {cards.map((card, index) => (
            <div 
              key={card.id} 
              className={`relative aspect-square cursor-pointer transition-all duration-500 transform-style-3d ${card.isFlipped || card.isMatched ? 'rotate-y-180' : ''} ${card.isMatched ? 'opacity-50' : 'hover:-translate-y-1'}`}
              onClick={() => handleCardClick(index)}
              style={{ perspective: '1000px' }}
            >
              {/* Card Inner Wrapper for 3D flip */}
              <div className="w-full h-full relative transition-transform duration-500" style={{ transformStyle: 'preserve-3d', transform: (card.isFlipped || card.isMatched) ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
                
                {/* Front (Back of card visually) */}
                <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#FF8FB1] to-[#E63E8C] rounded-xl shadow-md border-2 border-white/50 flex items-center justify-center backface-hidden" style={{ backfaceVisibility: 'hidden' }}>
                  <span className="text-white text-3xl font-bold font-serif opacity-50">?</span>
                </div>

                {/* Back (The actual photo) */}
                <div className="absolute inset-0 w-full h-full bg-white rounded-xl shadow-lg border-2 border-[#FF8FB1] overflow-hidden backface-hidden" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                  <img src={card.src} alt="Memory" className="w-full h-full object-cover" />
                </div>
                
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
