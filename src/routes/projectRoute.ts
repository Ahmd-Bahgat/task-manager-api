import express from 'express'
import validateJWT from '../middlewares/validateJWT'
import { asyncHandler } from '../utils/asyncHandler'
import { projectController } from '../controllers/projectController'
const router = express.Router()


router.post('/project', validateJWT, asyncHandler(projectController))


export default router