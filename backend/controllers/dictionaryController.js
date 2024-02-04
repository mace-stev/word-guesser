const axios = require('axios')




exports.dictionary= async (req, res)=>{
    const word=req.body.word
    await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then((response)=>{
        res.status(201).send(response.data[0]['meanings'][0])
    }).catch((error)=>{console.log(error)})
}