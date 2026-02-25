import express from 'express'
import validateJWT from '../middlewares/validateJWT'
import { asyncHandler } from '../utils/asyncHandler'
import { taskController } from '../controllers/taskController'


const router = express.Router()

router.post('/task',validateJWT, asyncHandler(taskController))

export default router