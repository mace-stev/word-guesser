function LetterSelector({guess, currentLetter}) {
    const alpha = Array.from(Array(26)).map((e, i) => i + 65);
    const alphabet = alpha.map((x) => String.fromCharCode(x));
    return (<>
        {alphabet?.map((element, index) => {
            return (
                <input type="button" id={`letter${element}`} name="letter" className="letter" onClick={(e) =>guess(e)} key={index+1} value={element}></input>
              )
        })}</>)

}
export default LetterSelector;