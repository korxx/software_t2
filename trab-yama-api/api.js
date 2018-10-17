const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('veja yama'))

app.listen(port, () => console.log(`veja ${port}!`))