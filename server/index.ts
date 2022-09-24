import express, { Express, Request, Response } from 'express'
import dotEnv from 'dotenv'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'

import { db as firestoreDb } from '../db/firebase'
import { addDpc, deleteAllDocs, getAllDocs, getDoc, removeDoc } from '../firebase-utils/firebase-functions'

dotEnv.config()

const defaultCollectionName = 'test-collection'

const app: Express = express()
const port: number = Number(process.env.PORT) || 3000

app.use(bodyParser.json())
app.use(cookieParser())

app.post('/add', async (req: Request, res: Response) => {
  try {
    const { document, collection, data } = req.body

    const result = await addDpc(firestoreDb, document, collection, data)

    res.send({
      message: result ? 'User added' : 'User already exists',
    })
  }
  catch (error) {
    res.status(500).send({ message: 'Internal Server Error' })
  }
})

app.get('/:collection', async (req: Request, res: Response) => {
  try {
    const { collection } = req.params

    const data = await getDoc(firestoreDb, defaultCollectionName, collection)

    res.send({ data })
  }
  catch (error) {
    res.status(500).send({ message: 'Internal Server Error' })
  }
})

app.get('/all', async (req: Request, res: Response) => {
  try {
    const docs = await getAllDocs(firestoreDb)

    res.send({
      docs,
    })
  }
  catch (error) {
    res.status(500).send({ message: 'Internal Server Error' })
  }
})

app.delete('/delete', async (req: Request, res: Response) => {
  try {
    const { document, collection } = req.body

    const result = await removeDoc(firestoreDb, document, collection)

    res.send({
      documentRemoved: result,
    })
  }
  catch (error) {
    res.status(500).send({ message: 'Internal Server Error' })
  }
})

app.get('/', (req: Request, res: Response) => {
  res.send({
    message: 'This route doesn\'t really return anything ¯\_(ツ)_/¯',
  })
})

app.delete('/removeAll', async (req: Request, res: Response) => {
  try {
    await deleteAllDocs(firestoreDb, defaultCollectionName)
  }
  catch (error) {
    res.status(500).send({ message: 'Internal Server Error' })
  }
})


app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})
