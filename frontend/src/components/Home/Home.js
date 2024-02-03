import "./Home.scss"
import { useEffect, useState, useRef } from "react"
import img from "../../assets/img/logo.png"
import LetterSelector from "../LetterSelector/LetterSelector"
import Popup from 'reactjs-popup';
import { useNavigate, NavLink } from "react-router-dom"
import 'reactjs-popup/dist/index.css';
import axios from 'axios'
function Home() {
  const [word, setWord] = useState("magnolia")
  const inProgressRef = useRef(null)
  const remainingGuessesSpanRef = useRef(null)
  const playAgainRef = useRef(null)
  const [remainingGuesses, setRemainingGuesses] = useState(6)
  const [currentLetter, setCurrentLetter] = useState()
  const [open, setOpen] = useState(false);
  const [nav, setNav] = useState();
  const navigate = useNavigate();

  function inProgressHandler(currentWord) {
    const wordInProgress = currentWord.split("").map(() => "●")
    if (inProgressRef.current) {
      inProgressRef.current.innerText = wordInProgress.join("")
    }
  }
  useEffect(() => {
    axios.get("https://random-word-api.herokuapp.com/word")
      .then((response) => {
        setWord(response.data[0])
      })

  }, [])

  useEffect(() => {
    inProgressHandler(word)
    console.log(word)

  }, [word]);

  async function guessHandler(e) {
    e.preventDefault()
    let contains = false
    const wordArray = word.split("")
    const wordInProgress = inProgressRef.current.innerText.split("")
    const clickedLetter = document.getElementById(`${e.target.value}`)
    wordArray.forEach((element, index) => {
      if (element.toLowerCase() === e.target.value.toLowerCase()) {
        wordInProgress[index] = e.target.value
        inProgressRef.current.innerText = wordInProgress.join("")

        contains = true
      }
    })
    if (contains !== true){
      setRemainingGuesses(remainingGuesses - 1)
      if (remainingGuesses-1 === 0){
        setOpen(true)
      }
    }
    else if (wordInProgress.join("") === word) {
      setNav(<NavLink to={`/dictionary/${word}`}>{`${word}: View Definition`}</NavLink>);
    }


    clickedLetter.classList?.add("clicked")

  }
  return (
    <>
      <div className="guess__container">
        <h1>
          <img className="logo" src={img} alt="Guess The Word" />
        </h1>
        <p className="message"></p>
        <p ref={inProgressRef} className="word-in-progress"></p>
        <p className="remaining">You have <span ref={remainingGuessesSpanRef}>{remainingGuesses} guesses</span> remaining.</p>
        <ul className="guessed-letters"></ul>

        <form className="guess-form">
          <LetterSelector guess={guessHandler} />
        </form>
        <form>
          <button className="play-again" type="submit">Restart</button>
          <p>{nav}</p>
        </form>
        <Popup open={open} position="center center" closeOnDocumentClick={false}>
          <form>
            <button className="guess__popup--close" onClick={() => window.close()}>Close</button>
            <h1>YOU LOSE</h1>
            <NavLink to={`/dictionary/${word}`}>{`${word}: View Definition`}</NavLink>
            <button ref={playAgainRef} className="play-again" type="submit">Play Again!</button>
          </form>
        </Popup>
      </div>
    </>
  )
}


export default Home;