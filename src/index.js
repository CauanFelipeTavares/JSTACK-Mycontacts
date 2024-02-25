const express = require('express')

const app = express()
const routes = require('./routes')

app.use(express.json())
app.use(routes)

app.get('/', (req, res) => res.send('OK'))

app.listen(8000, () => console.log('ONLINE'))
