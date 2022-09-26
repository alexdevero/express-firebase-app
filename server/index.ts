import express, { Express } from 'express'
import dotEnv from 'dotenv'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import cors from 'cors'
import helmet from 'helmet'
// @ts-ignore
import { xss } from 'express-xss-sanitizer'

import mainRouter from '../routes/index'

dotEnv.config()

const app: Express = express()
const port: number = Number(process.env.PORT) || 3000

app.use(cors())
app.use(helmet())
app.use(compression())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(xss());
app.use(cookieParser())

app.use('/', mainRouter)

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})
