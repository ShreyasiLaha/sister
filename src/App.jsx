import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import QuizPage from './pages/QuizPage'

function App() {
  const [coins, setCoins] = useState(0)

  return (
    <Routes>
      <Route path="/" element={<Home coins={coins} setCoins={setCoins} />} />
      <Route path="/quiz" element={<QuizPage coins={coins} setCoins={setCoins} />} />
    </Routes>
  )
}

export default App
