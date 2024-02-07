import { NavLink, useParams, useNavigate } from "react-router-dom"
import axios from 'axios'
import { useState, useEffect } from "react";
import "./WordDefinitions.scss"
function WordDefinitions(){
    const navigate= useNavigate()
    const { word } = useParams();
    const [definition, setDefinition]= useState()
    useEffect(()=>{
    axios.post("/words/definition",{word: word}).then((response)=>{
        setDefinition(response.data)
        console.log(response.data)
    }).catch((error)=>{console.log("error getting word definition")})
},[word])
    return(
    <section className="word-definitions">
    <NavLink to="/" onClick={() => navigate(-1)} className="play-again__element">Go Back to Home</NavLink>
    <h1>{`${word.toUpperCase()}`}</h1>
    <a href={`https://www.google.com/search?q=${word}`} className="backup-link" target="_blank" rel="noopener noreferrer">If nothing is rendered, you can continue your search here.</a>
    <h3>{`Part of Speech: ${definition?.partOfSpeech || "No definitions found"}`}</h3>
    {definition?.definitions?.map((element, index)=>{
        return(<div key={index} className="word-definitions__container">
        <p><span>Definition:</span> {`${element?.definition || ""}`}</p>
        <p><span>Synonym:</span> {`${element?.synonyms[0] || ""}`}</p>
        <p><span>Antonym:</span> {`${element?.antonyms[0] || ""}`}</p>
        <p><span>Example:</span> {`${element?.example || ""}`}</p>
        </div>)
    })}
    
    </section>)
}
export default WordDefinitions;