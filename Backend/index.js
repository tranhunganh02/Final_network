
const express = require('express')
const app = express()
const config = require('./config');



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(config.port, () => console.log('App is listening on url http://localhost:' + config.port));