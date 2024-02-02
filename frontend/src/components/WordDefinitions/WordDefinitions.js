import { useParams } from "react-router-dom"
import axios from 'axios'
import { useState, useEffect } from "react";
function WordDefinitions(){
    const { word } = useParams();
    const [definition, setDefinition]= useState()
    useEffect(()=>{
    axios.post("/words/word",{word: word}).then((response)=>{
        setDefinition(response.data)
    })
},[])
    return(<>
    <h1>{word}</h1>
    
    </>)
}
export default WordDefinitions;