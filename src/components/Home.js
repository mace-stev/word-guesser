import "./Home.scss"
import { useEffect } from "react"

function Home(){
const word="magnolia"
const guessedLetters=document.querySelector(".guessed-letters")
const guessButton=document.querySelector(".guess")
const guessInput=document.getElementById("letter")
const inProgress=document.querySelector(".word-in-progress")
const remainingGuesses=document.querySelector(".remaining")
const remainingGuessesSpan=document.querySelector(".remaining span")
const playAgain =document.querySelector(".play-again-hide")
useEffect(()=>{
  function inProgressHandler(word){
    word=word.split("")
    const wordInProgress=word.forEach((element)=>element="●").join('')
    inProgress.innerText=wordInProgress
  }
  inProgressHandler(word)
},[])

  function guessHandler(e){
      e.preventDefault()
     const currentLetter= e.target['letter'].value
      console.log(currentLetter)
      guessInput.value=""
  }
    return(
    <>
    <div className="container">
      <h1>
        <img className="logo" src="../assets/img/logo.png" alt="Guess The Word" />
      </h1>
      <p className="message"></p>
      <p className="word-in-progress"></p>
      <p className="remaining">You have <span>8 guesses</span> remaining.</p>
      <ul className="guessed-letters"></ul>
      <form className="guess-form">
        <label for="letter">Type one letter:</label>
        <input type="text" id="letter" name="letter" className="letter" />
        <div className="form-element button-element">
          <button className="guess" onClick={(e)=>{guessHandler(e)}}>Guess!</button>
        </div>
      </form>
      <button className="play-again-hide">Play Again!</button>
    </div>
    
    </>)
}