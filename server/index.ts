import express, { Express } from 'express'
import dotEnv from 'dotenv'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'

import mainRouter from '../routes/index'

dotEnv.config()

const app: Express = express()
const port: number = Number(process.env.PORT) || 3000

app.use(bodyParser.json())
app.use(cookieParser())

app.use('/', mainRouter)

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})
