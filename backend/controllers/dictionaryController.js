const axios = require('axios')




exports.dictionary= async (req, res)=>{
    const result={};
    const word=req.body.word
    const headers = {
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
        'X-RapidAPI-Host': process.env.RAPIDAPI_HOST
      };
      
      const params = {
        entry: word
      };
    await axios.get(`https://twinword-word-graph-dictionary.p.rapidapi.com/definition/`,{
        headers,
        params
      }) 
    .then((response)=>{
         result['meanings']=response.data.meaning;
         axios.get(`https://twinword-word-graph-dictionary.p.rapidapi.com/example/`,{
            headers,
            params
          }).then((response)=>{
            console.log(response)
            result['meanings']['examples']=response.data.example
            res.status(201).send(result)
          }) 
        }).catch((error)=>{console.log(error)})
}