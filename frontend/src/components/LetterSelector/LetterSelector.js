function LetterSelector({guess, currentLetter}) {
    const alpha = Array.from(Array(26)).map((e, i) => i + 65);
    const alphabet = alpha.map((x) => String.fromCharCode(x));
    return (<>
        {alphabet?.map((element, index) => {
            return (
                <input type="button" id={`${element}`} name="letter" className="letter" onClick={(e) =>guess(e)} key={index+1} value={element} data-testid={`letter-${element}`}></input>
              )
        })}</>)

}
export default LetterSelector;