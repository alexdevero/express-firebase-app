import { Request, Response } from 'express'

import { db as firestoreDb } from '../db/firebase'
import { addDpc, deleteAllDocs, getAllDocs, getDoc, removeDoc } from '../firebase-utils/firebase-functions'

const defaultCollectionName = 'test-collection'

export const addOne = async (req: Request, res: Response) => {
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
}

export const getOne = async (req: Request, res: Response) => {
  try {
    const { collection } = req.params

    const data = await getDoc(firestoreDb, defaultCollectionName, collection)

    res.send({ data })
  }
  catch (error) {
    res.status(500).send({ message: 'Internal Server Error' })
  }
}

export const getAll = async (req: Request, res: Response) => {
  try {
    const docs = await getAllDocs(firestoreDb)

    res.send({
      docs,
    })
  }
  catch (error) {
    res.status(500).send({ message: 'Internal Server Error' })
  }
}

export const deleteOne = async (req: Request, res: Response) => {
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
}

export const getRoot = async (req: Request, res: Response) => {
  res.send({
    message: 'This route doesn\'t really return anything ¯\_(ツ)_/¯',
  })
}

export const removeAll = async (req: Request, res: Response) => {
  try {
    await deleteAllDocs(firestoreDb, defaultCollectionName)
  }
  catch (error) {
    res.status(500).send({ message: 'Internal Server Error' })
  }
}
