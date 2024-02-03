const express = require('express');
const app = express();
const cors = require('cors');
const {CORS_ORIGIN}= process.env
app.use(cors());
const path = require('path');
const dictionaryRoute=require('./routes/dictionaryRoute')
const port = process.env.PORT || 3000
app.use(express.json())
app.use('/words', dictionaryRoute)
  app.use(express.static(path.resolve(__dirname, '../frontend', 'build')));

  app.use('/', (req, res, next) => {
    if (req.path === '/') {
      res.sendFile(path.resolve(__dirname, '../frontend', 'build', 'index.html'));
      return;
    }
    next();
  });
  app.use('/dictionary/:word', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend', 'build', 'index.html'));
  });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

