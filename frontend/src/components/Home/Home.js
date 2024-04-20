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
  const [inProgress, setInProgress] = useState(null);
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

  }, [word]);
  useEffect(()=>{
    const winLink =document.getElementById("win-link")
    if(inProgress===word.toUpperCase()){
     winLink.classList?.add("play-again__element")
    }
   
  }, [inProgress]) 
  

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
        setInProgress(wordInProgress.join(""))
        contains = true
      }
    })
    if (contains !== true){
      setRemainingGuesses(remainingGuesses - 1)
      if (remainingGuesses-1 === 0){
        setOpen(true)
      }
    }
    clickedLetter.classList?.add("clicked")

  }
  return (
    <>
      <div className="guess__container">
        <h1>
          <img className="logo" src={img} alt="Guess The Word logo" />
        </h1>
        <p ref={inProgressRef} className="word-in-progress"></p>
        <p className="remaining">You have <span ref={remainingGuessesSpanRef}>{remainingGuesses} guesses</span> remaining.</p>
        <form className="guess-form">
          <LetterSelector guess={guessHandler} />
        </form>
        <form className="win-form">
          <button className="play-again__element" type="submit">Restart</button>
    <NavLink to={`/dictionary/${word}`} id="win-link">{`${word.toUpperCase()}: View Definition`}</NavLink>
        </form>
        <Popup open={open} position="center center" closeOnDocumentClick={false}>
          <form>
            <button className="guess__popup--close" onClick={() => window.close()}>Close</button>
            <h1>YOU LOSE</h1>
            <NavLink to={`/dictionary/${word}`} id="win-link" className="play-again__element">{`${word.toUpperCase()}: View Definition`}</NavLink>
            <button ref={playAgainRef} className="play-again__element" type="submit">Play Again!</button>
          </form>
        </Popup>
      </div>
    </>
  )
}


export default Home;