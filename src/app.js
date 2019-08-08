const express = require('express')
const serverPort = 8080
const port = process.env.PORT || serverPort

var app = express()

app.use(express.static('static'))

app.get('/', async (req, res) => {
  return res.sendFile('index.html')
})

const start = async () => {
  try {
    var listener = await app.listen(port)
    console.log('Server listening on port ' + listener.address().port)
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}
start()