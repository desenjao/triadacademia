import express from 'express'
import cors from 'cors'
import router from './routes.js'

const app = express()

app.use(cors())
app.use(express.json())

app.use((req, res, next) => {
  console.log(`📨 ${req.method} ${req.url} - ${new Date().toISOString()}`)
  next()
})

app.use('/api', router)

export default app  // ← TEM QUE TER ISSO!