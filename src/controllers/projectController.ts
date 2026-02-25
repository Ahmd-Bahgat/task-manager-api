import {Request, Response} from 'express'
import { AppError } from '../utils/appError'
import { createProject } from '../services/projectService'


export const projectController = async(req: Request, res: Response) => {
    const userId = req.userId
    if(!userId){
        throw new AppError('Unauthorized', 401)
    }
    const {name, description} = req.body
    if(!name){
        throw new AppError('Name is required', 400)
    }
    const data = await createProject({name, description, owner: userId})
    res.status(201).json({
        message: 'project created successfully',
        data
    })

}