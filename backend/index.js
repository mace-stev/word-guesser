const express = require('express');
const app = express();
const path = require('path');
const dictionaryRoute=require('./routes/dictionaryRoute')
const port = process.env.PORT || 3000
app.use('/word', dictionaryRoute)
app.use(express.static(path.resolve(__dirname, '../frontend', 'build')));
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

