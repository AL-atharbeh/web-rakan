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
   *     *     *     *   *
   *  *  *  *  *  *  *   *
   *  *  *  *  *  *  *   *
   *  *  *  *  *  *  *   *
   ***********************
  `.trim()

  useEffect(() => {
    if (showResult) {
      let i = 0
      const interval = setInterval(() => {
        setAsciiTextByLines(fullAscii, i)
        i++
        if (i > 100) { clearInterval(interval); triggerFireworks(); }
      }, 30)
      return () => clearInterval(interval)
    }
  }, [showResult])

  const setAsciiTextByLines = (text, progress) => {
    const lines = text.split('\n')
    const totalChars = text.length
    const currentChars = Math.floor((progress / 100) * totalChars)
    setAsciiText(text.substring(0, currentChars))
  }

  const triggerFireworks = () => {
    if (window.confetti) {
       const count = 200;
       const defaults = {
         origin: { y: 0.7 }
       };

       function fire(particleRatio, opts) {
         window.confetti({
           ...defaults,
           ...opts,
           particleCount: Math.floor(count * particleRatio)
         });
       }

       fire(0.25, { spread: 26, startVelocity: 55, });
       fire(0.2, { spread: 60, });
       fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
       fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
       fire(0.1, { spread: 120, startVelocity: 45, });
    }
  }

  const handleNext = () => {
    if (step < questions.length - 1) {
      setStep(step + 1)
    }
  }

  const handleShowAnswer = () => {
    setShowResult(true)
  }

  return (
    <div className="container">
      {!showResult ? (
        <div className="card fade-in" key={step}>
          <h1>{questions[step]}</h1>
          <div className="buttons">
            {step < 2 ? (
              <>
                <button className="primary" onClick={handleNext}>نعم</button>
                <button onClick={handleNext}>لا</button>
              </>
            ) : (
              <button className="primary" onClick={handleShowAnswer}>عرض الإجابة</button>
            )}
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
