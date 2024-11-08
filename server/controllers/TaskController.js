import { ApiError } from '../helpers/ApiError.js'
import { emptyOrRows } from '../helpers/utils.js'
import { insertTask, selectAllTasks, deleteTask } from '../models/Task.js'

const getTasks = async (req,res,next) => {
    try {
        const result = await selectAllTasks()
        return res.status(200).json(emptyOrRows(result))
    } catch (error) {
        return next(error)
    }
}

const postTask = async(req,res,next) => {
    try {
        if (!req.body.description || req.body.description.length === 0) {
            const error = new ApiError('Invalid description for task',400)
            //error.statusCode = 400
            return next(error)
        }
        const result = await insertTask(req.body.description)
        return res.status(200).json({id: result.rows[0].id})
    } catch (error) {
        return next(error)
    }
}

const removeTask = async(req,res,next) => {
    const id = parseInt(req.params.id)
    try {
        const result = await deleteTask(id)
        return res.status(200).json({id})
    } catch (error) {
        return next(error)
    }
}

//const id = parseInt(req.params.id) gdzie to wstawic

export { getTasks, postTask, removeTask }