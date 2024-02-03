import { useParams } from "react-router-dom"
import axios from 'axios'
import { useState, useEffect } from "react";
import "./WordDefinitions.scss"
function WordDefinitions(){
    const { word } = useParams();
    const [definition, setDefinition]= useState()
    useEffect(()=>{
    axios.post("http://localhost:3000/words/definition",{word: word}).then((response)=>{
        setDefinition(response.data)
    }).catch((error)=>{console.log("error getting word definition")})
},[word])
    return(<section className="word-definitions">
    <h1>{`${word.toUpperCase()}`}</h1>
    <h3>{`Part of Speech: ${definition?.partOfSpeech}`}</h3>
    {definition?.definitions?.map((element, index)=>{
        return(<div key={index} className="word-definitions__container">
        <p><span>Definition:</span> {`${element?.definition}`}</p>
        <p><span>Synonym:</span> {`${element?.synonyms[0] || ""}`}</p>
        <p><span>Antonym:</span> {`${element?.antonyms[0] || ""}`}</p>
        <p><span>Example:</span> {`${element?.example}`}</p>
        </div>)
    })}
    
    </section>)
}
export default WordDefinitions;