const express = require('express')

const app = express()

const connectDB = require('./config/db')

// connect to mongodb database
connectDB()

app.use(express.json({ extended: false }))

app.get('/', (req, res) => res.send('test'))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server running on ${PORT}`))
