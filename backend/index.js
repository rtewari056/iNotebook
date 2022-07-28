const connectToMongo = require('./db');
const express = require('express')
connectToMongo();

const app = express()
const port = 5000 // As port 3000 occupied by React App

app.use(express.json());

// Available routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.listen(port, () => {
  console.log(`iNotebook backend listening on port ${port}`)
})