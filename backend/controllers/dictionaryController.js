const axios = require('axios')




exports.dictionary= (req, res)=>{
    const word=req.body.word
    axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then((response)=>{
        res.status(201).send(response.data)
    })
}