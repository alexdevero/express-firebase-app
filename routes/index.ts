import express from 'express'

import { addOne, deleteOne, getAll, getOne, removeAll, getRoot } from '../controllers/index'

const router = express.Router()

router.post('/add', addOne)

router.get('/:collection', getOne)

router.get('/all', getAll)

router.delete('/delete', deleteOne)

router.get('/', getRoot)

router.post('/removeAll', removeAll)

export default router
