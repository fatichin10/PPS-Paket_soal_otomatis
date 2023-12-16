const express = require('express')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

app.set("view engine", "ejs")

app.use('/', require('./routes/render'))
app.use('/api', require('./routes/api'))

app.listen(port, () => {
    console.log(`Listening on port ${ port }`)
})