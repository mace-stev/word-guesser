import "./Home.scss"
import { useEffect, useState, useRef } from "react"
import img from "../../assets/img/logo.png"
import LetterSelector from "../LetterSelector/LetterSelector"


function Home() {
  const word = "magnolia"
  const inProgressRef = useRef(null)
  const remainingGuessesSpanRef = useRef(null)
  const playAgainRef = useRef(null)
  const [currentLetter, setCurrentLetter] = useState()

  function inProgressHandler(currentWord) {
    const wordInProgress = currentWord.split("").map(() => "●")
    if (inProgressRef.current) {
      inProgressRef.current.innerText = wordInProgress.join("")
    }
  }

  useEffect(() => {
    inProgressHandler(word)
  }, [word])

  function guessHandler(e) {
    e.preventDefault()
    console.log(e.target.value)

    const clickedLetter = document.getElementById(`letter${e.target.value}`)
    clickedLetter.classList.add("clicked")
  }
  return (
    <>
      <div className="guess__container">
        <h1>
          <img className="logo" src={img} alt="Guess The Word" />
        </h1>
        <p className="message"></p>
        <p ref={inProgressRef} className="word-in-progress"></p>
        <p className="remaining">You have <span ref={remainingGuessesSpanRef}>8 guesses</span> remaining.</p>
        <ul className="guessed-letters"></ul>
        <form className="guess-form">
          <LetterSelector guess={guessHandler} />
        </form>
        <button ref={playAgainRef} type="submit">Play Again!</button>
      </div>
    </>
  )
}


export default Home;