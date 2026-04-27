import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [step, setStep] = useState(0)
  const [asciiText, setAsciiText] = useState('')
  const [showResult, setShowResult] = useState(false)

  const questions = [
    "راكان هل انت فقير ؟",
    "هل تريد الحال ؟",
    "هل انت مستعد لعرض الاجابه ي راكان ؟"
  ]

  const fullAscii = `
          *******          
          *******          
          *******          
          *******          
          *******          
   *********************** 
   ***     *******     *** 
   ***     *******     *** 
   ***     *******     *** 
   ***     *******     *** 
   *********************** 
  `.trim()

  useEffect(() => {
    if (showResult) {
      let i = 0
      const interval = setInterval(() => {
        setAsciiText(fullAscii.substring(0, i))
        i++
        if (i > fullAscii.length) {
          clearInterval(interval)
          triggerFireworks()
        }
      }, 10)
      return () => clearInterval(interval)
    }
  }, [showResult])

  const triggerFireworks = () => {
    if (window.confetti) {
      var duration = 5 * 1000;
      var animationEnd = Date.now() + duration;
      var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
      }

      var interval = setInterval(function() {
        var timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        var particleCount = 50 * (timeLeft / duration);
        // since particles fall down, start a bit higher than random
        window.confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        window.confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
      }, 250);
    }
  }

  const handleNext = () => {
    if (step < questions.length - 1) {
      setStep(step + 1)
    } else {
      setShowResult(true)
    }
  }

  return (
    <div className="container">
      {!showResult ? (
        <div className="card fade-in" key={step}>
          <h1>{questions[step]}</h1>
          <div className="buttons">
            <button className="primary" onClick={handleNext}>نعم</button>
            <button onClick={handleNext}>لا</button>
          </div>
        </div>
      ) : (
        <div className="card fade-in result-card">
          <span className="answer-text">ركان خش بطيزي</span>
          <div className="ascii-container">
            {asciiText}
          </div>
        </div>
      )}
    </div>
  )
}

export default App
