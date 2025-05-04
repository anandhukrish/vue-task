import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors())

app.use(express.json())

app.post('/user', (req, res) => {
  const token = req.headers.authorization.split(' ')[1]
  if (!token) {
    res.json({ message: 'invalid token' }).status(404)
    return
  }
  const data = req.body

  res.json({ data: data }).status(201)
})

app.listen(3000, () => {
  console.log('listen at port 3000')
})
