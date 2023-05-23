import { api } from '../api'

export const getAllTodos = async() => {
    return await api.get('api/todos')
}

export const createTodo = async(name, description) => {
    return await api.post('api/todos', {name, description})
} 

export const updateTodo = async(todo) => {
    return await api.patch(`api/todos/${todo.id}`, todo)
}

export const deleteTodo = async(id) => {
    return await api.delete(`api/todos/${id}`)
}