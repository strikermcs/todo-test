import { Router } from 'express'

import { 
    createTodo,
    getAllTodos, 
    getTodoById, 
    updateTodo, 
    deleteTodo } from '../controllers/todo.controller.js'

const router = Router()

router.post('/', createTodo)
router.get('/', getAllTodos)
router.get('/:id', getTodoById)
router.patch('/:id', updateTodo)
router.delete('/:id', deleteTodo)

export default router