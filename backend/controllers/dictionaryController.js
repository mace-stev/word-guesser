const axios = require('axios')




exports.dictionary = async (req, res) => {
  const result = {
    meanings: {
      examples: []
    }
  };
  const word = req.body.word
  const headers = {
    'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
    'X-RapidAPI-Host': process.env.RAPIDAPI_HOST
  };

  const params = {
    entry: word
  };
  await axios.get(`https://twinword-word-graph-dictionary.p.rapidapi.com/definition/`, {
    headers,
    params
  })
    .then((response) => {
      result['meanings'] = response.data.meaning;
    }).catch((error) => { console.log("error getting meaning from twinword api") })
  await axios.get(`https://twinword-word-graph-dictionary.p.rapidapi.com/example/`, {
    headers,
    params
  }).then((response) => {
  
    if (response.data.example) {
      result['meanings']['examples'] = response.data.example
    }
  }).catch((console.log("error getting examples from twinword api")))
  await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then((response) => {
      
      result['definitions'] = response.data[0]['meanings'][0]['definitions']
    })
    .catch((error) => { console.log("error getting data from dictionary api") })
  res.status(201).send(result)
}
